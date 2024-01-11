'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import {redirect} from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react';

function page() {
    const { data: session, status, update } = useSession()
    const [userName,setUserName] = useState("")
    const [saved,setSaved] = useState(false);
    const [isSaving,setIsSaving] = useState(false);

    useEffect(() => {
        if(status === 'authenticated') {
            setUserName(session?.user?.name || '')
        }
    },[session,status])
    

    async function handleProfileInfo(e:FormEvent) {
        e.preventDefault()
        setIsSaving(true)
        setSaved(false)
        const response = await fetch('/api/profile',{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({name:userName as string})
        })
        setIsSaving(false)
        if(response.ok)
        {
            update({name:userName})
            setSaved(true)
        }
    }
    
    if(status === 'loading'){
        return (
            <h1 className='text-primary m-8 text-center text-4xl'>Loading...</h1>
        )
    }
    if(status === 'unauthenticated')
    {
        return redirect('/login')
    }

    const userImage = session?.user?.image;

  return (
    <section className='mt-8'>
        <h1 className='text-center text-primary font-semibold text-4xl mb-4'>
            Profile
        </h1>
        <div className='max-w-md mx-auto'>
              {saved && (

                  <h2 className='text-center bg-green-100 rounded-lg p-4 border border-green-300'>
                      Profile saved!
                  </h2>
              )}
              {isSaving && (

                <h2 className='text-center bg-orange-300 rounded-lg p-4 border border-orange-300'>
                    Saving...
                </h2>
            )}
            <div className='flex gap-4 items-center'>
                <div>
                    <div className='p-2 rounded-lg relative'>
                        <Image className='rounded-lg w-full h-full mb-1' src={userImage || ' '} alt='avatar' width={250} height={250} />
                        <button type='button'>Edit</button>
                    </div>
                </div>      
                <form className='grow' onSubmit={handleProfileInfo}>
                    <input type="text" placeholder="First and last name" 
                    value={userName} onChange={e => setUserName(e.target.value)}/>
                    <input type="text" value={session?.user?.email || ' '} disabled={true} />
                    <button type='submit'>Save</button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default page