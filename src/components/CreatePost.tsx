'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type Props = {};

const CreatePost = (props: Props) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const router = useRouter();

  const createPost = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const res = await axios.post('/api/posts', {
      title: title,
      content: content,
    });

    if (res.data) {
      router.refresh();
    }

    return;
  };

  return (
    <div>
      <form>
        <input
          value={title}
          placeholder='title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          cols={20}
          rows={10}
        />
        <button onClick={createPost}>Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
