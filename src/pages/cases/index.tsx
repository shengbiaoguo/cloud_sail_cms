import { Button, Space, Table } from 'antd';
import { FilterBar } from '@/components/common/filter-bar';
import { PageSection } from '@/components/common/page-section';
import { StatusTag } from '@/components/common/status-tag';
import { contentStatusOptions } from '@/constants/enums';
import { formatDateTime } from '@/utils/format';

const dataSource = [
  {
    id: 1,
    title: '制造业数字化案例',
    industry: '制造业',
    status: 'published',
    updatedAt: '2026-04-18T10:00:00',
  },
  {
    id: 2,
    title: '教育品牌升级案例',
    industry: '教育',
    status: 'offline',
    updatedAt: '2026-04-17T08:40:00',
  },
];

export default function CasesListPage() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="案例管理"
        description="案例模块在新闻基础上增加客户名称、行业、项目时间等业务字段。"
        extra={
          <Button type="primary" href="/cases/create">
            新建案例
          </Button>
        }
      >
        建议保留快速预览能力，减少管理员反复进入编辑页确认内容。
      </PageSection>

      <FilterBar
        keywordPlaceholder="标题 / 客户名称"
        statusOptions={contentStatusOptions}
      />

      <div className="page-card">
        <Table
          rowKey="id"
          dataSource={dataSource}
          pagination={{ total: 2 }}
          columns={[
            { title: '标题', dataIndex: 'title' },
            { title: '行业', dataIndex: 'industry', width: 140 },
            {
              title: '状态',
              dataIndex: 'status',
              width: 100,
              render: (value) => <StatusTag value={value} />,
            },
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
    </Space>
  );
}
