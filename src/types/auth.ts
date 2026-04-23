import type { UserRole, UserStatus } from '@/types/common';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
  user: CurrentAdminUser;
}

export interface CurrentAdminUser {
  id: string | number;
  username: string;
  nickname: string;
  role: UserRole;
  status: UserStatus;
  lastLoginAt?: string;
}
