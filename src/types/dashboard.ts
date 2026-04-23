import type { EntityStatus, LeadStatus } from '@/types/common';

export interface DashboardOverviewStats {
  newsCount: number;
  caseStudyCount: number;
  serviceCount: number;
  leadCount: number;
}

export interface DashboardLatestLead {
  id: string;
  name: string;
  company?: string;
  status: LeadStatus;
  createdAt: string;
}

export type DashboardContentType = 'news' | 'case' | 'service';

export interface DashboardLatestContent {
  id: string;
  title: string;
  type: DashboardContentType;
  status: EntityStatus;
  updatedAt: string;
}

export interface DashboardOverview {
  stats: DashboardOverviewStats;
  latestLeads: DashboardLatestLead[];
  latestContents: DashboardLatestContent[];
}
