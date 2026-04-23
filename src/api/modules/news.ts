import type { PaginatedData } from '@/types/common';
import type {
  ContentListResult,
  NewsFormPayload,
  NewsItem,
  NewsListParams,
} from '@/types/content';
import { http } from '@/utils/http';
import { buildPageParams, normalizeListResult } from '@/utils/pagination';
import type { RequestConfig } from '@/utils/request-types';

export const newsApi = {
  async getList(params?: NewsListParams, config?: RequestConfig) {
    const data = await http.get<PaginatedData<NewsItem>>('/admin/news', {
      params: {
        ...buildPageParams(params),
        keyword: params?.keyword,
        status: params?.status,
      },
      ...config,
    });
    return normalizeListResult(data) satisfies ContentListResult<NewsItem>;
  },

  getDetail(id: string, config?: RequestConfig) {
    return http.get<NewsItem>(`/admin/news/${id}`, config);
  },

  create(payload: NewsFormPayload, config?: RequestConfig<NewsFormPayload>) {
    return http.post<NewsItem, NewsFormPayload>('/admin/news', payload, config);
  },

  update(id: string, payload: NewsFormPayload, config?: RequestConfig<NewsFormPayload>) {
    return http.patch<NewsItem, NewsFormPayload>(`/admin/news/${id}`, payload, config);
  },

  remove(id: string, config?: RequestConfig) {
    return http.delete<void>(`/admin/news/${id}`, config);
  },

  publish(id: string, config?: RequestConfig) {
    return http.patch<NewsItem>(`/admin/news/${id}/publish`, undefined, config);
  },

  offline(id: string, config?: RequestConfig) {
    return http.patch<NewsItem>(`/admin/news/${id}/offline`, undefined, config);
  },
};
