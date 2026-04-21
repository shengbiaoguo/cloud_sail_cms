import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
import { PageSection } from '@/components/common/page-section';
import { RichTextEditorPlaceholder } from '@/components/common/rich-text-editor';
import { UploadField } from '@/components/common/upload-field';
import { contentStatusOptions } from '@/constants/enums';

export default function NewsFormPage() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="新闻表单"
        description="新闻、案例、服务可以共用一套内容表单设计思路，只在差异字段上做插槽扩展。"
      >
        建议表单分为基础信息、内容信息、SEO 信息三个区块，降低管理员填写压力。
      </PageSection>

      <Form layout="vertical">
        <Card title="基础信息" style={{ borderRadius: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="标题" required>
                <Input placeholder="请输入新闻标题" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Slug" required>
                <Input placeholder="请输入唯一 slug" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="摘要">
                <Input.TextArea rows={4} placeholder="请输入摘要" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="状态" required>
                <Select options={contentStatusOptions} placeholder="请选择状态" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="发布时间">
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="排序">
                <Input type="number" placeholder="数值越小越靠前" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="封面图">
                <UploadField />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="正文内容" style={{ borderRadius: 16, marginTop: 16 }}>
          <RichTextEditorPlaceholder />
        </Card>

        <Card title="SEO 信息" style={{ borderRadius: 16, marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="SEO 标题">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="SEO 关键词">
                <Input placeholder="多个关键词可用英文逗号分隔" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="SEO 描述">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <Space>
            <Button>取消</Button>
            <Button>保存草稿</Button>
            <Button type="primary">保存并发布</Button>
          </Space>
        </div>
      </Form>
    </Space>
  );
}
