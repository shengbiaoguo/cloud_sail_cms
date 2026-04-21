import type { PaginationParams } from '@/types/common';
import type { CaseStudyItem, ContentListResult } from '@/types/content';
import { request } from '@/utils/request';

export const casesApi = {
  getList(params?: PaginationParams) {
    return request.get<never, ContentListResult<CaseStudyItem>>('/cases', { params });
  },
  getDetail(id: string) {
    return request.get<never, CaseStudyItem>(`/cases/${id}`);
  },
};
