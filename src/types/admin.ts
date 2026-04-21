import type { ListResult, UserRole, UserStatus } from '@/types/common';

export interface AdminUserItem {
  id: number;
  username: string;
  nickname: string;
  role: UserRole;
  status: UserStatus;
  lastLoginAt?: string;
  createdAt: string;
}

export type AdminUserListResult = ListResult<AdminUserItem>;
