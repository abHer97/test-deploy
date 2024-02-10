import { IObservableStore } from '../entities/observable-store';
import { Subscriber } from '../entities/subscriptor';

export function createObservableStore<TState>(initialState: TState): IObservableStore<TState> {
  let state = initialState;
  const subscribers = new Set<Subscriber<TState>>();

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
