import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, Space, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { appMenus } from '@/config/menu';
import { useAuthStore } from '@/stores/auth-store';

const { Header, Sider, Content } = Layout;

export function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser, logout } = useAuthStore();

  const visibleMenus = useMemo(
    () =>
      appMenus.filter((item) => {
        if (!item.roles?.length) return true;
        return currentUser ? item.roles.includes(currentUser.role) : false;
      }),
    [currentUser],
  );

  const selectedKeys = visibleMenus
    .filter((item) => location.pathname.startsWith(item.path))
    .map((item) => item.key);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={240}
        collapsible
        collapsed={collapsed}
        trigger={null}
        theme="light"
        style={{
          borderRight: '1px solid rgba(148, 163, 184, 0.14)',
          boxShadow: '6px 0 30px rgba(15, 23, 42, 0.04)',
        }}
      >
        <div
          style={{
            height: 72,
            padding: collapsed ? '16px 12px' : '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #165dff 0%, #36a3ff 100%)',
            }}
          />
          {!collapsed && (
            <div>
              <Typography.Text strong style={{ display: 'block' }}>
                Cloud Sail CMS
              </Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                企业官网管理后台
              </Typography.Text>
            </div>
          )}
        </div>

        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          items={visibleMenus.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            onClick: () => navigate(item.path),
          }))}
          style={{ borderInlineEnd: 'none', paddingInline: 12 }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: '0 20px',
            background: 'rgba(255, 255, 255, 0.72)',
            backdropFilter: 'blur(18px)',
            borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed((prev) => !prev)}
          />

          <Dropdown
            menu={{
              items: [
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: '退出登录',
                  onClick: () => {
                    logout();
                    navigate('/login');
                  },
                },
              ],
            }}
          >
            <Space style={{ cursor: 'pointer' }}>
              <Avatar>{currentUser?.nickname?.slice(0, 1) ?? 'A'}</Avatar>
              <div>
                <Typography.Text strong>{currentUser?.nickname ?? '-'}</Typography.Text>
                <div style={{ fontSize: 12, color: '#64748b' }}>
                  {currentUser?.role === 'super_admin' ? '超级管理员' : '编辑'}
                </div>
              </div>
            </Space>
          </Dropdown>
        </Header>

        <Content style={{ padding: 20 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
