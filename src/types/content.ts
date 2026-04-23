import type { EntityStatus, ListResult, PaginationParams } from '@/types/common';

export interface BaseContentEntity {
  id: string | number;
  title: string;
  slug: string;
  summary: string;
  coverImage?: string;
  content: string;
  seoTitle?: string;
  seoKeywords?: string;
  seoDescription?: string;
  status: EntityStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  createdByName?: string;
  updatedByName?: string;
}

export type NewsItem = BaseContentEntity;

export interface CaseStudyItem extends BaseContentEntity {
  clientName?: string;
  industry?: string;
  projectDate?: string;
}

export type ServiceItem = BaseContentEntity;

export type ContentListResult<T> = ListResult<T>;

export interface ContentListParams extends PaginationParams {
  keyword?: string;
  status?: EntityStatus;
}

export type NewsListParams = ContentListParams;

export interface NewsFormPayload {
  title: string;
  slug: string;
  summary: string;
  coverImage?: string;
  content: string;
  seoTitle?: string;
  seoKeywords?: string;
  seoDescription?: string;
  status: EntityStatus;
  publishedAt?: string;
  sortOrder: number;
}

export interface CaseFormPayload extends NewsFormPayload {
  clientName?: string;
  industry?: string;
  projectDate?: string;
}

export type ServiceFormPayload = NewsFormPayload;
