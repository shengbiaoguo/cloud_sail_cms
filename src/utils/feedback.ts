import type { MessageInstance } from 'antd/es/message/interface';

let globalMessage: MessageInstance | null = null;

export function setGlobalMessage(instance: MessageInstance) {
  globalMessage = instance;
}

export function showErrorMessage(content: string) {
  if (globalMessage) {
    globalMessage.error(content);
    return;
  }

  window.setTimeout(() => {
    window.alert(content);
  }, 0);
}

export function showSuccessMessage(content: string) {
  if (globalMessage) {
    globalMessage.success(content);
    return;
  }

  window.setTimeout(() => {
    window.alert(content);
  }, 0);
}
