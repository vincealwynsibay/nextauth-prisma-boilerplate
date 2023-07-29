import CreatePost from '@/components/CreatePost';
import { Post } from '@prisma/client';
import axios from 'axios';
import { FC } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  // const posts = await db.post.findMany({});
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: 'no-store',
  });
  const { posts } = await res.json();

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post: Post) => {
        return (
          <div className='my-6' key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <h2 className='text-4xl font-bold'>{post.title}</h2>
            </Link>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default page;
