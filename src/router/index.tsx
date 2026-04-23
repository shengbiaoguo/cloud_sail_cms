import { Spin } from 'antd';
import { Suspense, lazy, type ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/app-shell';
import { AuthGuard, RoleGuard } from '@/components/guards/auth-guard';

const LoginPage = lazy(() => import('@/pages/login'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const NewsListPage = lazy(() => import('@/pages/news'));
const NewsFormPage = lazy(() => import('@/pages/news/form'));
const CasesListPage = lazy(() => import('@/pages/cases'));
const CaseFormPage = lazy(() => import('@/pages/cases/form'));
const ServicesListPage = lazy(() => import('@/pages/services'));
const ServiceFormPage = lazy(() => import('@/pages/services/form'));
const SiteConfigPage = lazy(() => import('@/pages/site-config'));
const LeadsPage = lazy(() => import('@/pages/leads'));
const AdminUsersPage = lazy(() => import('@/pages/admin-users'));
const UploadsPage = lazy(() => import('@/pages/uploads'));
const OperationLogsPage = lazy(() => import('@/pages/operation-logs'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));

const routeLoadingFallback = (
  <div style={{ minHeight: 240, display: 'grid', placeItems: 'center' }}>
    <Spin />
  </div>
);

const withSuspense = (node: ReactNode) => (
  <Suspense fallback={routeLoadingFallback}>{node}</Suspense>
);

export const appRouter = createBrowserRouter([
  {
    path: '/login',
    element: withSuspense(<LoginPage />),
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/',
        element: <AppShell />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: withSuspense(<DashboardPage />) },
          { path: 'news', element: withSuspense(<NewsListPage />) },
          { path: 'news/create', element: withSuspense(<NewsFormPage />) },
          { path: 'news/edit/:id', element: withSuspense(<NewsFormPage />) },
          { path: 'cases', element: withSuspense(<CasesListPage />) },
          { path: 'cases/create', element: withSuspense(<CaseFormPage />) },
          { path: 'cases/edit/:id', element: withSuspense(<CaseFormPage />) },
          { path: 'services', element: withSuspense(<ServicesListPage />) },
          { path: 'services/create', element: withSuspense(<ServiceFormPage />) },
          { path: 'services/edit/:id', element: withSuspense(<ServiceFormPage />) },
          { path: 'site-config', element: withSuspense(<SiteConfigPage />) },
          { path: 'leads', element: withSuspense(<LeadsPage />) },
          { path: 'uploads', element: withSuspense(<UploadsPage />) },
          {
            element: <RoleGuard roles={['super_admin']} />,
            children: [
              { path: 'admin-users', element: withSuspense(<AdminUsersPage />) },
              { path: 'operation-logs', element: withSuspense(<OperationLogsPage />) },
            ],
          },
          { path: '*', element: withSuspense(<NotFoundPage />) },
        ],
      },
    ],
  },
]);
