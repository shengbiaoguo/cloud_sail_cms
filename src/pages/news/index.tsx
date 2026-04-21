import { Button, Drawer, Space, Table } from 'antd';
import { FilterBar } from '@/components/common/filter-bar';
import { PageSection } from '@/components/common/page-section';
import { StatusTag } from '@/components/common/status-tag';
import { contentStatusOptions } from '@/constants/enums';
import { formatDateTime } from '@/utils/format';

const dataSource = [
  {
    id: 1,
    title: '企业官网升级发布',
    slug: 'official-site-relaunch',
    status: 'published',
    updatedAt: '2026-04-20T15:00:00',
    author: 'Lucy',
  },
  {
    id: 2,
    title: '展会活动预告',
    slug: 'expo-preview',
    status: 'draft',
    updatedAt: '2026-04-19T09:00:00',
    author: 'Admin',
  },
];

export default function NewsListPage() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="新闻管理"
        description="采用列表页 + 表单页 + 详情抽屉的典型 CMS 结构，便于后续快速复制到案例和服务模块。"
        extra={
          <Button type="primary" href="/news/create">
            新建新闻
          </Button>
        }
      >
        列表页建议统一支持关键词、状态、发布时间筛选，操作项保持编辑、发布/下线、删除三个主动作。
      </PageSection>

      <FilterBar keywordPlaceholder="标题 / slug" statusOptions={contentStatusOptions} />

      <div className="page-card">
        <Table
          rowKey="id"
          dataSource={dataSource}
          pagination={{ total: 2 }}
          columns={[
            { title: '标题', dataIndex: 'title' },
            { title: 'Slug', dataIndex: 'slug', width: 220 },
            {
              title: '状态',
              dataIndex: 'status',
              width: 100,
              render: (value) => <StatusTag value={value} />,
            },
            { title: '更新人', dataIndex: 'author', width: 120 },
            {
              title: '更新时间',
              dataIndex: 'updatedAt',
              width: 180,
              render: formatDateTime,
            },
            {
              title: '操作',
              key: 'action',
              width: 220,
              render: () => (
                <Space>
                  <Button type="link">查看</Button>
                  <Button type="link">编辑</Button>
                  <Button type="link" danger>
                    删除
                  </Button>
                </Space>
              ),
            },
          ]}
        />
      </div>

      <Drawer open={false} title="新闻详情" width={560}>
        新闻详情抽屉用于快速查看标题、摘要、状态、SEO 信息和发布时间。
      </Drawer>
    </Space>
  );
}
