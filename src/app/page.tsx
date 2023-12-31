import SignOut from '@/components/SignOut';
import { getAuthSession } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';

export default async function Home() {
  const session = await getAuthSession();

  return (
    <div className='pt-12'>
      {session?.user ? (
        <div>
          <h1>{session.user.name}</h1>
          <Image src={session.user.image!} alt='' width={100} height={100} />
          <Link href='/posts'>Posts</Link>
          <SignOut />
        </div>
      ) : (
        <>
          <p>Not Logged In.</p>
          <Link href='/sign-in'>Sign In</Link>
        </>
      )}
    </div>
  );
}
