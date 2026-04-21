export type EntityStatus = 'draft' | 'published' | 'offline';
export type UserRole = 'super_admin' | 'editor';
export type UserStatus = 'enabled' | 'disabled';
export type LeadStatus = 'pending' | 'contacted' | 'converted' | 'invalid';

export interface PaginationParams {
  current?: number;
  pageSize?: number;
}

export interface ListResult<T> {
  items: T[];
  total: number;
  current: number;
  pageSize: number;
}

export interface Option {
  label: string;
  value: string | number;
}
