import Post from '@/components/Post';
import { db } from '@/lib/db';
import { FC } from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import DeletePost from '@/components/DeletePost';
import EditPost from '@/components/EditPost';

interface pageProps {
  params: { postId: string };
}

const page: FC<pageProps> = async ({ params }) => {
  const post = await db.post.findFirst({
    where: {
      id: params.postId,
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <div className=' mx-auto h-full w-full sm:w-[600px] pt-12'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center self-end gap-4'>
            <EditPost post={post} />
            <DeletePost post={post} />
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl capitalize font-bold'>{post.title}</h1>
              <p className='text-muted-foreground'>by {post.author.name}</p>
            </div>
          </div>
        </div>

        {/* <div className='flex flex-col gap-3'>
          <h1 className='text-4xl capitalize font-bold'>{post.title}</h1>
          <div className='flex gap-2 justify-between items-center'>
            <p className='text-muted-foreground'>
              by <span className='font-medium'>{post.author.name}</span>
            </p>
            <div className='flex items-center gap-4'>
              <EditPost post={post} />
              <DeletePost post={post} />
            </div>
          </div>
        </div> */}

        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default page;
