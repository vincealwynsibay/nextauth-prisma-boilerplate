'use client';

import React from 'react';
import Link from 'next/link';
import { Post } from '@prisma/client';

type Props = {
  post: Post;
};

const Post = ({ post }: Props) => {
  return (
    <div className='my-6 border border-zinc-300 rounded-md' key={post.id}>
      <div className='px-6 py-4 relative flex flex-col gap-4'>
        <Link href={`/posts/${post.id}`}>
          <h2 className='text-lg font-bold'>{post.title}</h2>
        </Link>

        <p className='max-h-60 text-sm  w-full overflow-clip '>
          {post.content.substring(0, 200)}...
        </p>
      </div>
    </div>
  );
};

export default Post;
