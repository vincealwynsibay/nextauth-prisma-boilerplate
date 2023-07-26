'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

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
    <div>
      <div className=''>
        <p>email</p>
        <input
          value={data}
          type='email'
          placeholder='name@example.com'
          autoComplete='email'
          onChange={(e) => setData(e.target.value)}
        />
        <button type='submit' onClick={signInWithEmail}>
          Login
        </button>
      </div>
      <button onClick={signInWithGoogle}>Google</button>
      <button onClick={signInWithGithub}>Github</button>
    </div>
  );
};

export default UserAuthForm;
