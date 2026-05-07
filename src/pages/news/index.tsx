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
import { newsApi } from '@/api/modules/news';
import { PageSection } from '@/components/common/page-section';
import { StatusTag } from '@/components/common/status-tag';
import {
  CATEGORY_LABEL_MAP,
  contentStatusOptions,
  newsCategoryOptions,
} from '@/constants/enums';
import type { NewsCategoryValue, NewsItem, NewsListParams } from '@/types/content';
import { formatDateTime } from '@/utils/format';
import { showSuccessMessage } from '@/utils/feedback';

export default function NewsListPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm<NewsListParams>();
  const [listLoading, setListLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [items, setItems] = useState<NewsItem[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [query, setQuery] = useState<NewsListParams>({ current: 1, pageSize: 10 });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<NewsItem | null>(null);

  const loadList = async (nextQuery: NewsListParams) => {
    setListLoading(true);
    try {
      const result = await newsApi.getList(nextQuery);
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

  const handleSearch = (values: NewsListParams) => {
    setQuery({
      current: 1,
      pageSize: pagination.pageSize,
      keyword: values.keyword?.trim() || undefined,
      status: values.status,
      category: values.category,
    });
  };

  const handleReset = () => {
    form.resetFields();
    setQuery({ current: 1, pageSize: pagination.pageSize });
  };

  const handleOpenDetail = async (id: NewsItem['id']) => {
    setDrawerOpen(true);
    setDetailLoading(true);
    try {
      const detail = await newsApi.getDetail(String(id));
      setActiveItem(detail);
    } catch {
      setDrawerOpen(false);
      setActiveItem(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleRemove = async (id: NewsItem['id']) => {
    await newsApi.remove(String(id));
    showSuccessMessage('新闻已删除');
    await loadList(query);
    if (activeItem?.id === id) {
      setDrawerOpen(false);
      setActiveItem(null);
    }
  };

  const handleToggleStatus = async (record: NewsItem) => {
    const nextStatus = record.status === 'published' ? 'offline' : 'published';
    if (nextStatus === 'published') {
      await newsApi.publish(String(record.id));
    } else {
      await newsApi.offline(String(record.id));
    }
    showSuccessMessage(nextStatus === 'published' ? '新闻已发布' : '新闻已下线');
    await loadList(query);
    if (activeItem?.id === record.id) {
      const detail = await newsApi.getDetail(String(record.id));
      setActiveItem(detail);
    }
  };

  const columns: ColumnsType<NewsItem> = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (value: string) => (
        <div>
          <Typography.Text strong>{value}</Typography.Text>
        </div>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      width: 120,
      render: (value: NewsCategoryValue) => CATEGORY_LABEL_MAP[value] ?? value,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      width: 180,
      render: (value?: string[]) =>
        value?.length ? (
          <Space size={[4, 4]} wrap>
            {value.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </Space>
        ) : (
          '-'
        ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (value) => <StatusTag value={value} />,
    },
    { title: '排序', dataIndex: 'sortOrder', width: 90 },
    { title: '发布时间', dataIndex: 'publishedAt', width: 170, render: formatDateTime },
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
          <Button type="link" onClick={() => navigate(`/news/edit/${record.id}`)}>
            编辑
          </Button>
          <Button
            type="link"
            onClick={() => void handleToggleStatus(record).catch(() => undefined)}
          >
            {record.status === 'published' ? '下线' : '发布'}
          </Button>
          <Popconfirm
            title="确认删除这篇新闻吗？"
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
        title="新闻管理"
        description="采用列表页 + 表单页 + 详情抽屉的 CMS 结构，已切换为真实接口联调模式。"
        extra={
          <Button type="primary" onClick={() => navigate('/news/create')}>
            新建新闻
          </Button>
        }
      >
        当前页面数据来自服务端接口，可直接用于联调与验收。
      </PageSection>

      <div className="page-card">
        <Form form={form} layout="vertical" onFinish={handleSearch}>
          <div
            style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: 16 }}
          >
            <Form.Item<NewsListParams>
              label="关键词"
              name="keyword"
              style={{ marginBottom: 0 }}
            >
              <Input allowClear placeholder="请输入标题、Slug 或摘要关键词" />
            </Form.Item>
            <Form.Item<NewsListParams>
              label="分类"
              name="category"
              style={{ marginBottom: 0 }}
            >
              <Select allowClear placeholder="全部分类" options={newsCategoryOptions} />
            </Form.Item>
            <Form.Item<NewsListParams>
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
        title="新闻详情"
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
                { key: 'summary', label: '摘要', children: activeItem.summary || '-' },
                {
                  key: 'category',
                  label: '分类',
                  children:
                    CATEGORY_LABEL_MAP[activeItem.category] ?? activeItem.category,
                },
                {
                  key: 'tags',
                  label: '标签',
                  children: activeItem.tags?.length ? activeItem.tags.join('、') : '-',
                },
                {
                  key: 'publishedAt',
                  label: '发布时间',
                  children: formatDateTime(activeItem.publishedAt),
                },
                {
                  key: 'updatedBy',
                  label: '最后更新人',
                  children: activeItem.updatedByName ?? '-',
                },
                {
                  key: 'updatedAt',
                  label: '最后更新时间',
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
              title="正文内容"
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

            <Descriptions
              title="SEO 信息"
              column={1}
              items={[
                {
                  key: 'seoTitle',
                  label: 'SEO 标题',
                  children: activeItem.seoTitle || '-',
                },
                {
                  key: 'seoKeywords',
                  label: 'SEO 关键词',
                  children: activeItem.seoKeywords || '-',
                },
                {
                  key: 'seoDescription',
                  label: 'SEO 描述',
                  children: activeItem.seoDescription || '-',
                },
              ]}
            />
          </Space>
        ) : null}
      </Drawer>
    </Space>
  );
}
