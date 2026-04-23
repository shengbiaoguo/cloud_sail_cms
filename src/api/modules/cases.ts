import type { PaginatedData } from '@/types/common';
import type {
  CaseFormPayload,
  ContentListParams,
  CaseStudyItem,
  ContentListResult,
} from '@/types/content';
import { http } from '@/utils/http';
import { buildPageParams, normalizeListResult } from '@/utils/pagination';
import type { RequestConfig } from '@/utils/request-types';

export const casesApi = {
  async getList(params?: ContentListParams) {
    const data = await http.get<PaginatedData<CaseStudyItem>>('/admin/case-studies', {
      params: {
        ...buildPageParams(params),
        keyword: params?.keyword,
        status: params?.status,
      },
    });
    return normalizeListResult(data) satisfies ContentListResult<CaseStudyItem>;
  },
  getDetail(id: string, config?: RequestConfig) {
    return http.get<CaseStudyItem>(`/admin/case-studiess/${id}`, config);
  },
  create(payload: CaseFormPayload, config?: RequestConfig<CaseFormPayload>) {
    return http.post<CaseStudyItem, CaseFormPayload>(
      '/admin/case-studies',
      payload,
      config,
    );
  },
  update(id: string, payload: CaseFormPayload, config?: RequestConfig<CaseFormPayload>) {
    return http.patch<CaseStudyItem, CaseFormPayload>(
      `/admin/case-studiess/${id}`,
      payload,
      config,
    );
  },
  remove(id: string, config?: RequestConfig) {
    return http.delete<void>(`/admin/case-studiess/${id}`, config);
  },
  publish(id: string, config?: RequestConfig) {
    return http.patch<CaseStudyItem>(
      `/admin/case-studiess/${id}/publish`,
      undefined,
      config,
    );
  },
  offline(id: string, config?: RequestConfig) {
    return http.patch<CaseStudyItem>(
      `/admin/case-studiess/${id}/offline`,
      undefined,
      config,
    );
  },
};
