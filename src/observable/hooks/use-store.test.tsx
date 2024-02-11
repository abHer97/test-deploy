import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { createObservableStore } from '../implementations/observable-store';
import { useStore } from './use-store';

interface Store {
  name: string;
  setName(name: string): void;
}

describe('useStore test suite', async () => {
  test('should not throw an error when gets executed', () => {
    const store = createObservableStore('');

    expect(() => renderHook(() => useStore(store))).not.toThrowError();
  });

  test('should correctly subscribe to state changes', async () => {
    const store = createObservableStore<Store>((set) => {
      return {
        name: '',
        setName(name: string) {
          set({ name });
        },
      };
    });
    const { result } = renderHook(() => useStore(store));

    await act(() => {
      result.current.setName('foo');
    });

    expect(result.current.name).toBe('foo');
  });
});
