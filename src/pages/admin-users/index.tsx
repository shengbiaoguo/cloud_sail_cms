import { Button, Drawer, Form, Input, Select, Space, Table } from 'antd';
import { FilterBar } from '@/components/common/filter-bar';
import { PageSection } from '@/components/common/page-section';
import { StatusTag } from '@/components/common/status-tag';
import { adminRoleOptions, adminStatusOptions } from '@/constants/enums';
import { formatDateTime } from '@/utils/format';

const dataSource = [
  {
    id: 1,
    username: 'admin',
    nickname: '系统管理员',
    role: 'super_admin',
    status: 'enabled',
    lastLoginAt: '2026-04-20T20:10:00',
  },
  {
    id: 2,
    username: 'editor01',
    nickname: '内容编辑',
    role: 'editor',
    status: 'enabled',
    lastLoginAt: '2026-04-19T09:00:00',
  },
];

export default function AdminUsersPage() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="管理员管理"
        description="MVP 权限控制可先做角色级菜单与路由限制，不急着引入复杂 RBAC。"
        extra={<Button type="primary">新建管理员</Button>}
      >
        超级管理员可以管理账号、角色和启停状态；编辑账号只保留内容与线索相关能力。
      </PageSection>

      <FilterBar keywordPlaceholder="账号 / 昵称" statusOptions={adminStatusOptions} />

      <div className="page-card">
        <Table
          rowKey="id"
          dataSource={dataSource}
          columns={[
            { title: '账号', dataIndex: 'username', width: 180 },
            { title: '昵称', dataIndex: 'nickname', width: 180 },
            {
              title: '角色',
              dataIndex: 'role',
              width: 120,
              render: (value) =>
                adminRoleOptions.find((item) => item.value === value)?.label ?? value,
            },
            {
              title: '状态',
              dataIndex: 'status',
              width: 100,
              render: (value) => <StatusTag value={value} />,
            },
            {
              title: '最后登录',
              dataIndex: 'lastLoginAt',
              width: 180,
              render: formatDateTime,
            },
            {
              title: '操作',
              key: 'action',
              width: 220,
              render: () => (
                <Space>
                  <Button type="link">编辑</Button>
                  <Button type="link">改密码</Button>
                  <Button type="link">启停用</Button>
                </Space>
              ),
            },
          ]}
        />
      </div>

      <Drawer open={false} title="管理员表单" width={480}>
        <Form layout="vertical">
          <Form.Item label="账号">
            <Input />
          </Form.Item>
          <Form.Item label="昵称">
            <Input />
          </Form.Item>
          <Form.Item label="角色">
            <Select options={adminRoleOptions} />
          </Form.Item>
          <Form.Item label="初始密码">
            <Input.Password />
          </Form.Item>
        </Form>
      </Drawer>
    </Space>
  );
}
