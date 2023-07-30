'use client';

import React from 'react';
import Post from './Post';
import { Post as PostSchema } from '@prisma/client';

type Props = {
  posts: Post[];
};

const PostFeed = ({ posts }: Props) => {
  return (
    <>
      {posts.length > 0 ? (
        <div>
          {posts.map((post: PostSchema) => {
            return <Post post={post} key={post.id} />;
          })}
        </div>
      ) : (
        <div className='pt-4'>No posts found...</div>
      )}
    </>
  );
};

export default PostFeed;
