import CreatePost from '@/components/CreatePost';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {};

const Page = async (props: Props) => {
  const session = await getAuthSession();

  if (!session) {
    return redirect('/');
  }

  return (
    <div>
      <CreatePost />
    </div>
  );
};

export default Page;
