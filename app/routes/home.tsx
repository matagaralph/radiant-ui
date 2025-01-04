import Button from '@/components/button';
import { BiBook } from 'react-icons/bi';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Radiant' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <main className='max-w-7xl mx-auto px-4 pt-8'>
      <div className='flex items-center space-x-2'>
        <Button variant='outline' left={<BiBook />}>
          Submit
        </Button>
        <Button left={<BiBook />}>Primary</Button>
      </div>
    </main>
  );
}
