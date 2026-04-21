import type { PaginationParams } from '@/types/common';
import type { AdminUserItem, AdminUserListResult } from '@/types/admin';
import { request } from '@/utils/request';

export const adminUsersApi = {
  getList(params?: PaginationParams) {
    return request.get<never, AdminUserListResult>('/admin-users', { params });
  },
  getDetail(id: string) {
    return request.get<never, AdminUserItem>(`/admin-users/${id}`);
  },
};
