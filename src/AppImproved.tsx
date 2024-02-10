import { useState } from 'react';

import { fireToast } from './components/toasts/state/toast-state';
import { ToastFactory } from './components/toasts/factories/toast-factory';
import { ToastContainer } from './components/toasts/components/toast-container';
import { useNetworkState } from './hooks/use-network-state';
import { useTodos } from './todos/use-todos';

function App() {
  const isOnline = useNetworkState();
  const todosStore = useTodos();
  function addTodo() {
    todosStore.addTodo({ name: window.crypto.randomUUID() });
  }

  return (
    <>
      {isOnline ? null : <div>network error</div>}

      <Counter />
      <button onClick={addTodo}>add todo</button>
      <ToastContainer />
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((count) => count + 1);
    fireToast(ToastFactory.empty());
  }

  return <button onClick={handleClick}>count is {count}</button>;
}

export default App;
