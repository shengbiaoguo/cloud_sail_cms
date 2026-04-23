import type { PaginatedData } from '@/types/common';
import type { LeadItem, LeadListParams, LeadListResult } from '@/types/lead';
import { http } from '@/utils/http';
import { buildPageParams, normalizeListResult } from '@/utils/pagination';
import type { RequestConfig } from '@/utils/request-types';

type LeadUpdatePayload = Partial<Omit<LeadItem, 'id'>>;

interface LeadStatusPayload {
  status: LeadItem['status'];
}

interface LeadRemarkPayload {
  remark: string;
}

export const leadsApi = {
  async getList(params?: LeadListParams) {
    const data = await http.get<PaginatedData<LeadItem>>('/admin/leads', {
      params: {
        ...buildPageParams(params),
        keyword: params?.keyword,
        status: params?.status,
      },
    });
    return normalizeListResult(data) satisfies LeadListResult;
  },
  getDetail(id: string, config?: RequestConfig) {
    return http.get<LeadItem>(`/admin/leads/${id}`, config);
  },
  update(
    id: string,
    payload: LeadUpdatePayload,
    config?: RequestConfig<LeadUpdatePayload>,
  ) {
    return http.patch<LeadItem, LeadUpdatePayload>(`/admin/leads/${id}`, payload, config);
  },
  updateStatus(
    id: string,
    status: LeadItem['status'],
    config?: RequestConfig<LeadStatusPayload>,
  ) {
    return http.patch<LeadItem, LeadStatusPayload>(
      `/admin/leads/${id}/status`,
      { status },
      config,
    );
  },
  updateRemark(id: string, remark: string, config?: RequestConfig<LeadRemarkPayload>) {
    return http.patch<LeadItem, LeadRemarkPayload>(
      `/admin/leads/${id}/remark`,
      { remark },
      config,
    );
  },
};
