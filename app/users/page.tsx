'use client'
import UserTabs from '@/components/layout/UserTabs'
import { useProfile } from '@/components/useProfile'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface UserData {
    _id:string
    name:string;
    email:string;
    image:string;
}

function UsersPage() {
    const {loading,data} = useProfile();
    const [users,setUsers] = useState<UserData[]|null>(null)
    useEffect(()=>{
        fetch('api/users').then(response => {
            response.json().then(data=>{
                setUsers(data)
            })
        })
    },[])

    if(loading){
        return 'Loading user info...'
    }
    if(!data.isAdmin) {
        return 'Not an admin'
    }
  return (
    <section className='max-w-2xl mx-auto mt-8'>
        <UserTabs isAdmin={data.isAdmin}/>
        {users && users.map(user =>(
            <div className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                    <div className="text-gray-900">
                        {user.name && (
                            <span>{user.name}</span>
                        )}
                        {!user.name && (
                            <span className='italic'>No name</span>
                        )}
                    </div>
                    <span className='text-gray-500'>{user.email}</span>
                </div>
                <div>
                    <Link className='button' href={`/users/${user._id}`} >
                        Edit
                    </Link>
                </div>
            </div>
        ))}
    </section>
  )
}

export default UsersPage