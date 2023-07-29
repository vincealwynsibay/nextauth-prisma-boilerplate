'use client';

import React from 'react';
import {
  Dialog,
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
  postEditSchema,
  postPayload,
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
  const { register, handleSubmit } = useForm<postEditPayload>({
    resolver: zodResolver(postEditSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = async (values: postPayload) => {
    const postObject: postEditPayload = {
      postId: post.id,
      title: '',
      content: '',
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
        <Button variant='outline'>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Title
            </Label>
            <Input
              {...register('title')}
              id='name'
              value='Pedro Duarte'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Username
            </Label>
            <Textarea
              id='username'
              {...register('content')}
              rows={20}
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSubmit(onSubmit)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
