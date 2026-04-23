import type { ListResult, PaginationParams } from '@/types/common';

export interface UploadFileItem {
  id: string | number;
  fileName: string;
  fileUrl: string;
  mimeType: string;
  fileSize: number;
  createdAt: string;
  uploadedBy?: string;
}

export type UploadFileListResult = ListResult<UploadFileItem>;

export interface UploadFileListParams extends PaginationParams {
  keyword?: string;
}
