import type { ListResult, PaginationParams } from '@/types/common';

export interface OperationLogItem {
  id: string | number;
  adminUserName: string;
  module: string;
  action: string;
  targetType?: string;
  targetId?: string;
  content?: string;
  ip?: string;
  createdAt: string;
}

export type OperationLogListResult = ListResult<OperationLogItem>;

export interface OperationLogListParams extends PaginationParams {
  keyword?: string;
  module?: string;
  action?: string;
}
