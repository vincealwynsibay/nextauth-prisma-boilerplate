import UserAuthForm from '@/components/UserAuthForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { FC } from 'react';

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  return (
    <div
      className='min-h-screen container grid flex-col 
    items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'
    >
      <div className='hidden h-full bg-muted lg:block'></div>
      <div className='lg:p-8'>
        <div className='mx-auto w-full flex flex-col gap-2 justify-center space-y-6 sm:w-[400px]'>
          <div className='text-center '>
            <h2 className='text-2xl font-semibold leading-none tracking-tight'>
              Create an Account
            </h2>
            <p className='text-sm text-muted-foreground'>
              Enter your email below to create an account
            </p>
          </div>

          <div className='px-6 '>
            <UserAuthForm />
          </div>

          <p className='text-sm max-w-xs mx-auto'>
            By clicking continue, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
