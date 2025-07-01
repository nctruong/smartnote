'use client'

import '@/app/globals.css'
import {AuthProvider, useAuth} from './components/AuthProvider'
import {useRouter} from 'next/navigation'
import {useEffect} from 'react'
import Navbar from "@/app/components/Navbar";
import Link from "next/link";

function ProtectedLayout({children}: { children: React.ReactNode }) {
    const {user, loading} = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [loading, user])

    if (loading) return <p className="p-4">Loading...</p>

    return <>{children}</>
}

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <html lang="en">
            <body>
            {/* Main content */}
            <main className="flex-1 bg-white overflow-auto">
                <ProtectedLayout>{children}</ProtectedLayout>
            </main>
            </body>
            </html>
        </AuthProvider>
    )
}
