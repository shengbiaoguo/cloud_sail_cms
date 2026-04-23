import type { PaginatedData } from '@/types/common';
import type {
  AdminUserItem,
  AdminUserListParams,
  AdminUserListResult,
} from '@/types/admin';
import { http } from '@/utils/http';
import { buildPageParams, normalizeListResult } from '@/utils/pagination';
import type { RequestConfig } from '@/utils/request-types';
import type { UserRole, UserStatus } from '@/types/common';

interface AdminUserCreatePayload {
  username: string;
  nickname: string;
  role: UserRole;
  status: UserStatus;
  password: string;
}

interface AdminUserUpdatePayload {
  nickname?: string;
  role?: UserRole;
  status?: UserStatus;
}

interface AdminUserPasswordPayload {
  password: string;
}

export const adminUsersApi = {
  async getList(params?: AdminUserListParams) {
    const data = await http.get<PaginatedData<AdminUserItem>>('/admin/admin-users', {
      params: {
        ...buildPageParams(params),
        keyword: params?.keyword,
        role: params?.role,
        status: params?.status,
      },
    });
    return normalizeListResult(data) satisfies AdminUserListResult;
  },
  getDetail(id: string, config?: RequestConfig) {
    return http.get<AdminUserItem>(`/admin/admin-users/${id}`, config);
  },
  create(
    payload: AdminUserCreatePayload,
    config?: RequestConfig<AdminUserCreatePayload>,
  ) {
    return http.post<AdminUserItem, AdminUserCreatePayload>(
      '/admin/admin-users',
      payload,
      config,
    );
  },
  update(
    id: string,
    payload: AdminUserUpdatePayload,
    config?: RequestConfig<AdminUserUpdatePayload>,
  ) {
    return http.patch<AdminUserItem, AdminUserUpdatePayload>(
      `/admin/admin-users/${id}`,
      payload,
      config,
    );
  },
  updatePassword(
    id: string,
    password: string,
    config?: RequestConfig<AdminUserPasswordPayload>,
  ) {
    return http.patch<AdminUserItem, AdminUserPasswordPayload>(
      `/admin/admin-users/${id}/password`,
      { password },
      config,
    );
  },
  enable(id: string, config?: RequestConfig) {
    return http.patch<AdminUserItem>(
      `/admin/admin-users/${id}/enable`,
      undefined,
      config,
    );
  },
  disable(id: string, config?: RequestConfig) {
    return http.patch<AdminUserItem>(
      `/admin/admin-users/${id}/disable`,
      undefined,
      config,
    );
  },
};
