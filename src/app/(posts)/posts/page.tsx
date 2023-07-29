import CreatePost from '@/components/CreatePost';
import { Post as PostSchema } from '@prisma/client';
import axios from 'axios';
import { FC } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import Post from '@/components/Post';

interface pageProps {}

const Page: FC<pageProps> = async ({}) => {
  // const posts = await db.post.findMany({});
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: 'no-store',
  });
  const { posts } = await res.json();

  return (
    <div className='pt-12'>
      <h1 className='text-5xl font-bold'>Posts</h1>

      {posts.length > 0 ? (
        <div>
          {posts.map((post: PostSchema) => {
            return <Post post={post} key={post.id} />;
          })}
        </div>
      ) : (
        <div className='pt-4'>No posts found...</div>
      )}
    </div>
  );
};

export default Page;
