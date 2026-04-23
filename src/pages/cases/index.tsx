import {
  Button,
  Descriptions,
  Drawer,
  Form,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { casesApi } from '@/api/modules/cases';
import { PageSection } from '@/components/common/page-section';
import { StatusTag } from '@/components/common/status-tag';
import { contentStatusOptions } from '@/constants/enums';
import type { CaseStudyItem, ContentListParams } from '@/types/content';
import { formatDateTime } from '@/utils/format';
import { showSuccessMessage } from '@/utils/feedback';

export default function CasesListPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm<ContentListParams>();
  const [listLoading, setListLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [items, setItems] = useState<CaseStudyItem[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [query, setQuery] = useState<ContentListParams>({ current: 1, pageSize: 10 });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<CaseStudyItem | null>(null);

  const loadList = async (nextQuery: ContentListParams) => {
    setListLoading(true);
    try {
      const result = await casesApi.getList(nextQuery);
      setItems(result.items);
      setPagination({
        current: result.current,
        pageSize: result.pageSize,
        total: result.total,
      });
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    void loadList(query).catch(() => undefined);
  }, [query]);

  const handleSearch = (values: ContentListParams) => {
    setQuery({
      current: 1,
      pageSize: pagination.pageSize,
      keyword: values.keyword?.trim() || undefined,
      status: values.status,
    });
  };

  const handleReset = () => {
    form.resetFields();
    setQuery({ current: 1, pageSize: pagination.pageSize });
  };

  const handleOpenDetail = async (id: CaseStudyItem['id']) => {
    setDrawerOpen(true);
    setDetailLoading(true);
    try {
      const detail = await casesApi.getDetail(String(id));
      setActiveItem(detail);
    } catch {
      setDrawerOpen(false);
      setActiveItem(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleRemove = async (id: CaseStudyItem['id']) => {
    await casesApi.remove(String(id));
    showSuccessMessage('案例已删除');
    await loadList(query);
    if (activeItem?.id === id) {
      setDrawerOpen(false);
      setActiveItem(null);
    }
  };

  const handleToggleStatus = async (record: CaseStudyItem) => {
    const nextStatus = record.status === 'published' ? 'offline' : 'published';
    if (nextStatus === 'published') {
      await casesApi.publish(String(record.id));
    } else {
      await casesApi.offline(String(record.id));
    }
    showSuccessMessage(nextStatus === 'published' ? '案例已发布' : '案例已下线');
    await loadList(query);
    if (activeItem?.id === record.id) {
      const detail = await casesApi.getDetail(String(record.id));
      setActiveItem(detail);
    }
  };

  const columns: ColumnsType<CaseStudyItem> = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (value: string, record) => (
        <div>
          <Typography.Text strong>{value}</Typography.Text>
          <div style={{ marginTop: 4, color: '#64748b' }}>{record.summary}</div>
        </div>
      ),
    },
    {
      title: '客户名称',
      dataIndex: 'clientName',
      width: 140,
      render: (value?: string) => value ?? '-',
    },
    {
      title: '行业',
      dataIndex: 'industry',
      width: 120,
      render: (value?: string) => value ?? '-',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (value) => <StatusTag value={value} />,
    },
    { title: '排序', dataIndex: 'sortOrder', width: 90 },
    { title: '更新时间', dataIndex: 'updatedAt', width: 170, render: formatDateTime },
    {
      title: '操作',
      key: 'action',
      width: 260,
      render: (_, record) => (
        <Space size={4} wrap>
          <Button type="link" onClick={() => void handleOpenDetail(record.id)}>
            查看
          </Button>
          <Button type="link" onClick={() => navigate(`/cases/edit/${record.id}`)}>
            编辑
          </Button>
          <Button
            type="link"
            onClick={() => void handleToggleStatus(record).catch(() => undefined)}
          >
            {record.status === 'published' ? '下线' : '发布'}
          </Button>
          <Popconfirm
            title="确认删除这个案例吗？"
            description="删除后将无法恢复。"
            onConfirm={() => handleRemove(record.id).catch(() => undefined)}
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="案例管理"
        description="案例模块已接入真实接口，支持列表筛选、详情查看与发布流转。"
        extra={
          <Button type="primary" onClick={() => navigate('/cases/create')}>
            新建案例
          </Button>
        }
      >
        在新闻模块能力基础上补充了客户名称、行业和项目时间字段。
      </PageSection>

      <div className="page-card">
        <Form form={form} layout="vertical" onFinish={handleSearch}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: 16 }}>
            <Form.Item<ContentListParams>
              label="关键词"
              name="keyword"
              style={{ marginBottom: 0 }}
            >
              <Input allowClear placeholder="请输入标题、客户名称或摘要关键词" />
            </Form.Item>
            <Form.Item<ContentListParams>
              label="状态"
              name="status"
              style={{ marginBottom: 0 }}
            >
              <Select allowClear placeholder="全部状态" options={contentStatusOptions} />
            </Form.Item>
            <Form.Item label=" " style={{ marginBottom: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button onClick={handleReset}>重置</Button>
              </Space>
            </Form.Item>
          </div>
        </Form>
      </div>

      <div className="page-card">
        <Table
          loading={listLoading}
          rowKey="id"
          dataSource={items}
          columns={columns}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            onChange: (current, pageSize) =>
              setQuery((prev) => ({ ...prev, current, pageSize })),
          }}
        />
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setActiveItem(null);
        }}
        title="案例详情"
        width={640}
        loading={detailLoading}
      >
        {activeItem ? (
          <Space direction="vertical" size={20} style={{ width: '100%' }}>
            <div>
              <Typography.Title level={4} style={{ marginBottom: 8 }}>
                {activeItem.title}
              </Typography.Title>
              <Space wrap>
                <StatusTag value={activeItem.status} />
                <Tag>Slug: {activeItem.slug}</Tag>
                <Tag>排序: {activeItem.sortOrder}</Tag>
              </Space>
            </div>

            <Descriptions
              title="基础信息"
              column={1}
              items={[
                {
                  key: 'clientName',
                  label: '客户名称',
                  children: activeItem.clientName || '-',
                },
                {
                  key: 'industry',
                  label: '所属行业',
                  children: activeItem.industry || '-',
                },
                {
                  key: 'projectDate',
                  label: '项目时间',
                  children: formatDateTime(activeItem.projectDate),
                },
                { key: 'summary', label: '摘要', children: activeItem.summary || '-' },
                {
                  key: 'updatedAt',
                  label: '更新时间',
                  children: formatDateTime(activeItem.updatedAt),
                },
                {
                  key: 'coverImage',
                  label: '封面图',
                  children: activeItem.coverImage ? (
                    <a href={activeItem.coverImage} target="_blank" rel="noreferrer">
                      {activeItem.coverImage}
                    </a>
                  ) : (
                    '-'
                  ),
                },
              ]}
            />

            <Descriptions
              title="项目介绍"
              column={1}
              items={[
                {
                  key: 'content',
                  label: '正文',
                  children: (
                    <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }}>
                      {activeItem.content || '-'}
                    </Typography.Paragraph>
                  ),
                },
              ]}
            />
          </Space>
        ) : null}
      </Drawer>
    </Space>
  );
}
