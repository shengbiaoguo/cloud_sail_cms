import type { SiteConfigFormValues } from '@/types/site';
import { http } from '@/utils/http';
import type { RequestConfig } from '@/utils/request-types';

export const siteConfigApi = {
  getDetail(config?: RequestConfig) {
    return http.get<SiteConfigFormValues>('/admin/site-config', config);
  },
  update(payload: SiteConfigFormValues, config?: RequestConfig<SiteConfigFormValues>) {
    return http.patch<SiteConfigFormValues, SiteConfigFormValues>(
      '/admin/site-config',
      payload,
      config,
    );
  },
};
