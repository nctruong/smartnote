'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getTokenFromCookie, getUserFromToken } from '@/lib/auth'

type User = {
    email: string
    id: number
}

type AuthContextType = {
    user: User | null
    loading: boolean,
    logoutUser: () => void,
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logoutUser: () => {},
})

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = getTokenFromCookie()
        if (!token) {
            setUser(null)
            setLoading(false)
            return
        }

        getUserFromToken(token)
            .then((user) => {
                setUser(user)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    function logoutUser() {
        setUser(null)
        localStorage.removeItem('token')
        document.cookie = 'token=; Max-Age=0; path=/'
        window.location.href = '/login'
    }

    return (
        <AuthContext.Provider value={{ user, loading, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}
