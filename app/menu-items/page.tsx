'use client'
import Right from '@/components/icons/Right'
import UserTabs from '@/components/layout/UserTabs'
import { useProfile } from '@/components/useProfile'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface MenuItemsType {
    _id: string;
    name: string;
    description: string;
    image: string;
    basePrice: number;
}

function MenuItemsPage() {
    const { loading, data } = useProfile()
    const [menuItems, setMenuItems] = useState<[MenuItemsType] | null>(null)
    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems)
            })
        })

    }, [])
    if (loading)
        return 'Loading...'
    if (!data.isAdmin)
        return 'Not an admin'
    return (
        <section className='mt-8 max-w-2xl mx-auto'>
            <UserTabs isAdmin={data.isAdmin} />
            <div className="mt-8" >
                <Link
                    className='button justify-center items-center'
                    href={'/menu-items/new'}>
                    <span>Create new menu item</span>
                    <Right />
                </Link>

            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
                <div className='grid grid-cols-4 gap-2'>
                    {menuItems && menuItems.map((item) => (
                        <Link key={item._id} href={'/menu-items/edit/'+item._id}
                        className='bg-gray-200 rounded-lg p-4'>
                            <div className="relative">
                                <Image 
                                className='rounded-md'
                                src={item.image} alt='item-image' width={200} height={200} />
                            </div>
                            <div className="text-center">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </section>
    )
}

export default MenuItemsPage