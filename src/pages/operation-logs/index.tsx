import { Table, Space } from 'antd';
import { PageSection } from '@/components/common/page-section';
import { formatDateTime } from '@/utils/format';

const dataSource = [
  {
    id: 1,
    adminUserName: 'admin',
    module: 'auth',
    action: 'login',
    content: '管理员登录后台',
    ip: '127.0.0.1',
    createdAt: '2026-04-20T20:10:00',
  },
  {
    id: 2,
    adminUserName: 'editor01',
    module: 'news',
    action: 'create',
    content: '创建新闻《企业官网升级发布》',
    ip: '127.0.0.1',
    createdAt: '2026-04-20T15:00:00',
  },
];

export default function OperationLogsPage() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="操作日志"
        description="至少覆盖登录、新建、编辑、删除、线索状态修改这几类关键动作。"
      >
        操作日志建议只读展示，不在后台做复杂检索，先保证字段完整与分页可用。
      </PageSection>

      <div className="page-card">
        <Table
          rowKey="id"
          dataSource={dataSource}
          columns={[
            { title: '操作人', dataIndex: 'adminUserName', width: 120 },
            { title: '模块', dataIndex: 'module', width: 120 },
            { title: '动作', dataIndex: 'action', width: 120 },
            { title: '内容', dataIndex: 'content' },
            { title: 'IP', dataIndex: 'ip', width: 140 },
            {
              title: '时间',
              dataIndex: 'createdAt',
              width: 180,
              render: formatDateTime,
            },
          ]}
        />
      </div>
    </Space>
  );
}
