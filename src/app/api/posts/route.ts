import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import {
  postDeleteSchema,
  postEditSchema,
  postSchema,
} from '@/lib/validators/Post';
import { Post } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET(req: Request) {
  try {
    const posts: Post[] = await db.post.findMany({});
    return NextResponse.json({ posts });
  } catch (error) {}
}

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
  } catch (error) {}
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { title, content } = postSchema.parse(body);

    const post: Post = await db.post.create({
      data: {
        title,
        content,
        userId: session.user.id,
      },
    });

    return new Response(post.id);
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response('Post was not created.', { status: 500 });
  }
}

export async function EDIT(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { postId, title, content } = postEditSchema.parse(body);

    const post = await db.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        author: true,
      },
    });

    if (post?.author.id !== session.user.id) {
      return new Response('Not enough access.', { status: 401 });
    }

    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        content,
      },
    });

    return new Response('ok');
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { postId } = postDeleteSchema.parse(body);

    const post = await db.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        author: true,
      },
    });

    if (post?.author.id !== session.user.id) {
      return new Response('Not enough access.', { status: 401 });
    }

    await db.post.delete({
      where: {
        id: postId,
      },
    });

    return new Response('ok');
  } catch (error) {
    console.error(error);
  }
}
