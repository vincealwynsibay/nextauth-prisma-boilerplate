import { FC } from 'react';
import Post from '@/components/Post';
import PostFeed from '@/components/PostFeed';
import { db } from '@/lib/db';
import { Post as PostSchema } from '@prisma/client';
import Sort from '@/components/Sort';
import { ChevronDown } from 'lucide-react';

interface pageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page: FC<pageProps> = async ({ searchParams }) => {
  // const posts = await db.post.findMany({});
  const { sort } = searchParams;

  const [column, order] =
    ((sort as string)?.split('.') as [keyof PostSchema, 'asc' | 'desc']) ?? [];

  // const res = await fetch('http://localhost:3000/api/posts', {
  //   cache: 'no-store',
  // });
  // const { posts } = await res.json();

  const posts = await db.post.findMany({
    orderBy: [
      // checks if column and order exists, then use column and order to sort
      column &&
        order && {
          [column]: order,
        },
    ],
  });

  return (
    <div className='pt-12'>
      <h1 className='text-5xl font-bold'>Posts</h1>

      <div className='pt-6 '>
        <Sort />
      </div>
      <PostFeed posts={posts} />
    </div>
  );
};

export default Page;
