import { Tag } from 'antd';
import type { EntityStatus, LeadStatus, UserStatus } from '@/types/common';

const STATUS_COLORS: Record<string, string> = {
  draft: 'default',
  published: 'success',
  offline: 'warning',
  pending: 'processing',
  contacted: 'blue',
  converted: 'success',
  invalid: 'error',
  enabled: 'success',
  disabled: 'default',
};

const STATUS_LABELS: Record<string, string> = {
  draft: '草稿',
  published: '已发布',
  offline: '已下线',
  pending: '待处理',
  contacted: '已联系',
  converted: '已转化',
  invalid: '无效',
  enabled: '启用',
  disabled: '禁用',
};

export function StatusTag({ value }: { value: EntityStatus | LeadStatus | UserStatus }) {
  return <Tag color={STATUS_COLORS[value]}>{STATUS_LABELS[value]}</Tag>;
}
