'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { PostWithAuthor } from '@/types/prisma';
import DeletePost from './DeletePost';
import EditPost from './EditPost';

type Props = {
  post: PostWithAuthor;
};

const Post = ({ post }: Props) => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-4xl capitalize font-bold'>{post.title}</h1>
          <p className='text-muted-foreground'>by {post.author.name}</p>
        </div>
        <div className='flex items-center gap-4'>
          {/* <EditPost /> */}
          {/* <DeletePost post={post} /> */}
        </div>
      </div>

      <p>{post.content}</p>
    </div>
  );
};

export default Post;
