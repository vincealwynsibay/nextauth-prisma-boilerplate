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
      // server: {
      //   host: process.env.SMTP_HOST,
      //   port: process.env.SMTP_PORT,
      //   auth: {
      //     user: process.env.SMTP_USER,
      //     pass: process.env.SMTP_PASSWORD,
      //   },
      // },
      server: process.env.EMAIL_SERVER,
      from: process.env.SMTP_FROM,
      // sendVerificationRequest: async ({ identifier, url, provider }) => {
      //   // const result = await postmarkClient.sendEmailWithTemplate({
      //   //   TemplateId: 32587765,
      //   //   To: identifier,
      //   //   From: provider.from,
      //   //   TemplateModel: {
      //   //     action_url: url,
      //   //     product_name: 'test',
      //   //   },
      //   //   Headers: [
      //   //     {
      //   //       // Set this to prevent Gmail from threading emails.
      //   //       // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
      //   //       Name: 'X-Entity-Ref-ID',
      //   //       Value: new Date().getTime() + '',
      //   //     },
      //   //   ],
      //   // });

      //   const result = await postmarkClient.sendEmail({
      //     From: 'sender@example.org',
      //     To: 'sender@example.org',
      //     Subject: 'Hello from Postmark',
      //     HtmlBody: '<strong>Hello</strong> dear Postmark user.',
      //     TextBody: 'Hello from Postmark!',
      //     MessageStream: 'outbound',
      //   });

      //   if (result.ErrorCode) {
      //     throw new Error(result.Message);
      //   }
      // },
    }),

    // TODO: Email
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
