import { Button, Drawer, Form, Input, Select, Space, Table } from 'antd';
import { FilterBar } from '@/components/common/filter-bar';
import { PageSection } from '@/components/common/page-section';
import { StatusTag } from '@/components/common/status-tag';
import { leadStatusOptions } from '@/constants/enums';
import { formatDateTime } from '@/utils/format';

const dataSource = [
  {
    id: 1,
    name: '张先生',
    company: '星航科技',
    phone: '138****1111',
    status: 'pending',
    createdAt: '2026-04-20T10:30:00',
  },
  {
    id: 2,
    name: '李女士',
    company: '启帆集团',
    phone: '139****2222',
    status: 'contacted',
    createdAt: '2026-04-19T15:20:00',
  },
];

export default function LeadsPage() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="线索管理"
        description="线索模块优先保证处理效率，列表查看、状态流转、备注记录是 MVP 的核心能力。"
      >
        建议后续增加分配负责人和 CSV 导出，但第一阶段可以先把详情抽屉和状态变更闭环做好。
      </PageSection>

      <FilterBar
        keywordPlaceholder="姓名 / 手机 / 公司"
        statusOptions={leadStatusOptions}
      />

      <div className="page-card">
        <Table
          rowKey="id"
          dataSource={dataSource}
          columns={[
            { title: '姓名', dataIndex: 'name', width: 120 },
            { title: '公司', dataIndex: 'company' },
            { title: '电话', dataIndex: 'phone', width: 160 },
            {
              title: '状态',
              dataIndex: 'status',
              width: 100,
              render: (value) => <StatusTag value={value} />,
            },
            {
              title: '提交时间',
              dataIndex: 'createdAt',
              width: 180,
              render: formatDateTime,
            },
            {
              title: '操作',
              key: 'action',
              width: 220,
              render: () => (
                <Space>
                  <Button type="link">查看详情</Button>
                  <Button type="link">更新状态</Button>
                </Space>
              ),
            },
          ]}
        />
      </div>

      <Drawer open={false} title="线索详情" width={560}>
        <Form layout="vertical">
          <Form.Item label="状态">
            <Select options={leadStatusOptions} />
          </Form.Item>
          <Form.Item label="备注">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Drawer>
    </Space>
  );
}
