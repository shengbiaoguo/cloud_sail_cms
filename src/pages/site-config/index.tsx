import { Button, Card, Col, Form, Input, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { siteConfigApi } from '@/api/modules/site-config';
import { PageSection } from '@/components/common/page-section';
import type { SiteConfigFormValues } from '@/types/site';
import { showSuccessMessage } from '@/utils/feedback';

export default function SiteConfigPage() {
  const [form] = Form.useForm<SiteConfigFormValues>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      try {
        const detail = await siteConfigApi.getDetail();
        form.setFieldsValue({
          ...detail,
          socialLinks: detail.socialLinks ?? [],
          banners: detail.banners ?? [],
        });
      } finally {
        setLoading(false);
      }
    };

    void loadDetail().catch(() => undefined);
  }, [form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    setSaving(true);
    try {
      const payload: SiteConfigFormValues = {
        ...values,
        siteName: values.siteName.trim(),
        logo: values.logo?.trim() || undefined,
        phone: values.phone?.trim() || undefined,
        email: values.email?.trim() || undefined,
        address: values.address?.trim() || undefined,
        filingInfo: values.filingInfo?.trim() || undefined,
        socialLinks: (values.socialLinks ?? []).map((item) => ({
          platform: item.platform.trim(),
          url: item.url.trim(),
        })),
        banners: (values.banners ?? []).map((item, index) => ({
          id: item.id || `${Date.now()}-${index}`,
          title: item.title.trim(),
          subtitle: item.subtitle?.trim() || undefined,
          image: item.image?.trim() || undefined,
          link: item.link?.trim() || undefined,
          sortOrder: Number(item.sortOrder),
        })),
      };
      await siteConfigApi.update(payload);
      showSuccessMessage('站点配置已保存');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="站点配置"
        description="站点配置已接入真实接口，按单例表单维护基础信息、社交链接与 Banner。"
      >
        采用结构化表单可降低配置项扩展和联调成本。
      </PageSection>

      <Form form={form} layout="vertical" disabled={loading}>
        <Card title="基础配置" style={{ borderRadius: 16 }} loading={loading}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="网站名称"
                name="siteName"
                rules={[{ required: true, message: '请输入网站名称' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Logo URL" name="logo">
                <Input placeholder="请输入 logo 地址" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系电话" name="phone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="邮箱" name="email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="地址" name="address">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="备案信息" name="filingInfo">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card
          title="社交链接"
          style={{ borderRadius: 16, marginTop: 16 }}
          loading={loading}
        >
          <Form.List name="socialLinks">
            {(fields, { add, remove }) => (
              <Space direction="vertical" style={{ width: '100%' }} size={12}>
                {fields.map((field) => (
                  <Row gutter={12} key={field.key}>
                    <Col span={8}>
                      <Form.Item
                        {...field}
                        label="平台"
                        name={[field.name, 'platform']}
                        rules={[{ required: true, message: '请输入平台名称' }]}
                      >
                        <Input placeholder="例如 LinkedIn" />
                      </Form.Item>
                    </Col>
                    <Col span={14}>
                      <Form.Item
                        {...field}
                        label="链接"
                        name={[field.name, 'url']}
                        rules={[{ required: true, message: '请输入链接地址' }]}
                      >
                        <Input placeholder="https://..." />
                      </Form.Item>
                    </Col>
                    <Col span={2} style={{ display: 'flex', alignItems: 'center' }}>
                      <Button danger type="link" onClick={() => remove(field.name)}>
                        删除
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button type="dashed" onClick={() => add({ platform: '', url: '' })}>
                  新增社交链接
                </Button>
              </Space>
            )}
          </Form.List>
        </Card>

        <Card
          title="首页 Banner 配置"
          style={{ borderRadius: 16, marginTop: 16 }}
          loading={loading}
        >
          <Form.List name="banners">
            {(fields, { add, remove }) => (
              <Space direction="vertical" style={{ width: '100%' }} size={12}>
                {fields.map((field) => (
                  <Card key={field.key} size="small">
                    <Form.Item {...field} name={[field.name, 'id']} hidden>
                      <Input />
                    </Form.Item>
                    <Row gutter={12}>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          label="标题"
                          name={[field.name, 'title']}
                          rules={[{ required: true, message: '请输入 Banner 标题' }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          label="副标题"
                          name={[field.name, 'subtitle']}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          label="排序"
                          name={[field.name, 'sortOrder']}
                          rules={[{ required: true, message: '请输入排序值' }]}
                        >
                          <Input type="number" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...field}
                          label="图片 URL"
                          name={[field.name, 'image']}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          {...field}
                          label="跳转链接"
                          name={[field.name, 'link']}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={2} style={{ display: 'flex', alignItems: 'center' }}>
                        <Button danger type="link" onClick={() => remove(field.name)}>
                          删除
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Button
                  type="dashed"
                  onClick={() =>
                    add({
                      id: `${Date.now()}`,
                      title: '',
                      subtitle: '',
                      image: '',
                      link: '',
                      sortOrder: 1,
                    })
                  }
                >
                  新增 Banner
                </Button>
              </Space>
            )}
          </Form.List>
        </Card>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <Button
            type="primary"
            loading={saving}
            onClick={() => void handleSubmit().catch(() => undefined)}
          >
            保存配置
          </Button>
        </div>
      </Form>
    </Space>
  );
}
