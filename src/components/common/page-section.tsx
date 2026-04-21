import { Space, Typography } from 'antd';
import type { PropsWithChildren, ReactNode } from 'react';

interface PageSectionProps extends PropsWithChildren {
  title: string;
  description?: string;
  extra?: ReactNode;
}

export function PageSection({ title, description, extra, children }: PageSectionProps) {
  return (
    <div className="page-card">
      <div className="page-header">
        <div>
          <h1 className="page-title">{title}</h1>
          {description ? <p className="page-subtitle">{description}</p> : null}
        </div>
        <Space>{extra}</Space>
      </div>
      <Typography.Paragraph type="secondary" style={{ marginTop: 0 }}>
        {children}
      </Typography.Paragraph>
    </div>
  );
}
