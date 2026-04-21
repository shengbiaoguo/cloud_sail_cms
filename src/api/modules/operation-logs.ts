import type { PaginationParams } from '@/types/common';
import type { OperationLogListResult } from '@/types/log';
import { request } from '@/utils/request';

export const operationLogsApi = {
  getList(params?: PaginationParams) {
    return request.get<never, OperationLogListResult>('/operation-logs', { params });
  },
};
