import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import type { ReactNode } from 'react';
import type { Option } from '@/types/common';

interface FilterBarProps {
  keywordPlaceholder?: string;
  statusOptions?: Option[];
  extra?: ReactNode;
}

export function FilterBar({
  keywordPlaceholder = '请输入关键词',
  statusOptions,
  extra,
}: FilterBarProps) {
  return (
    <Card style={{ marginBottom: 16, borderRadius: 16 }}>
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="关键词" style={{ marginBottom: 0 }}>
              <Input placeholder={keywordPlaceholder} allowClear />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="状态" style={{ marginBottom: 0 }}>
              <Select options={statusOptions} allowClear placeholder="全部状态" />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label=" " style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Button type="primary">查询</Button>
                  <Button>重置</Button>
                </div>
                {extra}
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
