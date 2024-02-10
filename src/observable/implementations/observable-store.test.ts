import { Subscriber } from '../entities/subscriptor';
import { createObservableStore } from './observable-store';

describe('createObservableStore test suite', () => {
  test('should return an object with IObservableStore signature', () => {
    const store = createObservableStore([]);

    expect(store).toBeTypeOf('object');
    expect(store.getState).toBeTypeOf('function');
    expect(store.setState).toBeTypeOf('function');
    expect(store.subscribe).toBeTypeOf('function');
    expect(store.unsubscribe).toBeTypeOf('function');
  });

  describe('getState', () => {
    test('should not thrown an error when function is executed', () => {
      const initialState = {
        name: 'foo',
        lastname: 'bar',
      };

      expect(() => createObservableStore(initialState)).not.toThrow();
    });

    test('should return the given initial state when function is executed', () => {
      const initialState = {
        name: 'foo',
        lastname: 'bar',
      };
      const store = createObservableStore(initialState);

      const state = store.getState();

      expect(state).toEqual(initialState);
    });
  });

  describe('setState', () => {
    test('should update the initial state when is executed', () => {
      const initialState = {
        name: 'foo',
        lastname: 'bar',
      };
      const updatedState = {
        name: 'jhon',
        lastname: 'doe',
      };
      const store = createObservableStore(initialState);

      store.setState(updatedState);
      const state = store.getState();

      expect(state).toEqual(updatedState);
    });

    test('should notify all subscribers when is executed', () => {
      const initialState = {
        name: 'foo',
        lastname: 'bar',
      };
      const updatedState = {
        name: 'jhon',
        lastname: 'doe',
      };
      const subscriberSample: Subscriber<typeof initialState> = vi.fn();
      const store = createObservableStore(initialState);

      store.subscribe(subscriberSample);
      store.setState(updatedState);

      expect(subscriberSample).toHaveBeenCalled();
    });
  });

  describe('unsubscribe', () => {
    test('should remove the subscriber when a valid subscriptor is provided', () => {
      const initialState = {
        name: 'foo',
        lastname: 'bar',
      };
      const subscriber: Subscriber<typeof initialState> = vi.fn();
      const store = createObservableStore(initialState);

      store.subscribe(subscriber);
      store.setState({ ...initialState, lastname: 'buz' });
      expect(subscriber).toHaveBeenCalledTimes(1);

      store.unsubscribe(subscriber);
      store.setState({ ...initialState, name: 'john' });
      expect(subscriber).toHaveBeenCalledTimes(1);
    });
  });

  describe('create store with state creator as initialState', () => {
    test('should not to throw an error', () => {
      const stateCreator = () => {
        return {
          name: 'foo',
          lastname: 'bar',
        };
      };

      expect(() => createObservableStore(stateCreator)).not.toThrowError();
    });

    test('should create an state capable of mutate state with no need to call store.setState', () => {
      interface IState {
        name: string;
        lastname: string;
        setName(name: string): void;
      }
      const store = createObservableStore<IState>((set) => {
        return {
          name: 'foo',
          lastname: 'bar',
          setName(name) {
            set({ name });
          },
        };
      });

      const state = store.getState();
      state.setName('john');
      // eslint-disable-next-line
      const { setName, ...updatedState } = store.getState();

      expect(updatedState).toEqual({
        name: 'john',
        lastname: 'bar',
      });
    });
  });
});
