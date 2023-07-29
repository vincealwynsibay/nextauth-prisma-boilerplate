import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions, getServerSession } from 'next-auth';
import { db } from './db';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import { ServerClient } from 'postmark';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.SMTP_FROM,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const existingUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!existingUser) {
        return token;
      }

      return {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        picture: existingUser.image,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
      }

      return session;
    },
    async redirect() {
      return '/';
    },
  },
};

export const getAuthSession = () => {
  return getServerSession(authOptions);
};
