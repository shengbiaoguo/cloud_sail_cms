import { Result, Spin } from 'antd';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';

export function AuthGuard() {
  const location = useLocation();
  const { token, initialized, bootstrap } = useAuthStore();

  useEffect(() => {
    if (!initialized) {
      bootstrap();
    }
  }, [bootstrap, initialized]);

  if (!initialized) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export function RoleGuard({ roles }: { roles: Array<'super_admin' | 'editor'> }) {
  const { currentUser } = useAuthStore();

  if (!currentUser || !roles.includes(currentUser.role)) {
    return <Result status="403" title="403" subTitle="你没有访问当前页面的权限。" />;
  }

  return <Outlet />;
}
