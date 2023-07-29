import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(3, { message: 'Title must be 3 characters long.' }),
  content: z.string(),
});

export const postDeleteSchema = z.object({
  postId: z.string(),
});

export const postEditSchema = z.object({
  postId: z.string(),
  title: z.string().min(3, { message: 'Title must be 3 characters long.' }),
  content: z.string(),
});

export type postPayload = z.infer<typeof postSchema>;
export type postEditPayload = z.infer<typeof postEditSchema>;
export type postDeletePayload = z.infer<typeof postDeleteSchema>;
