import { useCallback, useSyncExternalStore } from 'react';

import { IObservableStore } from '../entities/observable-store';

export function useStore<TState>(store: IObservableStore<TState>) {
  const subscription = useCallback(
    (callback: () => void) => {
      store.subscribe(callback);

      return () => {
        store.unsubscribe(callback);
      };
    },
    [store]
  );

  return useSyncExternalStore(subscription, store.getState);
}
