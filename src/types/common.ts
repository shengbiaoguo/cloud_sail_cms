export type EntityStatus = 'draft' | 'published' | 'offline';
export type UserRole = 'super_admin' | 'editor';
export type UserStatus = 'enabled' | 'disabled';
export type LeadStatus = 'pending' | 'contacted' | 'converted' | 'invalid';

export interface PaginationParams {
  page?: number;
  current?: number;
  pageSize?: number;
}

export interface ListResult<T> {
  items: T[];
  total: number;
  current: number;
  pageSize: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
}

export interface PaginatedData<T> {
  list: T[];
  pagination: PaginationMeta;
}

export interface Option {
  label: string;
  value: string | number;
}
