import type { UserRole, UserStatus } from '@/types/common';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
  refreshToken?: string;
  user: CurrentAdminUser;
}

export interface CurrentAdminUser {
  id: number;
  username: string;
  nickname: string;
  role: UserRole;
  status: UserStatus;
  lastLoginAt?: string;
}
