import { getAuthSession } from '@/lib/auth';
import Link from 'next/link';
import React from 'react';
import UserAccountNav from './UserAccountNav';
import { buttonVariants } from './ui/Button';

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();

  return (
    <nav className='fixed top-0 inset-x-0 bg-gray-50 h-fit border-b  border-zinc-300 py-2'>
      <div className='container max-w-7xl flex justify-between items-center'>
        <div className='flex justify-center items-center gap-8'>
          <Link href='/'>
            <p className='text-base font-bold'>NextAuth</p>
          </Link>

          <div className='hidden font-medium text-sm sm:flex sm:gap-4 sm:items-center'>
            <Link href='/posts'>Posts</Link>
            <Link href='/create-post'>Create Post</Link>
          </div>
        </div>

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <div className='flex gap-2'>
            <Link
              href='/sign-in'
              className={buttonVariants({ variant: 'default', size: 'sm' })}
            >
              Sign In
            </Link>
            <Link
              href='/sign-up'
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
