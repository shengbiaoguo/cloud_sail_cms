import type { PaginatedData } from '@/types/common';
import type {
  ContentListParams,
  ContentListResult,
  ServiceFormPayload,
  ServiceItem,
} from '@/types/content';
import { http } from '@/utils/http';
import { buildPageParams, normalizeListResult } from '@/utils/pagination';
import type { RequestConfig } from '@/utils/request-types';

export const servicesApi = {
  async getList(params?: ContentListParams) {
    const data = await http.get<PaginatedData<ServiceItem>>('/admin/services', {
      params: {
        ...buildPageParams(params),
        keyword: params?.keyword,
        status: params?.status,
      },
    });
    return normalizeListResult(data) satisfies ContentListResult<ServiceItem>;
  },
  getDetail(id: string, config?: RequestConfig) {
    return http.get<ServiceItem>(`/admin/services/${id}`, config);
  },
  create(payload: ServiceFormPayload, config?: RequestConfig<ServiceFormPayload>) {
    return http.post<ServiceItem, ServiceFormPayload>('/admin/services', payload, config);
  },
  update(
    id: string,
    payload: ServiceFormPayload,
    config?: RequestConfig<ServiceFormPayload>,
  ) {
    return http.patch<ServiceItem, ServiceFormPayload>(
      `/admin/services/${id}`,
      payload,
      config,
    );
  },
  remove(id: string, config?: RequestConfig) {
    return http.delete<void>(`/admin/services/${id}`, config);
  },
  publish(id: string, config?: RequestConfig) {
    return http.patch<ServiceItem>(`/admin/services/${id}/publish`, undefined, config);
  },
  offline(id: string, config?: RequestConfig) {
    return http.patch<ServiceItem>(`/admin/services/${id}/offline`, undefined, config);
  },
};
