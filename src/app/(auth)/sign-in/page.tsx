import UserAuthForm from '@/components/UserAuthForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import Link from 'next/link';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className='container min-h-screen pt-[15vh]'>
      <Card className='w-full grid gap-2 m-auto max-w-4 sm:w-[400px]'>
        <CardHeader className='text-center space-y-6'>
          <CardTitle className='pb-0'>Welcome Back</CardTitle>
          <CardDescription className='mt-0'>
            Enter your email to Sign in your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm />
        </CardContent>
      </Card>
      <p className='text-sm max-w-xs text-center mx-auto pt-[5vh]'>
        Don't have an account? <Link href='sign-up'>Sign Up</Link>{' '}
      </p>
    </div>
  );
};

export default page;
