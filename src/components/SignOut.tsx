'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

type Props = {};

const SignOut = (props: Props) => {
  return <button onClick={() => signOut()}>Sign Out</button>;
};

export default SignOut;
