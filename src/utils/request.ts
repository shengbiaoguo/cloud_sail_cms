import axios from 'axios';
import { message } from 'antd';
import { tokenStorage } from '@/utils/storage';

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 15000,
});

request.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error?.response?.status;
    const errorMessage = error?.response?.data?.message ?? '请求失败，请稍后重试';

    if (status === 401) {
      tokenStorage.clear();
      window.location.href = '/login';
    }

    message.error(errorMessage);
    return Promise.reject(error);
  },
);
