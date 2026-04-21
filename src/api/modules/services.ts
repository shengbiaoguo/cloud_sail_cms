import type { PaginationParams } from '@/types/common';
import type { ContentListResult, ServiceItem } from '@/types/content';
import { request } from '@/utils/request';

export const servicesApi = {
  getList(params?: PaginationParams) {
    return request.get<never, ContentListResult<ServiceItem>>('/services', { params });
  },
  getDetail(id: string) {
    return request.get<never, ServiceItem>(`/services/${id}`);
  },
};
