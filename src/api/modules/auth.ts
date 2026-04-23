import type { CurrentAdminUser, LoginPayload, LoginResult } from '@/types/auth';
import { http } from '@/utils/http';
import type { RequestConfig } from '@/utils/request-types';

interface LoginResponseData {
  accessToken: string;
  adminUser: CurrentAdminUser;
}

export const authApi = {
  async login(payload: LoginPayload, config?: RequestConfig<LoginPayload>) {
    const data = await http.post<LoginResponseData, LoginPayload>(
      '/auth/login',
      payload,
      config,
    );

    return {
      accessToken: data.accessToken,
      user: data.adminUser,
    } satisfies LoginResult;
  },

  async getCurrentUser(config?: RequestConfig) {
    return http.get<CurrentAdminUser>('/auth/profile', config);
  },
};
