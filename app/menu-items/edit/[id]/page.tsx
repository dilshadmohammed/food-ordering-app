'use client'
import Left from '@/components/icons/Left'
import UserTabs from '@/components/layout/UserTabs'
import { useProfile } from '@/components/useProfile'
import Image from 'next/image'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'

function EditMenuItemsPage() {

    const { loading, data } = useProfile()
    const {id} = useParams();
    const [image, setImage] = useState<File | null>(null);
    const [itemName,setItemName] = useState('');
    const [description,setDescription] = useState('');
    const [basePrice,setBasePrice] = useState('');
    const [imageUrl,setImageUrl] = useState('')
    const router = useRouter()

    useEffect(() => {
        fetch(`/api/menu-items/item/${id}`).then(res => {
            res.json().then(item => {
               
                setItemName(item.name)
                setImageUrl(item.image)
                setDescription(item.description)
                setBasePrice(item.basePrice)
            })
        })
    })

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;

        if (files && files.length > 0) {
            const file = files[0];
            setImage(file);
            e.target.value = '';
        }
    }



    async function handleFormSubmit(e:FormEvent) {
        e.preventDefault();
        const data = new FormData();
        if (image) {
            data.set('image', image);
          }
        data.set('itemName', itemName);
        data.set('description', description);
        data.set('basePrice', basePrice);
        await toast.promise(new Promise<void>(async(resolve,reject)=>{
            const response = await fetch(`/api/menu-items/${id}`,{
                method:'PUT',
                body: data
            })
            if(response.ok)
                resolve()
            else
                reject()
        }),{
            loading:'Saving the item',
            success:'Saved',
            error:'Error'
        })

        return router.push('/menu-items') 
    }

    if (loading)
        return 'Loading...'
    if (!data.isAdmin)
        return 'Not an Admin'
    return (
        <section className='mt-8'>
            <UserTabs isAdmin={data.isAdmin} />
            <div className="max-w-md mx-auto mt-8" >
            <Link
            className='button justify-center items-center'
                href={'/menu-items/'}>
                    <Left/>
                    <span>Show all menu items</span> 
                    
            </Link>
            
        </div>
            <form className="mt-8 max-w-xl mx-auto" onSubmit={handleFormSubmit}>
                <div className="flex gap-4 items-start">
                    <div>
                        {(imageUrl || image)? (
                           <>
                           <Image className='rounded-lg w-60 h-60 mb-1' src={(image && URL.createObjectURL(image))|| imageUrl} alt='product' width={250} height={250} />
                           <span className='block border border-gray-300 cursor-pointer rounded-lg p-2 my-2 text-gray-500 text-sm text-center' onClick={() => setImage(null)}>Cancel</span>
                           </> 
                        ) : (
                            <div className="bg-gray-200 py-28  mb-2 rounded-lg px-8 text-gray-500 text-center w-60 h-60">
                                No image
                            </div>
                        )}

                        <label>
                            <input type="file" className='hidden' onChange={handleImageChange} />
                            <span className='block border border-gray-300 cursor-pointer rounded-lg p-2 text-center'>Edit</span>
                        </label>
                    </div>
                    <div className='grow'>
                        <label>Item name</label>
                        <input
                         type="text"
                         value={itemName}
                         onChange={e => setItemName(e.target.value)} />

                        <label>Description</label>
                        <input
                         type="text"
                         value={description}
                         onChange={e => setDescription(e.target.value)} />

                        <label>Base price</label>
                        <input
                         type="text"
                         value={basePrice}
                         onChange={e => setBasePrice(e.target.value)} />

                         <button type='submit'>Save</button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default EditMenuItemsPage