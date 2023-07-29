'use client';
import React from 'react';
import { Button } from './ui/Button';

import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
import { Post } from '@prisma/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/AlertDialog';

type Props = {
  post: Post;
};

const DeletePost = ({ post }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const deletePost = async () => {
    const res = await fetch('/api/posts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId: post.id! }),
    });

    if (res.ok) {
      toast({
        title: 'Successfully deleted post.',
        description: 'Your post has been deleted',
      });
      router.push('/posts');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='' onClick={deletePost}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePost;
