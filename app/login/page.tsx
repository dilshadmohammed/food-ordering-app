"use client";
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link';
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'



function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginInProgress,setLoginInProgress] = useState<boolean>(false);
    const [error,setError] = useState<boolean>(false);
    const [errMsg,setErrMsg] = useState<string>('');

    async function handleFormSubmit(e: FormEvent) {
        e.preventDefault();
        setError(false)
        setErrMsg('');
        setLoginInProgress(true)
        
        signIn("credentials", { email, password,callbackUrl:'/',redirect:false})
  .then((response) => {

    if (response && response.ok) {
        router.push('/')
    } else if (response && response.error) {
        setError(true)
      setErrMsg("Invalid credentials")
    } else {
        setError(true)
      setErrMsg("Something went wrong.")
    }
  })
  .catch((error) => {
    setError(true)
      setErrMsg("Something went wrong.")
  })
  .finally(() => {
    setLoginInProgress(false);
  });
      

        }
    

    return (
        <section className='mt-8'>
            <h1 className="text-center text-primary text-4xl font-semibold">
                Login
            </h1>
            {error && (
                <div className="my-4 text-center text-red-400" >
                {errMsg!=='' ? errMsg : 'An error occured.'} <br /> 
                Please try again.
            </div>
            )}
            <form className='block max-w-xs mx-auto mt-10' onSubmit={handleFormSubmit}>
                <input type="email" disabled={loginInProgress} placeholder='email' value={email}
                    onChange={e => setEmail(e.target.value)} />
                <input type="password" disabled={loginInProgress} placeholder='password' value={password}
                    onChange={e => setPassword(e.target.value)} />
                <button type='submit' disabled={loginInProgress}>Login</button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button type="button" onClick={() => signIn('google',{callbackUrl:'/'})} className='flex gap-4 justify-center'>
                    <Image src={'/google.png'} alt={''} width={24} height={24} />
                    Login with google
                </button>
                <div className="text-center text-gray-500 my-4 border-t pt-2">
                    Don't have an account?&nbsp;<Link className='underline text-gray-700' href={'/register'}>Register here&raquo;</Link>
                </div>
            </form>
        </section>
    )
}

export default LoginPage

function toast(arg0: string, arg1: { type: string; }) {
    throw new Error('Function not implemented.');
}
