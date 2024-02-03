'use client'
import Loading from '@/components/layout/Loading'
import NotAdmin from '@/components/layout/NotAdmin'
import UserTabs from '@/components/layout/UserTabs'
import { useProfile } from '@/components/useProfile'
import React, { useEffect, useState } from 'react'

interface UserData {
    _id:string
    name:string;
    email:string;
    isAdmin:boolean
}

function UsersPage() {
    const {loading,data} = useProfile();
    const [users,setUsers] = useState<UserData[]|null>(null)
    useEffect(()=>{
        fetch('api/users').then(response => {
            response.json().then(data=>{
                setUsers(data)
                console.log(data)
            })
        })
    },[])

    
    const handleAdminToggle = (userId: string) => {
        const updatedUsers = users?.map(user => {
            if (user._id === userId) {
                return { ...user, isAdmin: !user.isAdmin }
            }
            return user;
        }) || []
        setUsers(updatedUsers);
        
        fetch(`api/users/${userId}/admin`, {
            method: 'PUT',
            body: JSON.stringify({ isAdmin: !users?.find(user => user._id === userId)?.isAdmin }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                // Handle error if needed
            }
        }).catch(error => {
            // Handle error if needed
        });
    }


    if(loading){
        return <Loading/>
    }
    if(!data.isAdmin) {
        return <NotAdmin/>
    }
  return (
    <section className='max-w-2xl mx-auto mt-8'>
        <UserTabs isAdmin={data.isAdmin}/>
        {users && users.map(user =>(
            <div key={user._id} className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
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
                   <label className='p-2 inline-flex items-center gap-2 '>
                    <input 
                    className='w-3 h-3'
                        type="checkbox"
                        checked={user.isAdmin}
                        onChange={()=>handleAdminToggle(user._id)}
                    />
                    <span className='mt-[4px]'>Admin</span>
                   </label>
                </div>
            </div>
        ))}
    </section>
  )
}

export default UsersPage