import { Subscriber } from './subscriptor';

export interface IObservableStore<TState> {
  getState(): TState;
  setState(newState: TState): void;
  subscribe(subscriber: Subscriber<TState>): void;
  unsubscribe(subscriber: Subscriber<TState>): void;
}
