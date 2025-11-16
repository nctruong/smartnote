'use client'

import {useState} from 'react'
import {login} from '@/lib/auth'
import {useRouter} from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('admin@example.com')
    const [password, setPassword] = useState('Admin123@')
    const [message, setMessage] = useState('')
    const router = useRouter()

    const handleLogin = async () => {
        const res = await login(email, password)
        if (res) {
            setMessage('✅ Logged in!')
            router.push('/') // or redirect to /dashboard
        } else {
            setMessage('❌ Invalid email or password')
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={handleLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Login
            </button>
            {message && <p className="mt-2 text-sm">{message}</p>}
        </div>
    )
}
