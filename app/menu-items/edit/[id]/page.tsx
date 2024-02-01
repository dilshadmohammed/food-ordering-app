'use client'
import Left from '@/components/icons/Left'
import UserTabs from '@/components/layout/UserTabs'
import { useProfile } from '@/components/useProfile'
import Image from 'next/image'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import MenuItemPriceProps from '@/components/layout/MenuItemPriceProps'
import DeleteButton from '@/components/DeleteButton'



function EditMenuItemsPage() {
    const { loading, data } = useProfile()
    const {id} = useParams();
    const [image, setImage] = useState<File | null>(null);
    const [itemName,setItemName] = useState('');
    const [description,setDescription] = useState('');
    const [basePrice,setBasePrice] = useState('');
    const [imageUrl,setImageUrl] = useState('')
    const [sizes, setSizes] = useState<Array<{ name: string; price: string }>>([])
    const [extraIngridientsPrices, setExtraIngridientsPrices] = useState<Array<{ name: string; price: string }>>([])
    const router = useRouter()
    const [categories,setCategories] = useState<{_id:string,name:string}[]|null>(null)
    const [category,setCategory] = useState('')

    useEffect(() => {
        fetch(`/api/menu-items/item/${id}`).then(res => {
            res.json().then(item => {
               
                setItemName(item.name)
                setImageUrl(item.image)
                setDescription(item.description)
                setBasePrice(item.basePrice)
                setSizes(item.sizes)
                setCategory(item.category)
                setExtraIngridientsPrices(item.extraIngredientsPrices)
            })
        })
    },[])

    useEffect(()=>{
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
    },[])

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;

        if (files && files.length > 0) {
            const file = files[0];
            setImage(file);
            e.target.value = '';
        }
    }

    async function handleDeleteItem() {
        await toast.promise(new Promise<void>(async (resolve,reject)=>{
            const res = await fetch(`/api/menu-items/item/${id}`,{
                method:'DELETE',
            })
            console.log(res)
            if(res.ok){
                resolve()
                return router.push('/menu-items')
            }
                
            else
                reject()
        }),{
            loading:'Deleting...',
            success:'Deleted',
            error:'Error'
        })
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
        data.set('ImageUrl',imageUrl)
        data.set('category',category)
        data.set('sizes',JSON.stringify(sizes))
        data.set('extraIngredientsPrices',JSON.stringify(extraIngridientsPrices))
        

        await toast.promise(new Promise<void>(async(resolve,reject)=>{
            const response = await fetch(`/api/menu-items/item/${id}`,{
                method:'PUT',
                body: data
            })
            if(response.ok)
            {   
                resolve()
            }
                
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
            <form className="mt-8 mx-auto" onSubmit={handleFormSubmit}>
                <div className="flex gap-4 items-start">
                    <div>
                        {(imageUrl || image)? (
                           <>
                           <Image className='rounded-lg w-80 h-80 mb-1' src={(image && URL.createObjectURL(image))|| imageUrl} alt='product' width={250} height={250} />
                           {image && (<span className='block border border-gray-300 cursor-pointer rounded-lg p-2 my-2 text-gray-500 text-sm text-center' onClick={() => setImage(null)}>Cancel</span>)}
                           </> 
                        ) : (
                            <div className="bg-gray-200 py-28  mb-2 rounded-lg px-8 text-gray-500 text-center w-80 h-80">
                                No image
                            </div>
                        )}

                        <label>
                            <input type="file" className='hidden' onChange={handleImageChange} />
                            <span className='block border border-gray-300 cursor-pointer rounded-lg p-2 mt-4 text-center'>Edit</span>
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

                        <label>Category</label>
                        <select value={category} onChange={e=>setCategory(e.target.value)}>
                             {categories && categories.map(c => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                             ))}
                        </select>
                        <label>Base price</label>
                        <input
                         type="text"
                         value={basePrice}
                         onChange={e => setBasePrice(e.target.value)} />
                        
                        <MenuItemPriceProps 
                        name={'Size'} 
                        addLabel={'Add item size'}
                        props={sizes} 
                        setProps={setSizes} />
                        <MenuItemPriceProps
                        name='Extra Ingrients'
                        addLabel='Add extra ingridients'
                        props={extraIngridientsPrices}
                        setProps={setExtraIngridientsPrices} />

                        <button type='submit' >Save</button>
                        <DeleteButton className='mt-2' label='Delete this Item' onDelete={handleDeleteItem} />
                    </div>
                </div>
            </form>
        </section>
    )
}

export default EditMenuItemsPage