import {
  AppstoreOutlined,
  FileImageOutlined,
  FileSearchOutlined,
  NotificationOutlined,
  SettingOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';
import type { UserRole } from '@/types/common';

export interface AppMenuItem {
  key: string;
  label: string;
  path: string;
  icon: ReactNode;
  roles?: UserRole[];
}

export const appMenus: AppMenuItem[] = [
  {
    key: 'dashboard',
    label: '控制台',
    path: '/dashboard',
    icon: <AppstoreOutlined />,
  },
  {
    key: 'news',
    label: '新闻管理',
    path: '/news',
    icon: <NotificationOutlined />,
  },
  {
    key: 'cases',
    label: '案例管理',
    path: '/cases',
    icon: <FileImageOutlined />,
  },
  {
    key: 'services',
    label: '服务管理',
    path: '/services',
    icon: <FileSearchOutlined />,
  },
  {
    key: 'site-config',
    label: '站点配置',
    path: '/site-config',
    icon: <SettingOutlined />,
  },
  {
    key: 'leads',
    label: '线索管理',
    path: '/leads',
    icon: <TeamOutlined />,
  },
  {
    key: 'admin-users',
    label: '管理员',
    path: '/admin-users',
    icon: <UserOutlined />,
    roles: ['super_admin'],
  },
  {
    key: 'uploads',
    label: '上传记录',
    path: '/uploads',
    icon: <UploadOutlined />,
  },
  {
    key: 'operation-logs',
    label: '操作日志',
    path: '/operation-logs',
    icon: <FileSearchOutlined />,
    roles: ['super_admin'],
  },
];
