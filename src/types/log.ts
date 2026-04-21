import type { ListResult } from '@/types/common';

export interface OperationLogItem {
  id: number;
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
