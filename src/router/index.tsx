import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/app-shell';
import { AuthGuard, RoleGuard } from '@/components/guards/auth-guard';
import LoginPage from '@/pages/login';
import DashboardPage from '@/pages/dashboard';
import NewsListPage from '@/pages/news';
import NewsFormPage from '@/pages/news/form';
import CasesListPage from '@/pages/cases';
import CaseFormPage from '@/pages/cases/form';
import ServicesListPage from '@/pages/services';
import ServiceFormPage from '@/pages/services/form';
import SiteConfigPage from '@/pages/site-config';
import LeadsPage from '@/pages/leads';
import AdminUsersPage from '@/pages/admin-users';
import UploadsPage from '@/pages/uploads';
import OperationLogsPage from '@/pages/operation-logs';
import NotFoundPage from '@/pages/not-found';

export const appRouter = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/',
        element: <AppShell />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'news', element: <NewsListPage /> },
          { path: 'news/create', element: <NewsFormPage /> },
          { path: 'news/edit/:id', element: <NewsFormPage /> },
          { path: 'cases', element: <CasesListPage /> },
          { path: 'cases/create', element: <CaseFormPage /> },
          { path: 'cases/edit/:id', element: <CaseFormPage /> },
          { path: 'services', element: <ServicesListPage /> },
          { path: 'services/create', element: <ServiceFormPage /> },
          { path: 'services/edit/:id', element: <ServiceFormPage /> },
          { path: 'site-config', element: <SiteConfigPage /> },
          { path: 'leads', element: <LeadsPage /> },
          { path: 'uploads', element: <UploadsPage /> },
          {
            element: <RoleGuard roles={['super_admin']} />,
            children: [
              { path: 'admin-users', element: <AdminUsersPage /> },
              { path: 'operation-logs', element: <OperationLogsPage /> },
            ],
          },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
