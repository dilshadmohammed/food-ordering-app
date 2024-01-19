'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface UserTabsProps {
    isAdmin : boolean
}

function UserTabs({isAdmin}:UserTabsProps) {
    const path = usePathname();

  return (
    <div className='flex mx-auto m-8 gap-2 tabs justify-center'>
            <Link href={'/profile'} className={path == '/profile' ? 'active' : ''}>Profile</Link>
            {isAdmin && (
                <>
                    <Link href={'/categories'} className={path == '/categories' ? 'active' : ''}>categories</Link>
                    <Link href={'/menu-items'} className={path.includes('/menu-items') ? 'active' : ''}>Menu Items</Link>
                    <Link href={'/users'} className={path == '/users' ? 'active' : ''}>Users</Link>
                </>
            )}
        </div>
  )
}

export default UserTabs