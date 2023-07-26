import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { Post } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const posts: Post[] = await db.post.findMany({});
    return NextResponse.json({ posts });
  } catch (error) {}
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const post: Post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        userId: session.user.id,
      },
    });

    return new Response(post.id);
  } catch (error) {}
}
