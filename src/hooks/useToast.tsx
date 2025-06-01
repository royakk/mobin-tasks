import { App } from 'antd';

type ToastType = 'info' | 'success' | 'error' | 'warning' | 'loading';

export const useToast = () => {
  const { message, notification, modal } = App.useApp();

  const showMessage = (content: string, type: ToastType = 'info') => {
    message[type](content);
  };

  const showNotification = (content: string, type: Exclude<ToastType, 'loading'> = 'info') => {
    notification[type]({ message: content });
  };

  const showModal = (content: string, type: Exclude<ToastType, 'loading'> = 'info') => {
    modal[type]({ content });
  };

  return { showMessage, showNotification, showModal };
};