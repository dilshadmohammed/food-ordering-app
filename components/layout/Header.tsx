'use client';
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Loading from './Loading';

function Header() {
  const session = useSession();
  const status = session.status;
  function extractNameFromEmail(email: string): string | null {
    const [name] = email.split('@');
    return name || null;
  }

  const userData = session?.data?.user;
  const userName = userData?.name?.split(' ')[0] || extractNameFromEmail(userData?.email ?? '');
  

  return (
    <header className='flex items-center justify-between'>
      <nav className='flex gap-8 items-center text-gray-500 font-semibold'>
        <Link className='text-primary font-semibold text-2xl' href="/">
          ST PIZZA
        </Link>
        <Link href={"/"}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
      </nav>
      {status == 'loading' && ( <Loading/> )}
      <nav className="flex gap-4 items-center text-gray-500 font-semibold">
        {status === 'authenticated' && (
          <>
          <Link href={'/profile'} className='whitespace-nowrap'>Hello, {userName}</Link>
          <button onClick={() => signOut()} className='bg-primary text-white rounded-full px-8 py-2'>
            Logout
          </button>
          </>
        )}
        {status === 'unauthenticated' && (
          <>
            <Link href={'/login'}>
              Login
            </Link>
            <Link href={'/register'} className='bg-primary text-white rounded-full px-8 py-2'>
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header