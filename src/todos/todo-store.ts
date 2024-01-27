type Listener<T> = (state: T) => void;

export function createStore<TState>(initialState: TState) {
  let currentState = initialState;
  const listeners = new Set<Listener<TState>>();

  return {
    getState() {
      return currentState;
    },
    setState(newState: TState) {
      currentState = newState;

      listeners.forEach((listener) => {
        listener(currentState);
      });
    },
    subscribe(listener: Listener<TState>) {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },
  };
}

export interface ITodo {
  name: string;
}

export interface ITodosStore {
  todos: ITodo[];
}

export const todosStore = createStore<ITodosStore>({ todos: [] });
