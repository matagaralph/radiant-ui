import Button from './components/Button';
import { BiBaguette } from 'react-icons/bi';

function App() {
  return (
    <>
      <nav className='h-14 border-b border-slate-900/20 dark:border-b-white/10'></nav>
      <main className='mx-auto mt-8 max-w-7xl px-4'>
        <Button left={<BiBaguette />}>Button</Button>
      </main>
    </>
  );
}

export default App;
