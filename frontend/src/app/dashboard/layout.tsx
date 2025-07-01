'use client'

import { AuthProvider, useAuth } from '../components/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [loading, user])

    if (loading) return <p className="p-4">Loading...</p>

    return <>{children}</>
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ProtectedLayout>{children}</ProtectedLayout>
        </AuthProvider>
    )
}
