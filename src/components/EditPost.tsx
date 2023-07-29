'use client';

import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/Dialog';
import { Button } from './ui/Button';
import { Post } from '@prisma/client';
import { Label } from '@/components/ui/Label';
import { Input } from './ui/Input';
import {
  postEditPayload,
  postPayload,
  postSchema,
} from '@/lib/validators/Post';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from './ui/TextArea';

type Props = {
  post: Post;
};

const EditPost = ({ post }: Props) => {
  const router = useRouter();
  const { register, handleSubmit, resetField, reset } = useForm<postPayload>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  });

  const onSubmit = async (values: postPayload) => {
    const postObject: postEditPayload = {
      postId: post.id,
      title: values.title,
      content: values.content,
    };

    const res = await fetch('/api/posts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postObject),
    });

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='flex'>
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className='w-full sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Make changes to your post here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form id='edit-post-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-6 py-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='name' className=''>
                Title
              </Label>
              <Input {...register('title')} id='name' className='col-span-3' />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='username' className=''>
                Content
              </Label>
              <Textarea
                id='username'
                {...register('content')}
                rows={10}
                className='col-span-3 block'
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='submit' form='edit-post-form'>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
