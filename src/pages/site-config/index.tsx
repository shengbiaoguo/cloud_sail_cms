import { Button, Card, Col, Form, Input, Row, Space } from 'antd';
import { PageSection } from '@/components/common/page-section';
import { UploadField } from '@/components/common/upload-field';

export default function SiteConfigPage() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="站点配置"
        description="将分散的站点基础配置聚合到单页表单，适合中小型企业 CMS 的维护方式。"
      >
        建议站点配置以单例资源维护，前端使用结构化表单而不是 key-value 原始编辑。
      </PageSection>

      <Form layout="vertical">
        <Card title="基础配置" style={{ borderRadius: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="网站名称">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系电话">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="邮箱">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="地址">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Logo">
                <UploadField />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="备案信息">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="社交链接" style={{ borderRadius: 16, marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="微信公众号">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="LinkedIn">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="首页 Banner 配置" style={{ borderRadius: 16, marginTop: 16 }}>
          <p style={{ marginTop: 0, color: '#64748b' }}>
            建议使用可增删的列表式子表单，每项包含标题、副标题、跳转链接、图片和排序字段。
          </p>
        </Card>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <Button type="primary">保存配置</Button>
        </div>
      </Form>
    </Space>
  );
}
