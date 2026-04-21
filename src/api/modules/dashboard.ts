import type { DashboardStats } from '@/types/dashboard';
import { request } from '@/utils/request';

export const dashboardApi = {
  getStats() {
    return request.get<never, DashboardStats>('/dashboard/overview');
  },
};
