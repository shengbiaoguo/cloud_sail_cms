import { Button, Space, Table } from 'antd';
import { FilterBar } from '@/components/common/filter-bar';
import { PageSection } from '@/components/common/page-section';
import { StatusTag } from '@/components/common/status-tag';
import { contentStatusOptions } from '@/constants/enums';

const dataSource = [
  { id: 1, title: '品牌咨询', sortOrder: 1, status: 'published' },
  { id: 2, title: '官网建设', sortOrder: 2, status: 'draft' },
];

export default function ServicesListPage() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="服务管理"
        description="服务模块重点在列表管理效率，排序、上下线和简要介绍是核心。"
        extra={
          <Button type="primary" href="/services/create">
            新建服务
          </Button>
        }
      >
        MVP 阶段建议先用数值排序，后续如果有需求再升级成拖拽排序。
      </PageSection>

      <FilterBar keywordPlaceholder="服务标题" statusOptions={contentStatusOptions} />

      <div className="page-card">
        <Table
          rowKey="id"
          dataSource={dataSource}
          pagination={{ total: 2 }}
          columns={[
            { title: '服务标题', dataIndex: 'title' },
            { title: '排序', dataIndex: 'sortOrder', width: 100 },
            {
              title: '状态',
              dataIndex: 'status',
              width: 100,
              render: (value) => <StatusTag value={value} />,
            },
            {
              title: '操作',
              key: 'action',
              width: 220,
              render: () => (
                <Space>
                  <Button type="link">编辑</Button>
                  <Button type="link">上下线</Button>
                  <Button type="link" danger>
                    删除
                  </Button>
                </Space>
              ),
            },
          ]}
        />
      </div>
    </Space>
  );
}
