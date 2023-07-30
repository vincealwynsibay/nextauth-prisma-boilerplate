'use client';

import React, { useMemo } from 'react';
import { Button } from './ui/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

type Props = {
  hasPrevious: boolean;
  hasNext: boolean;
  hasPreviousFive: boolean;
  hasNextFive: boolean;
  pageCount: number;
};

const PaginationControls = ({
  hasPrevious,
  hasNext,
  hasPreviousFive,
  hasNextFive,
  pageCount,
}: Props) => {
  const searchParams = useSearchParams();

  let page = searchParams.get('page') ?? 1;
  let per_page = searchParams.get('per_page') ?? 1;

  const router = useRouter();
  const pathName = usePathname();

  const paginationRange = useMemo(() => {
    const range = [];
    let delta = 1;

    for (
      let i = Math.max(2, Number(page) - delta);
      i <= Math.min(pageCount - 1, Number(page) + delta);
      i++
    ) {
      range.push(i);
    }

    if (Number(page) - delta > 2) {
      range.unshift('...');
    }

    if (Number(page) + delta < pageCount) {
      range.push('...');
    }

    range.unshift(1);

    if (pageCount !== 1) {
      range.push(pageCount);
    }

    return range;
  }, [page, per_page]);

  const onChangePage = (value: number) => {
    router.push(
      `${pathName}?page=${Number(page) + value}&per_page=${per_page}`
    );
  };

  return (
    <div className='w-full '>
      <div className='flex items-center justify-center gap-2'>
        <Button
          className='h-8 w-8'
          onClick={() => onChangePage(-5)}
          variant={'outline'}
          size={'icon'}
          disabled={!hasPreviousFive}
        >
          <ChevronsLeft className='h-4 w-4' />
        </Button>

        <Button
          className='h-8 w-8'
          onClick={() => onChangePage(-1)}
          variant={'outline'}
          size={'icon'}
          disabled={!hasPrevious}
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>

        <div className='flex items-center gap-2'>
          {paginationRange.map((value, i) => {
            if (value === '...') {
              return (
                <Button
                  className='h-8 w-8'
                  variant={'outline'}
                  size={'icon'}
                  key={i}
                  disabled
                >
                  ...
                </Button>
              );
            } else {
              return (
                <Button
                  className='h-8 w-8'
                  variant={value === Number(page) ? 'default' : 'outline'}
                  size={'icon'}
                  key={i}
                  onClick={() =>
                    router.push(
                      pathName + `?page=${value}&per_page=${per_page}`
                    )
                  }
                >
                  {value}
                </Button>
              );
            }
          })}
        </div>

        <Button
          className='h-8 w-8'
          onClick={() => onChangePage(1)}
          variant={'outline'}
          size={'icon'}
          disabled={!hasNext}
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
        <Button
          className='h-8 w-8'
          onClick={() => onChangePage(5)}
          variant={'outline'}
          size={'icon'}
          disabled={!hasNextFive}
        >
          <ChevronsRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
