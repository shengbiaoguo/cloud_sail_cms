import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestConfig<D = unknown> extends AxiosRequestConfig<D> {
  skipErrorToast?: boolean;
  customErrorHandler?: (error: RequestError) => void;
  rawResponse?: boolean;
  skipAuth?: boolean;
}

export class RequestError extends Error {
  code?: number;
  status?: number;
  response?: AxiosResponse;
  isNetworkError?: boolean;
  isTimeout?: boolean;
  isCanceled?: boolean;

  constructor(message: string, options?: Partial<RequestError>) {
    super(message);
    this.name = 'RequestError';
    Object.assign(this, options);
  }
}
