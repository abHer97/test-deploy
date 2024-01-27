import { useSyncExternalStore } from 'react';

function subscribe(callback = () => {}) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);

  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getSnapShot() {
  return navigator.onLine;
}

export function useNetworkState() {
  const isOnline = useSyncExternalStore(subscribe, getSnapShot);

  return isOnline;
}
