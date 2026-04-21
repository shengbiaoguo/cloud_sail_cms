import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { RouterProvider } from 'react-router-dom';
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
      <RouterProvider router={appRouter} />
    </ConfigProvider>
  </React.StrictMode>,
);
