import type { ListResult, PaginatedData, PaginationParams } from '@/types/common';

export function buildPageParams(params?: PaginationParams) {
  if (!params) {
    return undefined;
  }

  return {
    page: params.page ?? params.current,
    pageSize: params.pageSize,
  };
}

export function normalizeListResult<T>(data: PaginatedData<T>): ListResult<T> {
  return {
    items: data.list,
    total: data.pagination.total,
    current: data.pagination.page,
    pageSize: data.pagination.pageSize,
  };
}
