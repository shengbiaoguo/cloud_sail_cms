import { Card, Col, DatePicker, Form, Input, Row, Select, Space, Button } from 'antd';
import { PageSection } from '@/components/common/page-section';
import { RichTextEditorPlaceholder } from '@/components/common/rich-text-editor';
import { UploadField } from '@/components/common/upload-field';
import { contentStatusOptions } from '@/constants/enums';

export default function CaseFormPage() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="案例表单"
        description="案例表单在通用内容结构之上补充项目背景信息。"
      >
        后续可以抽象成 `ContentFormPage` + `extraFields`
        的复用模式，降低三套内容模块的维护成本。
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
              <Form.Item label="客户名称">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="所属行业">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="项目时间">
                <DatePicker style={{ width: '100%' }} />
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
              <Form.Item label="封面图">
                <UploadField />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="摘要">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="项目介绍" style={{ borderRadius: 16, marginTop: 16 }}>
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
