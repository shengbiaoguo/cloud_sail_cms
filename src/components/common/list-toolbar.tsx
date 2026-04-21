import { Button, Space } from 'antd';
import type { ReactNode } from 'react';

export function ListToolbar({
  createLabel = '新建',
  extra,
}: {
  createLabel?: string;
  extra?: ReactNode;
}) {
  return (
    <Space>
      <Button type="primary">{createLabel}</Button>
      {extra}
    </Space>
  );
}
