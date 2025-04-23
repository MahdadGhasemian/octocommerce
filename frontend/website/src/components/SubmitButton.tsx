'use client';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

function Loader({ text }: { readonly text: string }) {
  return (
    <div className='flex items-center space-x-2'>
      <Loader2 className='mr-2 h-6 w-6 animate-spin' />
      <p>{text}</p>
    </div>
  );
}

interface SubmitButtonProps {
  text: string;
  loadingText: string;
  className?: string;
  loading?: boolean;
}

export function SubmitButton({
  text,
  loadingText,
  loading,
  className,
}: Readonly<SubmitButtonProps>) {
  return (
    <button
      type='submit'
      aria-disabled={loading}
      disabled={loading}
      className={cn('btn btn-primary', className)}
    >
      {loading ? <Loader text={loadingText} /> : text}
    </button>
  );
}
