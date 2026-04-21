import { Button, Card, Col, Form, Input, Row, Select, Space } from 'antd';
import { PageSection } from '@/components/common/page-section';
import { RichTextEditorPlaceholder } from '@/components/common/rich-text-editor';
import { UploadField } from '@/components/common/upload-field';
import { contentStatusOptions } from '@/constants/enums';

export default function ServiceFormPage() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="服务表单"
        description="服务表单整体更轻量，重点是标题、摘要、正文和排序。"
      >
        这类模块适合复用统一内容表单，并在创建、编辑共用一个页面组件。
      </PageSection>

      <Form layout="vertical">
        <Card title="基础信息" style={{ borderRadius: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="标题">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Slug">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="状态">
                <Select options={contentStatusOptions} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="排序">
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="摘要">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="封面图">
                <UploadField />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="服务内容" style={{ borderRadius: 16, marginTop: 16 }}>
          <RichTextEditorPlaceholder />
        </Card>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <Space>
            <Button>取消</Button>
            <Button type="primary">保存</Button>
          </Space>
        </div>
      </Form>
    </Space>
  );
}
