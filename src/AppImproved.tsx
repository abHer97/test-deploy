import { useState } from 'react';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { fireToast } from './components/toasts/state/toast-state';
import { ToastFactory } from './components/toasts/factories/toast-factory';
import { ToastContainer } from './components/toasts/components/toast-container';

import './App.css';

function App() {
  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
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
