import type { AxiosResponse } from 'axios';
import { request } from '@/utils/request';
import type { RequestConfig } from '@/utils/request-types';

export const http = {
  get<T = unknown>(url: string, config?: RequestConfig) {
    return request.get<T, T>(url, config);
  },
  post<T = unknown, D = unknown>(url: string, data?: D, config?: RequestConfig<D>) {
    return request.post<T, T, D>(url, data, config);
  },
  put<T = unknown, D = unknown>(url: string, data?: D, config?: RequestConfig<D>) {
    return request.put<T, T, D>(url, data, config);
  },
  patch<T = unknown, D = unknown>(url: string, data?: D, config?: RequestConfig<D>) {
    return request.patch<T, T, D>(url, data, config);
  },
  delete<T = unknown>(url: string, config?: RequestConfig) {
    return request.delete<T, T>(url, config);
  },
  rawGet<T = unknown>(url: string, config?: RequestConfig) {
    return request.get<T, AxiosResponse<T>>(url, { ...config, rawResponse: true });
  },
};
