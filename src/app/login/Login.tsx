'use client';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Icon } from '../../components/Icon';

export default function Login() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen w-full'>
      <Link href='/' className='fixed top-8 right-8'>
        <XMarkIcon className='w-8 h-8 cursor-pointe hover:opacity-80' />
      </Link>
      <h1 className='text-xl font-semibold'>
        Log in to create your free wallets
      </h1>
      <span className='text-neautraltext mt-2'>
        We will generate free wallets on Solana and Polygon for you!
      </span>
      <button
        className='rounded-full px-20 py-3 bg-cta text-black hover:opacity-80 transition mt-8 flex gap-2 items-center'
        onClick={() => signIn('google')}
      >
        <Icon.Google />
        Continue with Google
      </button>
      <button
        className='rounded-full px-20 py-3 bg-cta text-black hover:opacity-80 transition mt-4 flex gap-2 items-center'
        onClick={() => signIn('twitter')}
      >
        <Icon.Twitter />
        Continue with Twitter
      </button>
    </div>
  );
}
