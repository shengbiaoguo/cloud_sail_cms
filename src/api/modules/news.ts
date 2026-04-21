import type { ContentListResult, NewsItem } from '@/types/content';
import type { PaginationParams } from '@/types/common';
import { request } from '@/utils/request';

export const newsApi = {
  getList(params?: PaginationParams) {
    return request.get<never, ContentListResult<NewsItem>>('/news', { params });
  },
  getDetail(id: string) {
    return request.get<never, NewsItem>(`/news/${id}`);
  },
};
