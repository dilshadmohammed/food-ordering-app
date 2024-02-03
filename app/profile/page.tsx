'use client'
import Loading from '@/components/layout/Loading';
import UserTabs from '@/components/layout/UserTabs';
import { useProfile } from '@/components/useProfile';
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function ProfilePage() {
    const {loading,data} = useProfile()
    const { data: session, status, update } = useSession()
    const [userName, setUserName] = useState("")
    const [phone, setPhone] = useState("")
    const [streetAddress, setStreetAddress] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [isAdmin, setIsAdmin] = useState(false);
    const [image,setImage] = useState<File | null>(null)


    useEffect(()=>{
        setUserName(session?.user?.name || '')
        setPhone(data.phone)
        setStreetAddress(data.streetAddress)
        setPostalCode(data.postalCode)
        setCity(data.city)
        setCountry(data.country)
        setIsAdmin(data.isAdmin)
    },[session,loading])


    async function handleProfileInfo(e: FormEvent) {
        e.preventDefault()
        await handleImageUpload()
        await toast.promise(new Promise<void>(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: userName as string,
                    streetAddress: streetAddress,
                    phone: phone,
                    postalCode: postalCode,
                    city: city,
                    country: country
                })
            })
            if (response.ok) {
                update({ name: userName,
                    streetAddress,
                    phone,
                    postalCode,
                    city,
                    country })
                resolve()
            }
            else {
                reject()
            }
        }), {
            loading: 'Saving',
            success: 'Profile saved!',
            error: 'Error'
        })

    }

    async function handleImageUpload() {
        await toast.promise(new Promise<void>((resolve, reject) => {

            if (image) {
                const data = new FormData();
                data.set('file', image);
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
            , {
                loading: 'Uploading...',
                success: 'Upload completed!',
                error: 'Error in uploading!'
            })


    }
    
    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
    
        if (files && files.length > 0) {
          const file = files[0];
          setImage(file);
        }
      }

    if (status === 'unauthenticated') {
        return redirect('/login')
    }
    if (status === 'loading' || loading) {
        return (
            <Loading/>
        )
    }


    const userImage = session?.user?.image;

    return (
        <section className='mt-8'>
            <UserTabs isAdmin={isAdmin} />
            <div className='max-w-md mx-auto'>
                <div className='flex gap-4'>
                    <div>
                        <div className='p-2 rounded-lg relative max-w-[120px] max-h-[120px'>
                            <Image className='rounded-lg w-full h-full mb-1' src={(image && URL.createObjectURL(image)) || userImage || '/default-avatar.png'} alt='avatar' width={250} height={250} />
                            <label>
                                <input type="file" className='hidden' onChange={handleImageChange} />
                                <span className='block border border-gray-300 cursor-pointer rounded-lg p-2 text-center'>Edit</span>
                            </label>
                        </div>
                    </div>
                    <form className='grow' onSubmit={handleProfileInfo}>
                        <div>
                            <label>Full name</label>
                            <input type="text" placeholder="First and last name"
                                value={userName} onChange={e => setUserName(e.target.value)} />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="text" value={session?.user?.email || ' '} disabled={true} />
                        </div>
                        <div>
                            <label>Phone No</label>
                            <input type="tel" placeholder='Phone number'
                                value={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                        <div>
                            <label>Street</label>
                            <input type="text" placeholder='Street'
                                value={streetAddress} onChange={e => setStreetAddress(e.target.value)} />
                        </div>
                        <div className="flex gap-4">
                            <div>
                            <label>Postal Code</label>
                            <input type="text" placeholder='Postal code'
                                value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                            </div>
                            <div>
                            <label>City</label>
                            <input type="text" placeholder='City'
                                value={city} onChange={e => setCity(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label>Country</label>
                            <input type="text" placeholder='Country'
                                value={country} onChange={e => setCountry(e.target.value)} />
                        </div>
                        <button type='submit'>Save</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ProfilePage