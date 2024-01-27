import { ToastType } from './toast-type';

export interface IToast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}
