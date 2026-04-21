import type { UploadFileItem } from '@/types/upload';
import { request } from '@/utils/request';

export const uploadsApi = {
  getList() {
    return request.get<never, UploadFileItem[]>('/uploads');
  },
};
