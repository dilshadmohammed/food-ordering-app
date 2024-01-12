'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import {redirect} from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function page() {
    const { data: session, status, update } = useSession()
    const [userName,setUserName] = useState("")
    const [phone,setPhone] = useState("")
    const [street,setStreet] = useState("")
    const [postalCode,setPostalCode] = useState("")
    const [city,setCity] = useState("")
    const [country,setCountry] = useState("")

    useEffect(() => {
        if(status === 'authenticated') {
            setUserName(session?.user?.name || '')
        }
    },[session,status])
    

    async function handleProfileInfo(e:FormEvent) {
        e.preventDefault()
        await toast.promise(new Promise<void>(async (resolve,reject)=>{
            const response = await fetch('/api/profile',{
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({name:userName as string})
            })
            if(response.ok)
            {
                update({name:userName})
                resolve()
            }
            else{
                reject()
            }
        }),{
            loading:'Saving',
            success:'Profile saved!',
            error:'Error'
        })
        
    }

    async function handleImageChange(e:ChangeEvent<HTMLInputElement>) {
        await toast.promise(new Promise<void>((resolve, reject) => {
            const files = e.target.files;
        
            if (files?.length === 1) {
                const data = new FormData();
                data.set('file', files[0]);
                data.set('username', userName);
        
                fetch('/api/upload', {
                    method: 'POST',
                    body: data
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to upload file');
                    }
                })
                .then(responseData => {
                    update({ image: responseData.imageurl });
                    resolve();
                })
                .catch(error => {
                    console.error(error);
                    reject();
                });
            }
        })
        ,{
            loading:'Uploading...',
            success:'Upload completed!',
            error:'Error in uploading!'
        })
        

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
            <div className='flex gap-4'>
                <div>
                    <div className='p-2 rounded-lg relative max-w-[120px] max-h-[120px'>
                        <Image className='rounded-lg w-full h-full mb-1' src={userImage || '/default-avatar.png'} alt='avatar' width={250} height={250} />
                        <label>   
                            <input type="file" className='hidden' onChange={handleImageChange} />
                            <span className='block border border-gray-300 cursor-pointer rounded-lg p-2 text-center'>Edit</span>
                        </label>
                    </div>
                </div>      
                <form className='grow' onSubmit={handleProfileInfo}>
                    <input type="text" placeholder="First and last name" 
                    value={userName} onChange={e => setUserName(e.target.value)}/>
                    <input type="text" value={session?.user?.email || ' '} disabled={true} />
                    <input type="tel" placeholder='Phone number' 
                        value={phone} onChange={e => setPhone(e.target.value)} />
                    <input type="text" placeholder='Street'
                        value={street} onChange={e => setStreet(e.target.value)} />
                    <div className="flex gap-4">
                        <input type="text" placeholder='Postal code'
                            value={postalCode} onChange={e => setPostalCode(e.target.value)}/>
                        <input type="text" placeholder='City' 
                            value={city} onChange={e => setCity(e.target.value)}/>
                    </div>
                    <input type="text" placeholder='Country' 
                        value={country} onChange={e => setCountry(e.target.value)}/>
                    <button type='submit'>Save</button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default page