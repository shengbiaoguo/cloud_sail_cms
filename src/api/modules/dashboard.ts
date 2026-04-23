import type { DashboardOverview } from '@/types/dashboard';
import { request } from '@/utils/request';

export const dashboardApi = {
  getOverview() {
    return request.get<never, DashboardOverview>('/admin/dashboard/overview');
  },
  getStats() {
    return this.getOverview();
  },
};
