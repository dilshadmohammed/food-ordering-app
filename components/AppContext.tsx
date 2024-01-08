'use client';
import { SessionProvider } from 'next-auth/react'

interface AppProviderProps {
  children: React.ReactNode;
}

function AppProvider({children}: AppProviderProps) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default AppProvider