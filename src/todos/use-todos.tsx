import { useSyncExternalStore } from 'react';
import { ITodo, todosStore } from './todo-store';

export function useTodos() {
  const store = useSyncExternalStore(todosStore.subscribe, todosStore.getState);

  return {
    todos: store.todos,
    addTodo(todo: ITodo) {
      todosStore.setState({ todos: store.todos.concat(todo) });
    },
  };
}
