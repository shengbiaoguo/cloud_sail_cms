import type { LeadStatus, ListResult } from '@/types/common';

export interface LeadItem {
  id: number;
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
