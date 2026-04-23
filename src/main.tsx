import React from 'react';
import ReactDOM from 'react-dom/client';
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { RouterProvider } from 'react-router-dom';
import { AppFeedbackProvider } from '@/components/providers/app-feedback-provider';
import { appRouter } from '@/router';
import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#165dff',
          borderRadius: 10,
          colorBgLayout: '#f3f6fb',
          fontFamily: '"Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
        },
      }}
    >
      <AppFeedbackProvider>
        <RouterProvider router={appRouter} />
      </AppFeedbackProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
