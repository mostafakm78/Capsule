import axios, { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from 'axios';

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
let csrfToken: string | null = null;

const callApi = () => {
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  });

  const bootstrap = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
  });

  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (config.url?.includes('/csrf-token')) return config;

      const headers = (config.headers = AxiosHeaders.from(config.headers));

      if (!csrfToken) {
        try {
          const res = await bootstrap.get('/csrf-token');
          csrfToken = res.data?.csrfToken ?? null;
        } catch (e) {
          console.error('Failed to fetch CSRF token:', e);
        }
      }

      if (csrfToken) headers.set('X-XSRF-TOKEN', csrfToken);
      return config;
    },
    (err: AxiosError) => Promise.reject(err)
  );

  api.interceptors.response.use(
    (res) => res,
    async (err: AxiosError) => {
      const config = err.config as RetryAxiosRequestConfig | undefined;
      const url = config?.url || '';

      if (url.includes('/auth/refresh')) {
        return Promise.reject(err);
      }

      if (err.response?.status === 401 && config && !config._retry) {
        config._retry = true;
        try {
          await bootstrap.post('/auth/refresh', {}, { headers: csrfToken ? { 'X-XSRF-TOKEN': csrfToken } : undefined });

          const res = await bootstrap.get('/csrf-token');
          csrfToken = res.data?.csrfToken ?? null;

          return api(config);
        } catch (e) {
          return Promise.reject(e);
        }
      }

      return Promise.reject(err);
    }
  );

  return api;
};

export const resetCsrf = () => {
  csrfToken = null;
};
export default callApi;
