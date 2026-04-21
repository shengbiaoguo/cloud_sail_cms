import type { CaseStudyItem, NewsItem, ServiceItem } from '@/types/content';
import type { LeadItem } from '@/types/lead';

export interface DashboardStats {
  newsCount: number;
  caseCount: number;
  serviceCount: number;
  leadCount: number;
  recentLeads: LeadItem[];
  recentContents: Array<NewsItem | CaseStudyItem | ServiceItem>;
}
