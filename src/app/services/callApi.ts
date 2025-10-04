// Axios instance factory with CSRF handling, automatic refresh, and retry logic
import axios, { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from 'axios';

// Extend Axios request config to track whether we've retried a request already
interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
// Factory options: optionally inject a raw Cookie header (useful on server-side)
type Options = { cookieHeader?: string };

// Cached CSRF token for non-GET requests
let csrfToken: string | null = null;
// Flag to ensure only one refresh cycle runs at a time
let isRefreshing = false;
// Queue of waiters to be resolved/rejected after a refresh attempt completes
let waiters: { resolve: () => void; reject: (e: unknown) => void }[] = [];

// Notify all queued waiters: resolve on success, reject on error
const notify = (err?: unknown) => {
  waiters.forEach((w) => (err ? w.reject(err) : w.resolve()));
  waiters = [];
};

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Type guard to detect browser/native FormData (or FormData-like) payloads
function isBrowserFormData(d: unknown): d is FormData {
  if (typeof FormData !== 'undefined' && d instanceof FormData) return true;
  // Fallback heuristic: looks like FormData and its toString matches native tag
  return !!d && typeof d === 'object' && typeof (d as FormData).append === 'function' && String(d) === '[object FormData]';
}

// Main axios factory returning a preconfigured client with interceptors
const callApi = (opts: Options = {}) => {
  // Common options for both primary and bootstrap (refresh) clients
  const common = {
    baseURL,
    withCredentials: true as const, // send cookies for same-site / CORS (if allowed)
  };

  // Primary API client used for app requests
  const api = axios.create({
    ...common,
    headers: {
      ...(opts.cookieHeader ? { Cookie: opts.cookieHeader } : {}),
    },
    // Set axios XSRF cookie/header names (ShadCN/Next often uses these)
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
  });

  // Bootstrap client used for CSRF bootstrap and refresh endpoints
  const bootstrap = axios.create({
    ...common,
    headers: opts.cookieHeader ? { Cookie: opts.cookieHeader } : undefined,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
  });

  // Fetch CSRF token and cache it; safe to call multiple times
  const getCsrf = async () => {
    try {
      const res = await bootstrap.get('/csrf-token');
      csrfToken = res.data?.csrfToken ?? csrfToken;
    } catch {}
    return csrfToken;
  };

  // REQUEST INTERCEPTOR: ensure CSRF header and proper Content-Type
  api.interceptors.request.use(async (config) => {
    // Normalize method and request CSRF for mutating methods
    const method = (config.method || 'get').toUpperCase();
    if (method !== 'GET' && !csrfToken) {
      await getCsrf();
    }
    // Normalize headers to AxiosHeaders for easier mutation
    const headers = (config.headers = AxiosHeaders.from(config.headers));
    // Attach CSRF header if available
    if (csrfToken) headers.set('X-XSRF-TOKEN', csrfToken);
    // Detect if we're sending FormData (let browser set proper boundaries)
    const sendingFormData = isBrowserFormData(config.data);

    if (sendingFormData) {
      // Remove any preset content-type so the browser can set multipart boundary
      headers.delete('Content-Type');
      headers.delete('content-type');
    } else {
      // Default to JSON if no content-type is specified
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
    }
    return config;
  });

  // RESPONSE INTERCEPTOR: handle 403 CSRF issues and 401 refresh token flow
  api.interceptors.response.use(
    // Pass-through success
    (r) => r,
    // Error handler with retry logic
    async (err: AxiosError) => {
      const config = err.config as RetryAxiosRequestConfig | undefined;
      const status = err.response?.status;
      const url = config?.url ?? '';

      // If no config exists, or we're already in refresh endpoint, bail
      if (!config) throw err;
      if (url.includes('/auth/refresh')) throw err;

      // 403: CSRF invalid/missing — try to fetch CSRF and retry once
      if (status === 403 && !config._retry) {
        config._retry = true;
        await getCsrf();
        if (csrfToken) {
          const h = (config.headers = AxiosHeaders.from(config.headers));
          h.set('X-XSRF-TOKEN', csrfToken);
        }
        return api(config);
      }

      // 401: Access token expired — run refresh flow (single flight)
      if (status === 401 && !config._retry) {
        config._retry = true;

        // If another refresh is in progress, wait for it and then retry
        if (isRefreshing) {
          await new Promise<void>((resolve, reject) => waiters.push({ resolve, reject }));
          return api(config);
        }

        // Start refresh sequence
        isRefreshing = true;
        try {
          await getCsrf();
          // Call refresh endpoint; include CSRF header if we have it
          await bootstrap.post('/auth/refresh', {}, csrfToken ? { headers: { 'X-XSRF-TOKEN': csrfToken } } : undefined);
          isRefreshing = false;
          // Wake up queued requests and retry the original request
          notify();
          return api(config);
        } catch (e) {
          // Refresh failed — reject queued requests and bubble up error
          isRefreshing = false;
          notify(e);
          throw e;
        }
      }

      // Unhandled errors: propagate to caller
      throw err;
    }
  );

  // Return the configured client instance
  return api;
};

// Helper to clear cached CSRF token (e.g., on logout)
export const resetCsrf = () => {
  csrfToken = null;
};
export default callApi;
