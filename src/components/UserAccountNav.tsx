'use client';

import { User } from 'next-auth';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/DropdownMenu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

type Props = {
  user: Pick<User, 'email' | 'image' | 'name'>;
};

const UserAccountNav = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.image || undefined} />
          <AvatarFallback>
            {user.name?.split(' ').map((n) => n.charAt(0))}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className='flex flex-col space-y-1 leading-none p-2'>
          {user.name && <p className='font-medium'>{user.name}</p>}
          {user.name && (
            <p className='truncate text-sm text-muted-foreground'>
              {user.email}
            </p>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/profile'>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/create-post'>Create Post</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={(e) => {
            e.preventDefault();
            signOut({ callbackUrl: `${window.location.origin}/sign-in` });
          }}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
