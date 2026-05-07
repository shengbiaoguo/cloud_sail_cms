import type { LeadStatus, Option, UserRole, UserStatus } from '@/types/common';
import type { NewsCategoryValue } from '@/types/content';

export const contentStatusOptions: Option[] = [
  { label: '草稿', value: 'draft' },
  { label: '已发布', value: 'published' },
  { label: '已下线', value: 'offline' },
];

export const CATEGORY_LABEL_MAP: Record<NewsCategoryValue, string> = {
  industry_news: '行业资讯',
  writing_tips: '写作技巧',
  journal_submission: '期刊投稿',
  academic_service: '学术服务',
  research_integrity: '科研诚信',
};

export const newsCategoryOptions: Array<Option & { value: NewsCategoryValue }> = [
  { label: CATEGORY_LABEL_MAP.industry_news, value: 'industry_news' },
  { label: CATEGORY_LABEL_MAP.writing_tips, value: 'writing_tips' },
  { label: CATEGORY_LABEL_MAP.journal_submission, value: 'journal_submission' },
  { label: CATEGORY_LABEL_MAP.academic_service, value: 'academic_service' },
  { label: CATEGORY_LABEL_MAP.research_integrity, value: 'research_integrity' },
];

export const leadStatusOptions: Array<Option & { value: LeadStatus }> = [
  { label: '待处理', value: 'pending' },
  { label: '已联系', value: 'contacted' },
  { label: '已转化', value: 'converted' },
  { label: '无效', value: 'invalid' },
];

export const adminRoleOptions: Array<Option & { value: UserRole }> = [
  { label: '超级管理员', value: 'super_admin' },
  { label: '编辑', value: 'editor' },
];

export const adminStatusOptions: Array<Option & { value: UserStatus }> = [
  { label: '启用', value: 'enabled' },
  { label: '禁用', value: 'disabled' },
];
