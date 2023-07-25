import UserAuthForm from '@/components/UserAuthForm';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <UserAuthForm />
    </div>
  );
};

export default page;
