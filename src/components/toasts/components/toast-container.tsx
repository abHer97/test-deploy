import { useCallback, useEffect, useState } from 'react';

import { ToastState } from '../state/toast-state';
import { ISubscriber } from '../../../observer/entities/subscriber';
import { IToast } from '../entities/toast';

export function ToastContainer() {
  const [toasts, setToasts] = useState<IToast[]>([]);

  useEffect(() => {
    const toastStateSubscriptor: ISubscriber<IToast> = (toast) => {
      setToasts((toasts) => toasts.concat(toast));
    };

    ToastState.subscribe(toastStateSubscriptor);

    return () => {
      ToastState.unsubscribe(toastStateSubscriptor);
    };
  }, []);

  useEffect(() => {
    console.log({ toasts });
  }, [toasts]);

  const handleExpiredToast = useCallback((toastId: string) => {
    setToasts((toasts) => {
      return toasts.filter((t) => t.id !== toastId);
    });
  }, []);

  return (
    <section aria-label='notifications'>
      {toasts.map((toast) => {
        return <Toast key={toast.id} data={toast} onExpired={handleExpiredToast} />;
      })}
    </section>
  );
}

function Toast({ data: toast, onExpired }: { data: IToast; onExpired(toastId: string): void }) {
  useEffect(() => {
    const timerId = setTimeout(() => {
      onExpired(toast.id);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [onExpired, toast]);

  return (
    <article>
      <h2>{toast.id}</h2>
    </article>
  );
}
