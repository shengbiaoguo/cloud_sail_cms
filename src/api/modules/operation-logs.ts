import type {
  OperationLogItem,
  OperationLogListParams,
  OperationLogListResult,
} from '@/types/log';
import type { PaginatedData } from '@/types/common';
import { http } from '@/utils/http';
import { buildPageParams, normalizeListResult } from '@/utils/pagination';

export const operationLogsApi = {
  async getList(params?: OperationLogListParams) {
    const data = await http.get<PaginatedData<OperationLogItem>>(
      '/admin/operation-logs',
      {
        params: {
          ...buildPageParams(params),
          keyword: params?.keyword,
          module: params?.module,
          action: params?.action,
        },
      },
    );
    return normalizeListResult(data) satisfies OperationLogListResult;
  },
};
