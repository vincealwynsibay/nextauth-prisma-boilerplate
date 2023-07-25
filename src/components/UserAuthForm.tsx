'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

type Props = {};

const UserAuthForm = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return (
    <div>
      <button onClick={signInWithGoogle}>Google</button>
    </div>
  );
};

export default UserAuthForm;
