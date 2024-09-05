import { Spinner } from '@nextui-org/react';

export default function Loading() {
  return (
    <div className='w-full h-[90vh] flex items-center justify-center'>
      <Spinner
        className='text-[#1B2639]'
        label='Loading...'
        color='default'
        labelColor='foreground'
        size='lg'
      />
    </div>
  );
}
