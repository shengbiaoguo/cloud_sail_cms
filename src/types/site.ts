export interface BannerConfig {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  link?: string;
  sortOrder: number;
}

export interface SiteConfigFormValues {
  siteName: string;
  logo?: string;
  phone?: string;
  email?: string;
  address?: string;
  filingInfo?: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
  banners: BannerConfig[];
}
