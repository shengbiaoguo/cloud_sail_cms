import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { servicesApi } from '@/api/modules/services';
import { PageSection } from '@/components/common/page-section';
import { UploadField } from '@/components/common/upload-field';
import { contentStatusOptions } from '@/constants/enums';
import type { EntityStatus } from '@/types/common';
import type { ServiceFormPayload } from '@/types/content';
import { showSuccessMessage } from '@/utils/feedback';

interface ServiceFormFields extends Omit<ServiceFormPayload, 'publishedAt'> {
  publishedAt?: Dayjs;
}

function isFormValidationError(error: unknown) {
  return typeof error === 'object' && error !== null && 'errorFields' in error;
}

export default function ServiceFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm<ServiceFormFields>();
  const coverImage = Form.useWatch('coverImage', form);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState<EntityStatus | null>(null);
  const isEdit = Boolean(id);

  useEffect(() => {
    if (!id) {
      form.setFieldsValue({
        status: 'draft',
        sortOrder: 1,
      });
      return;
    }

    const loadDetail = async () => {
      setLoading(true);
      try {
        const detail = await servicesApi.getDetail(id);
        form.setFieldsValue({
          title: detail.title,
          slug: detail.slug,
          summary: detail.summary,
          coverImage: detail.coverImage,
          content: detail.content,
          seoTitle: detail.seoTitle,
          seoKeywords: detail.seoKeywords,
          seoDescription: detail.seoDescription,
          status: detail.status,
          sortOrder: detail.sortOrder,
          publishedAt: detail.publishedAt ? dayjs(detail.publishedAt) : undefined,
        });
      } catch {
        navigate('/services', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    void loadDetail().catch(() => undefined);
  }, [form, id, navigate]);

  const submitService = async (nextStatus: EntityStatus) => {
    const values = await form.validateFields();
    const payload: ServiceFormPayload = {
      title: values.title.trim(),
      slug: values.slug.trim(),
      summary: values.summary.trim(),
      coverImage: values.coverImage?.trim() || undefined,
      content: values.content.trim(),
      seoTitle: values.seoTitle?.trim() || undefined,
      seoKeywords: values.seoKeywords?.trim() || undefined,
      seoDescription: values.seoDescription?.trim() || undefined,
      status: nextStatus,
      publishedAt: values.publishedAt?.toISOString(),
      sortOrder: Number(values.sortOrder),
    };

    if (isEdit && id) {
      await servicesApi.update(id, payload);
      showSuccessMessage(nextStatus === 'published' ? '服务已更新并发布' : '服务已更新');
      return;
    }

    await servicesApi.create(payload);
    showSuccessMessage(nextStatus === 'published' ? '服务已创建并发布' : '服务已保存');
  };

  const handleSubmit = async (nextStatus: EntityStatus) => {
    setSubmitting(nextStatus);
    try {
      await submitService(nextStatus);
      navigate('/services');
    } catch (error) {
      if (!isFormValidationError(error)) {
        throw error;
      }
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title={isEdit ? '编辑服务' : '新建服务'}
        description="服务表单已接入真实接口，支持创建、编辑与发布流转。"
      >
        当前以标题、摘要、正文和排序为核心字段，可满足后台维护需求。
      </PageSection>

      <Form form={form} layout="vertical" disabled={loading}>
        <Card title="基础信息" style={{ borderRadius: 16 }} loading={loading}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="标题"
                name="title"
                rules={[
                  { required: true, message: '请输入服务标题' },
                  { max: 120, message: '标题长度不能超过 120 个字符' },
                ]}
              >
                <Input placeholder="请输入服务标题" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Slug"
                name="slug"
                rules={[
                  { required: true, message: '请输入唯一 slug' },
                  {
                    pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                    message: 'Slug 仅支持小写字母、数字和中划线',
                  },
                ]}
              >
                <Input placeholder="例如 official-site-build-service" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="摘要"
                name="summary"
                rules={[{ required: true, message: '请输入服务摘要' }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="请输入用于列表和 SEO 摘要的简短描述"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="状态" name="status">
                <Select options={contentStatusOptions} placeholder="请选择状态" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="发布时间" name="publishedAt">
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="排序"
                name="sortOrder"
                rules={[{ required: true, message: '请输入排序值' }]}
              >
                <Input type="number" placeholder="数值越小越靠前" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="封面图 URL" name="coverImage">
                <Input placeholder="请输入封面图地址，或先通过下方上传组件选择图片" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="封面图上传">
                <UploadField
                  currentUrl={coverImage}
                  onUploaded={(fileUrl) => {
                    form.setFieldValue('coverImage', fileUrl);
                  }}
                  onClear={() => {
                    form.setFieldValue('coverImage', undefined);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card
          title="服务内容"
          style={{ borderRadius: 16, marginTop: 16 }}
          loading={loading}
        >
          <Form.Item
            label="正文"
            name="content"
            rules={[{ required: true, message: '请输入服务正文' }]}
            style={{ marginBottom: 0 }}
          >
            <Input.TextArea rows={14} placeholder="请输入服务正文内容" />
          </Form.Item>
        </Card>

        <Card
          title="SEO 信息"
          style={{ borderRadius: 16, marginTop: 16 }}
          loading={loading}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="SEO 标题" name="seoTitle">
                <Input placeholder="默认可与服务标题保持一致" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="SEO 关键词" name="seoKeywords">
                <Input placeholder="多个关键词可使用英文逗号分隔" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="SEO 描述" name="seoDescription">
                <Input.TextArea rows={4} placeholder="建议 80-150 字之间" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <Space>
            <Button onClick={() => navigate('/services')}>取消</Button>
            <Button
              loading={submitting === 'draft' || submitting === 'offline'}
              onClick={() =>
                void handleSubmit(
                  (form.getFieldValue('status') ?? 'draft') as EntityStatus,
                ).catch(() => undefined)
              }
            >
              保存当前状态
            </Button>
            <Button
              type="primary"
              loading={submitting === 'published'}
              onClick={() => void handleSubmit('published').catch(() => undefined)}
            >
              保存并发布
            </Button>
          </Space>
        </div>
      </Form>
    </Space>
  );
}
