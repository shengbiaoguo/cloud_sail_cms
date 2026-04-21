import type { SiteConfigFormValues } from '@/types/site';
import { request } from '@/utils/request';

export const siteConfigApi = {
  getDetail() {
    return request.get<never, SiteConfigFormValues>('/site-config');
  },
};
