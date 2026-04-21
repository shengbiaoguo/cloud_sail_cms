import type { CurrentAdminUser, LoginPayload, LoginResult } from '@/types/auth';
import { request } from '@/utils/request';

export const authApi = {
  login(payload: LoginPayload) {
    return request.post<never, LoginResult>('/auth/login', payload);
  },
  getCurrentUser() {
    return request.get<never, CurrentAdminUser>('/auth/me');
  },
};
