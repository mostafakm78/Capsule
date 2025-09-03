import axios, { AxiosInstance } from 'axios';

class Server {
  private api: AxiosInstance;
  constructor(csrfToken?: string) {
    this.api = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    if (csrfToken) {
      this.api.defaults.headers['X-XSRF-TOKEN'] = csrfToken;
    } else {
      this.fetchCsrfToken();
    }
  }

  private async fetchCsrfToken() {
    try {
      const res = await this.api.get('csrf-token');
      const token = res.data?.csrfToken;

      if (token) {
        this.api.defaults.headers['X-XSRF-TOKEN'] = token;
        console.log('CSRF TOKEN set =>', token);
      }
    } catch (err) {
      console.error('Failed to fetch CSRF token', err);
    }
  }

  async isLoggedIn() {
    try {
      const res = await this.api.get('/me');
      return res.data;
    } catch {
      return null;
    }
  }

  async checkEmail(email: string) {
    const res = await this.api.post(
      '/auth/check',
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  }

  async signUp(email: string, password: string) {
    const res = await this.api.post(
      '/auth/signup',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  }

  async loginWithPass(email: string, password: string) {
    const res = await this.api.post(
      '/auth/login',
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  }

  async sendOTPCode(email: string) {
    const res = await this.api.post(
      '/auth/otp/send',
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  }
}

export const api = new Server();
