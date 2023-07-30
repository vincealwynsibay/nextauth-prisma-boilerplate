'use client';

import React, { startTransition } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/DropdownMenu';
import { Separator } from './ui/Separator';
import { sortOptions } from '@/config/posts';
import { Button } from './ui/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

type Props = {};

const Sort = ({}: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='flex items-center gap-2' variant='outline' size='sm'>
          Sort <ChevronDown className='w-4 h-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <Separator />
        {sortOptions &&
          sortOptions.map((option) => {
            return (
              <DropdownMenuItem
                onClick={() =>
                  startTransition(() =>
                    router.push(
                      `${pathName}?${createQueryString({
                        sort: option.value,
                      })}`
                    )
                  )
                }
              >
                {option.label}
              </DropdownMenuItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Sort;
