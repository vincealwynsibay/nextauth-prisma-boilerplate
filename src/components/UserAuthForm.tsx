'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Input } from './ui/Input';
import { Separator } from '@/components/ui/Separator';
import { Button } from './ui/Button';
import { Icons } from './Icons';
import { Github, GithubIcon } from 'lucide-react';

type Props = {};

const UserAuthForm = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<string>('');

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      signIn('google');
    } catch (error) {
      // do something here
    } finally {
      setIsLoading(false);
    }
  };
  const signInWithGithub = async () => {
    setIsLoading(true);
    try {
      signIn('github');
    } catch (error) {
      // do something here
    } finally {
      setIsLoading(false);
    }
  };
  const signInWithEmail = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('test');
    setIsLoading(true);
    try {
      const signInResult = await signIn('email', {
        email: data.toLowerCase(),
        redirect: false,
        callbackUrl:
          'http://localhost:3000/api/auth/verify-request?provider=email&type=email',
      });
      console.log(signInResult);
    } catch (error) {
      // do something here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='grid gap-3'>
      <div className='flex flex-col gap-2'>
        <Input
          value={data}
          type='email'
          placeholder='name@example.com'
          autoComplete='email'
          onChange={(e) => setData(e.target.value)}
        />
        <Button
          size={'sm'}
          className='block'
          type='submit'
          onClick={signInWithEmail}
        >
          Sign In with Email
        </Button>
      </div>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t'></div>
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <div className='bg-background text-muted-foreground'>
            Or Continue With
          </div>
        </div>
      </div>
      <Button
        variant={'outline'}
        onClick={signInWithGoogle}
        className='flex items-center gap-2'
      >
        <Icons.google className='w-4 h-4' />
        Sign In with Google
      </Button>
      <Button
        variant={'outline'}
        onClick={signInWithGithub}
        className='flex items-center gap-2'
      >
        <Icons.github className='w-4 h-4' />
        Sign In with Github
      </Button>
    </div>
  );
};

export default UserAuthForm;
