import type { LeadStatus, ListResult, PaginationParams } from '@/types/common';

export interface LeadItem {
  id: string | number;
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  sourcePage?: string;
  message?: string;
  status: LeadStatus;
  remark?: string;
  assignedTo?: string;
  contactedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type LeadListResult = ListResult<LeadItem>;

export interface LeadListParams extends PaginationParams {
  keyword?: string;
  status?: LeadStatus;
}
