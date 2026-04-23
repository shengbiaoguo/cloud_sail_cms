import {
  Button,
  Drawer,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { adminUsersApi } from '@/api/modules/admin-users';
import { PageSection } from '@/components/common/page-section';
import { StatusTag } from '@/components/common/status-tag';
import { adminRoleOptions, adminStatusOptions } from '@/constants/enums';
import type { AdminUserItem, AdminUserListParams } from '@/types/admin';
import type { UserRole, UserStatus } from '@/types/common';
import { formatDateTime } from '@/utils/format';
import { showSuccessMessage } from '@/utils/feedback';

interface AdminUserFormValues {
  username: string;
  nickname: string;
  role: UserRole;
  status: UserStatus;
  password?: string;
}

interface PasswordFormValues {
  password: string;
  confirmPassword: string;
}

export default function AdminUsersPage() {
  const [listForm] = Form.useForm<AdminUserListParams>();
  const [userForm] = Form.useForm<AdminUserFormValues>();
  const [passwordForm] = Form.useForm<PasswordFormValues>();

  const [listLoading, setListLoading] = useState(false);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [items, setItems] = useState<AdminUserItem[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [query, setQuery] = useState<AdminUserListParams>({ current: 1, pageSize: 10 });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordTargetId, setPasswordTargetId] = useState<string | null>(null);

  const isEdit = Boolean(editingId);

  const loadList = async (nextQuery: AdminUserListParams) => {
    setListLoading(true);
    try {
      const result = await adminUsersApi.getList(nextQuery);
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

  const handleSearch = (values: AdminUserListParams) => {
    setQuery({
      current: 1,
      pageSize: pagination.pageSize,
      keyword: values.keyword?.trim() || undefined,
      role: values.role,
      status: values.status,
    });
  };

  const handleReset = () => {
    listForm.resetFields();
    setQuery({ current: 1, pageSize: pagination.pageSize });
  };

  const handleCreate = () => {
    setEditingId(null);
    userForm.resetFields();
    userForm.setFieldsValue({
      role: 'editor',
      status: 'enabled',
    });
    setDrawerOpen(true);
  };

  const handleEdit = async (id: AdminUserItem['id']) => {
    setDrawerOpen(true);
    setDrawerLoading(true);
    try {
      const detail = await adminUsersApi.getDetail(String(id));
      setEditingId(String(detail.id));
      userForm.setFieldsValue({
        username: detail.username,
        nickname: detail.nickname,
        role: detail.role,
        status: detail.status,
      });
    } catch {
      setDrawerOpen(false);
      setEditingId(null);
      userForm.resetFields();
    } finally {
      setDrawerLoading(false);
    }
  };

  const handleSubmitUser = async () => {
    const values = await userForm.validateFields();
    setSubmitLoading(true);
    try {
      if (isEdit && editingId) {
        await adminUsersApi.update(editingId, {
          nickname: values.nickname.trim(),
          role: values.role,
          status: values.status,
        });
        showSuccessMessage('管理员已更新');
      } else {
        await adminUsersApi.create({
          username: values.username.trim(),
          nickname: values.nickname.trim(),
          role: values.role,
          status: values.status,
          password: (values.password || '').trim(),
        });
        showSuccessMessage('管理员已创建');
      }
      setDrawerOpen(false);
      setEditingId(null);
      userForm.resetFields();
      await loadList(query);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleToggleStatus = async (record: AdminUserItem) => {
    if (record.status === 'enabled') {
      await adminUsersApi.disable(String(record.id));
      showSuccessMessage('管理员已禁用');
    } else {
      await adminUsersApi.enable(String(record.id));
      showSuccessMessage('管理员已启用');
    }
    await loadList(query);
  };

  const handleOpenPasswordModal = (id: AdminUserItem['id']) => {
    setPasswordTargetId(String(id));
    passwordForm.resetFields();
    setPasswordModalOpen(true);
  };

  const handleUpdatePassword = async () => {
    if (!passwordTargetId) {
      return;
    }
    const values = await passwordForm.validateFields();
    setPasswordLoading(true);
    try {
      await adminUsersApi.updatePassword(passwordTargetId, values.password.trim());
      showSuccessMessage('密码已更新');
      setPasswordModalOpen(false);
      setPasswordTargetId(null);
      passwordForm.resetFields();
    } finally {
      setPasswordLoading(false);
    }
  };

  const columns: ColumnsType<AdminUserItem> = [
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
      width: 260,
      render: (_, record) => (
        <Space size={4} wrap>
          <Button type="link" onClick={() => void handleEdit(record.id)}>
            编辑
          </Button>
          <Button type="link" onClick={() => handleOpenPasswordModal(record.id)}>
            改密码
          </Button>
          <Popconfirm
            title={
              record.status === 'enabled' ? '确认禁用该账号吗？' : '确认启用该账号吗？'
            }
            onConfirm={() => handleToggleStatus(record).catch(() => undefined)}
          >
            <Button type="link">{record.status === 'enabled' ? '禁用' : '启用'}</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="管理员管理"
        description="管理员模块已接入真实接口，支持账号创建、编辑、改密与启停用。"
        extra={
          <Button type="primary" onClick={handleCreate}>
            新建管理员
          </Button>
        }
      >
        当前保持角色级权限控制，后续可按需扩展到按钮级权限。
      </PageSection>

      <div className="page-card">
        <Form form={listForm} layout="vertical" onFinish={handleSearch}>
          <div
            style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: 16 }}
          >
            <Form.Item<AdminUserListParams>
              label="关键词"
              name="keyword"
              style={{ marginBottom: 0 }}
            >
              <Input allowClear placeholder="请输入账号或昵称关键词" />
            </Form.Item>
            <Form.Item<AdminUserListParams>
              label="角色"
              name="role"
              style={{ marginBottom: 0 }}
            >
              <Select allowClear placeholder="全部角色" options={adminRoleOptions} />
            </Form.Item>
            <Form.Item<AdminUserListParams>
              label="状态"
              name="status"
              style={{ marginBottom: 0 }}
            >
              <Select allowClear placeholder="全部状态" options={adminStatusOptions} />
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
          setEditingId(null);
          userForm.resetFields();
        }}
        title={isEdit ? '编辑管理员' : '新建管理员'}
        width={480}
        loading={drawerLoading}
      >
        <Form form={userForm} layout="vertical" disabled={drawerLoading}>
          <Form.Item<AdminUserFormValues>
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input disabled={isEdit} />
          </Form.Item>
          <Form.Item<AdminUserFormValues>
            label="昵称"
            name="nickname"
            rules={[{ required: true, message: '请输入昵称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<AdminUserFormValues>
            label="角色"
            name="role"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select options={adminRoleOptions} />
          </Form.Item>
          <Form.Item<AdminUserFormValues>
            label="状态"
            name="status"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select options={adminStatusOptions} />
          </Form.Item>
          {!isEdit ? (
            <Form.Item<AdminUserFormValues>
              label="初始密码"
              name="password"
              rules={[
                { required: true, message: '请输入初始密码' },
                { min: 6, message: '密码至少 6 位' },
              ]}
            >
              <Input.Password />
            </Form.Item>
          ) : null}
        </Form>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Space>
            <Button
              onClick={() => {
                setDrawerOpen(false);
                setEditingId(null);
                userForm.resetFields();
              }}
            >
              取消
            </Button>
            <Button
              type="primary"
              loading={submitLoading}
              onClick={() => void handleSubmitUser().catch(() => undefined)}
            >
              保存
            </Button>
          </Space>
        </div>
      </Drawer>

      <Modal
        open={passwordModalOpen}
        title="修改密码"
        okText="确认修改"
        cancelText="取消"
        confirmLoading={passwordLoading}
        onCancel={() => {
          setPasswordModalOpen(false);
          setPasswordTargetId(null);
          passwordForm.resetFields();
        }}
        onOk={() => void handleUpdatePassword().catch(() => undefined)}
      >
        <Form form={passwordForm} layout="vertical">
          <Form.Item<PasswordFormValues>
            label="新密码"
            name="password"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码至少 6 位' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<PasswordFormValues>
            label="确认密码"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请再次输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}
