import { BsPlusCircle } from 'react-icons/bs';
import Button from './components/Button';
import { useTheme } from './ThemeProvider';

function App() {
  const { setTheme } = useTheme();
  return (
    <>
      <nav className='h-14 border-b border-slate-900/20 dark:border-white/10'></nav>
      <main className='mx-auto mt-8 max-w-7xl px-4'>
        <div className='flex items-center gap-3'>
          <Button size='sm' onClick={() => setTheme('light')} rightSlot={<BsPlusCircle />}>
            Primary
          </Button>
          <Button size='md' onClick={() => setTheme('dark')} rightSlot={<BsPlusCircle />}>
            Primary
          </Button>
          <Button size='lg' rightSlot={<BsPlusCircle />}>
            Primary
          </Button>
        </div>
      </main>
    </>
  );
}

export default App;
