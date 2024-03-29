import { IObservableStore } from '../entities/observable-store';
import { Setter } from '../entities/setter';
import { Subscriber } from '../entities/subscriptor';

function isFunction(val: unknown): val is CallableFunction {
  return typeof val === 'function';
}

export function createObservableStore<TState>(
  initialState: TState | ((setter: Setter<TState>) => TState)
): IObservableStore<TState> {
  let state: TState;
  const subscribers = new Set<Subscriber<TState>>();

  function setter(nextState: Partial<TState>) {
    const updatedState = Object.assign({}, state, nextState);

    state = updatedState;

    subscribers.forEach((listener) => listener(state));
  }

  state = isFunction(initialState) ? initialState(setter) : initialState;

  return {
    getState() {
      return state;
    },
    setState(newState) {
      state = newState;

      subscribers.forEach((listener) => listener(state));
    },
    subscribe(subscriber) {
      subscribers.add(subscriber);
    },
    unsubscribe(subscriber) {
      subscribers.delete(subscriber);
    },
  };
}
