import CreatePost from '@/components/CreatePost';
import { db } from '@/lib/db';
import { Post } from '@prisma/client';
import axios from 'axios';
import { apiBaseUrl } from 'next-auth/client/_utils';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  //   const posts = await db.post.findMany({});
  const {
    data: { posts },
  } = await axios.get('http://localhost:3000/api/posts');
  //   const posts = await fetch('http://localhost:3000/api/posts', {
  //     method: 'GET',
  //   });
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post: Post) => {
        return (
          <div className='my-6'>
            <h2 className='text-4xl font-bold'>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        );
      })}
      <CreatePost />
    </div>
  );
};

export default page;
