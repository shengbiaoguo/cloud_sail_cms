import type { PaginatedData } from '@/types/common';
import type {
  UploadFileItem,
  UploadFileListParams,
  UploadFileListResult,
} from '@/types/upload';
import { http } from '@/utils/http';
import { buildPageParams, normalizeListResult } from '@/utils/pagination';
import type { RequestConfig } from '@/utils/request-types';

export const uploadsApi = {
  async getList(params?: UploadFileListParams, config?: RequestConfig) {
    const data = await http.get<PaginatedData<UploadFileItem>>('/admin/uploads', {
      params: {
        ...buildPageParams(params),
        keyword: params?.keyword,
      },
      ...config,
    });
    return normalizeListResult(data) satisfies UploadFileListResult;
  },
  uploadImage(payload: FormData, config?: RequestConfig<FormData>) {
    return http.post<UploadFileItem, FormData>('/admin/upload/image', payload, config);
  },
};
