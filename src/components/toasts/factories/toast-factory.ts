import { IToast } from '../entities/toast';

function createToastId(): string {
  return window.crypto.randomUUID();
}

export const ToastFactory = {
  empty(): IToast {
    return {
      id: createToastId(),
      message: '',
      type: 'info',
    };
  },
};
