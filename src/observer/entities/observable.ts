import { ISubscriber } from './subscriber';

export interface IObservable<TState> {
  notify(data: TState): void;
  subscribe(subscriber: ISubscriber<TState>): void;
  unsubscribe(subscriber: ISubscriber<TState>): void;
}

export class Observable<TState> implements IObservable<TState> {
  private listeners: ISubscriber<TState>[];

  constructor() {
    this.listeners = [];
  }

  notify(data: TState): void {
    this.listeners.forEach((listener) => {
      listener(data);
    });
  }

  subscribe(subscriber: ISubscriber<TState>): void {
    this.listeners.push(subscriber);
  }

  unsubscribe(subscriber: ISubscriber<TState>): void {
    this.listeners = this.listeners.filter((listener) => {
      return listener !== subscriber;
    });
  }
}
