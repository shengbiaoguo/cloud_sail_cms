import type { ListResult, PaginationParams, UserRole, UserStatus } from '@/types/common';

export interface AdminUserItem {
  id: string | number;
  username: string;
  nickname: string;
  role: UserRole;
  status: UserStatus;
  lastLoginAt?: string;
  createdAt: string;
}

export type AdminUserListResult = ListResult<AdminUserItem>;

export interface AdminUserListParams extends PaginationParams {
  keyword?: string;
  role?: UserRole;
  status?: UserStatus;
}
