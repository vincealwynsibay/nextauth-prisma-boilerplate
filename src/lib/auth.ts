import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions, getServerSession } from 'next-auth';
import { db } from './db';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    // TODO: Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // TODO: Github
    // TODO: Email
    // TODO: Credentials
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

export const getAuthSession = async () => {
  return await getServerSession();
};
