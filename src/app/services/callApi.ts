import axios, { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from 'axios';

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
type Options = { cookieHeader?: string };

let csrfToken: string | null = null;
let isRefreshing = false;
let waiters: { resolve: () => void; reject: (e: unknown) => void }[] = [];

const notify = (err?: unknown) => {
  waiters.forEach((w) => (err ? w.reject(err) : w.resolve()));
  waiters = [];
};

const callApi = (opts: Options = {}) => {
  const common = {
    baseURL:'http://localhost:8080',
    withCredentials: true as const,
  };

  const api = axios.create({
    ...common,
    headers: {
      'Content-Type': 'application/json',
      ...(opts.cookieHeader ? { Cookie: opts.cookieHeader } : {}),
    },
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
  });

  const bootstrap = axios.create({
    ...common,
    headers: opts.cookieHeader ? { Cookie: opts.cookieHeader } : undefined,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
  });

  const getCsrf = async () => {
    try {
      const res = await bootstrap.get('/csrf-token');
      csrfToken = res.data?.csrfToken ?? csrfToken;
    } catch {
    }
    return csrfToken;
  };

  api.interceptors.request.use(async (config) => {
    const method = (config.method || 'get').toUpperCase();
    if (method !== 'GET' && !csrfToken) {
      await getCsrf();
    }
    const headers = (config.headers = AxiosHeaders.from(config.headers));
    if (csrfToken) headers.set('X-XSRF-TOKEN', csrfToken);
    return config;
  });

  api.interceptors.response.use(
    (r) => r,
    async (err: AxiosError) => {
      const config = err.config as RetryAxiosRequestConfig | undefined;
      const status = err.response?.status;
      const url = config?.url ?? '';

      if (!config) throw err;
      if (url.includes('/auth/refresh')) throw err;

      if (status === 403 && !config._retry) {
        config._retry = true;
        await getCsrf();
        if (csrfToken) {
          const h = (config.headers = AxiosHeaders.from(config.headers));
          h.set('X-XSRF-TOKEN', csrfToken);
        }
        return api(config);
      }

      if (status === 401 && !config._retry) {
        config._retry = true;

        if (isRefreshing) {
          await new Promise<void>((resolve, reject) => waiters.push({ resolve, reject }));
          return api(config);
        }

        isRefreshing = true;
        try {
          await getCsrf();
          await bootstrap.post('/auth/refresh', {}, csrfToken ? { headers: { 'X-XSRF-TOKEN': csrfToken } } : undefined);
          isRefreshing = false;
          notify();
          return api(config);
        } catch (e) {
          isRefreshing = false;
          notify(e);
          throw e;
        }
      }

      throw err;
    }
  );

  return api;
};

export const resetCsrf = () => {
  csrfToken = null;
};
export default callApi;
