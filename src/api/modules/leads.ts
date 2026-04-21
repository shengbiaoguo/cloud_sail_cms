import type { PaginationParams } from '@/types/common';
import type { LeadItem, LeadListResult } from '@/types/lead';
import { request } from '@/utils/request';

export const leadsApi = {
  getList(params?: PaginationParams) {
    return request.get<never, LeadListResult>('/leads', { params });
  },
  getDetail(id: string) {
    return request.get<never, LeadItem>(`/leads/${id}`);
  },
};
