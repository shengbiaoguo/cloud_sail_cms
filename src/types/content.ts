import type { EntityStatus, ListResult } from '@/types/common';

export interface BaseContentEntity {
  id: number;
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
}

export type NewsItem = BaseContentEntity;

export interface CaseStudyItem extends BaseContentEntity {
  clientName?: string;
  industry?: string;
  projectDate?: string;
}

export type ServiceItem = BaseContentEntity;

export type ContentListResult<T> = ListResult<T>;
