"use client";
import { signIn } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link';
import { FormEvent, useState } from 'react'




function RegisterPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [creatingUser,setCreatingUser] = useState<boolean>(false);
    const [userCreated,setUserCreated] = useState<boolean>(false);
    const [error,setError] = useState<boolean>(false);
    const [errMsg,setErrMsg] = useState<string>('');
    async function handleFormSubmit(e: FormEvent) {
        e.preventDefault();
        setError(false)
        setErrMsg('');
        setUserCreated(false)
            setCreatingUser(true)
           const response = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            if(response.ok)
                setUserCreated(true)
            else{
                setError(true)
                if(!password.length || password.length < 5)
                    setErrMsg("password must be atleast 5 characters")
            } 
            setCreatingUser(false)


        }
    

    return (
        <section className='mt-8'>
            <h1 className="text-center text-primary text-4xl font-semibold">
                Register
            </h1>
            {userCreated && (
                <div className="my-4 text-center" >
                    Registration completed<br /> 
                    Now you can &nbsp;<Link href={'/login'} className='underline'>Login &raquo;</Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center text-red-400" >
                {errMsg!=='' ? errMsg : 'An error occured.'} <br /> 
                Please try again.
            </div>
            )}
            <form className='block max-w-xs mx-auto mt-10' onSubmit={handleFormSubmit}>
                <input type="email" disabled={creatingUser} placeholder='email' value={email}
                    onChange={e => setEmail(e.target.value)} />
                <input type="password" disabled={creatingUser} placeholder='password' value={password}
                    onChange={e => setPassword(e.target.value)} />
                <button type='submit' disabled={creatingUser}>Register</button>
                <div className="my-4 text-center text-gray-500">
                    or register with provider
                </div>
                <button type='button' onClick={() => signIn('google',{callbackUrl:'/'})} className='flex gap-4 justify-center'>
                    <Image src={'/google.png'} alt={''} width={24} height={24} />
                    Login in with google
                </button>
                <div className="text-center text-gray-500 my-4 border-t pt-2">
                    Existing account?&nbsp;<Link className='underline text-gray-700' href={'/login'}>Login here&raquo;</Link>
                </div>
            </form>
        </section>
    )
}

export default RegisterPage