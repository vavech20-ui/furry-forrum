import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (!original || error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    const refresh = localStorage.getItem('refresh');
    if (!refresh) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (!refreshPromise) {
      refreshPromise = axios
        .post(`${API_URL}/auth/jwt/refresh/`, { refresh })
        .then((res) => {
          localStorage.setItem('access', res.data.access);
          return res.data.access;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    try {
      const access = await refreshPromise;
      original.headers.Authorization = `Bearer ${access}`;
      return api(original);
    } catch (refreshError) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return Promise.reject(refreshError);
    }
  }
);

export function getErrorMessage(error, fallback = 'Ошибка запроса') {
  const data = error.response?.data;
  if (!data) return fallback;
  if (typeof data === 'string') return data;
  if (data.detail) return String(data.detail);
  const firstKey = Object.keys(data)[0];
  if (firstKey) {
    const val = data[firstKey];
    return Array.isArray(val) ? val[0] : String(val);
  }
  return fallback;
}
