import type { LeadStatus, Option, UserRole, UserStatus } from '@/types/common';

export const contentStatusOptions: Option[] = [
  { label: '草稿', value: 'draft' },
  { label: '已发布', value: 'published' },
  { label: '已下线', value: 'offline' },
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
