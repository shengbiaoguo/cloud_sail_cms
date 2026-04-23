import axios from 'axios';
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { tokenStorage } from '@/utils/storage';
import { showErrorMessage } from '@/utils/feedback';
import { RequestError } from '@/utils/request-types';
declare module 'axios' {
  interface AxiosRequestConfig {
    skipErrorToast?: boolean;
    customErrorHandler?: (error: RequestError) => void;
    rawResponse?: boolean;
    skipAuth?: boolean;
  }
}
interface ApiEnvelope<T = unknown> {
  code?: number;
  message?: string;
  data?: T;
}
function isApiEnvelope(value: unknown): value is ApiEnvelope {
  return typeof value === 'object' && value !== null && 'message' in value;
}
function shouldToast(config?: AxiosRequestConfig) {
  return !config?.skipErrorToast;
}
function getStatusMessage(status?: number) {
  switch (status) {
    case 400:
      return '请求参数错误';
    case 401:
      return '登录已失效，请重新登录';
    case 403:
      return '无权执行当前操作';
    case 404:
      return '请求的资源不存在';
    case 422:
      return '提交数据校验失败';
    case 500:
      return '服务器异常，请稍后重试';
    default:
      return '请求失败，请稍后重试';
  }
}
function notifyError(config: AxiosRequestConfig | undefined, error: RequestError) {
  if (config?.customErrorHandler) {
    config.customErrorHandler(error);
    return;
  }
  if (!shouldToast(config) || error.isCanceled) {
    return;
  }
  showErrorMessage(error.message);
}
function normalizeHttpError(error: AxiosError<ApiEnvelope>) {
  const payload = error.response?.data;
  const status = error.response?.status;
  if (axios.isCancel(error)) {
    return new RequestError('请求已取消', {
      isCanceled: true,
      status,
      response: error.response as AxiosResponse | undefined,
    });
  }
  if (error.code === 'ECONNABORTED') {
    return new RequestError('请求超时，请稍后重试', {
      isTimeout: true,
      status,
      response: error.response as AxiosResponse | undefined,
    });
  }
  if (!error.response) {
    return new RequestError('网络异常，请检查网络连接', { isNetworkError: true });
  }
  const errorMessage =
    (isApiEnvelope(payload) && payload.message) ||
    error.message ||
    getStatusMessage(status);
  return new RequestError(errorMessage, {
    code: isApiEnvelope(payload) ? payload.code : undefined,
    status,
    response: error.response as AxiosResponse | undefined,
  });
}
export const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Let browser set multipart boundary automatically for FormData payloads.
  if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
    if (config.headers && 'Content-Type' in config.headers) {
      delete config.headers['Content-Type'];
    }
  }
  if (!config.skipAuth) {
    const token = tokenStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
request.interceptors.response.use(
  (response) => {
    if (response.config.rawResponse) {
      return response;
    }
    const payload = response.data;
    if (!isApiEnvelope(payload)) {
      return payload;
    }
    if (payload.code !== 0) {
      const error = new RequestError(
        payload.message || getStatusMessage(response.status),
        {
          code: payload.code,
          status: response.status,
          response: response as AxiosResponse,
        },
      );
      notifyError(response.config, error);
      return Promise.reject(error);
    }
    return payload.data;
  },
  (error: AxiosError<ApiEnvelope>) => {
    const normalizedError = normalizeHttpError(error);
    if (normalizedError.status === 401) {
      tokenStorage.clear();
      window.location.href = '/login';
    }
    notifyError(error.config, normalizedError);
    return Promise.reject(normalizedError);
  },
);
