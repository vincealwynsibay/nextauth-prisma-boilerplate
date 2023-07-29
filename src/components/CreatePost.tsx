'use client';

import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Textarea } from './ui/TextArea';
import { Button } from './ui/Button';
import { postPayload, postSchema } from '@/lib/validators/Post';
import { useToast } from './ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Label } from './ui/Label';

type Props = {};

const CreatePost = (props: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm<postPayload>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: postPayload) => {
    const postObject: postPayload = {
      title: values.title,
      content: values.content,
    };

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postObject),
    });

    if (!res?.ok) {
      toast({
        title: 'Your post was not created.',
        content: 'Something went wrong while creating your post',
        variant: 'destructive',
      });
    } else {
      resetField('title');
      resetField('content');
      router.refresh();
      router.push('/posts');
    }

    return;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 '>
        <div>
          <Label>Title</Label>
          <Input {...register('title')} />
          {errors?.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <Label>Content</Label>
          <Textarea {...register('content')} rows={20} />
          {errors?.content && <p>{errors.content.message}</p>}
        </div>

        <Button type='submit'>Create Post</Button>
      </form>
    </div>
  );
};

export default CreatePost;
