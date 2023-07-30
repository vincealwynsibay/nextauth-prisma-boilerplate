import { FC } from 'react';
import Post from '@/components/Post';
import PostFeed from '@/components/PostFeed';
import { db } from '@/lib/db';
import { Post as PostSchema } from '@prisma/client';
import Sort from '@/components/Sort';
import { ChevronDown } from 'lucide-react';
import PaginationControls from '@/components/PaginationControls';

interface pageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page: FC<pageProps> = async ({ searchParams }) => {
  // const posts = await db.post.findMany({});
  const { sort, page, per_page } = searchParams;

  const [column, order] =
    ((sort as string)?.split('.') as [keyof PostSchema, 'asc' | 'desc']) ?? [];

  const pageNumber = page ?? 1;
  const itemPerPage = per_page ?? 1;
  const start = (Number(pageNumber) - 1) * Number(itemPerPage);
  const end = start + Number(itemPerPage);
  // const pages =

  const posts = await db.post.findMany({
    orderBy: [
      // checks if column and order exists, then use column and order to sort
      column &&
        order && {
          [column]: order,
        },
    ],
    // skip: start,
    // take: Number(itemPerPage),
  });
  const pageCount = Math.ceil(posts.length / Number(per_page));

  const entries = posts.slice(start, end);

  return (
    <div className='pt-12'>
      <h1 className='text-5xl font-bold'>Posts</h1>

      <div className='pt-6 '>
        <Sort />
      </div>
      <PostFeed posts={entries} />
      <PaginationControls
        hasPrevious={start > 0}
        hasNext={end < posts.length}
        hasPreviousFive={start > 5}
        hasNextFive={end + 5 < posts.length}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Page;
