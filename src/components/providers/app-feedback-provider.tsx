import { App } from 'antd';
import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { setGlobalMessage } from '@/utils/feedback';

function FeedbackRegistrar() {
  const { message } = App.useApp();

  useEffect(() => {
    setGlobalMessage(message);
  }, [message]);

  return null;
}

export function AppFeedbackProvider({ children }: PropsWithChildren) {
  return (
    <App>
      <FeedbackRegistrar />
      {children}
    </App>
  );
}
