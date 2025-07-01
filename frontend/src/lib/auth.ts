'use client'
import axios from 'axios'

export async function login(email: string, password: string): Promise<boolean> {
    try {
        const response = await axios.post('http://localhost:3001/auth/login', { email, password })
        const token = response.data.access_token

        // Save token in cookie (expires in 1 day)
        document.cookie = `token=${token}; path=/; max-age=86400`

        return true
    } catch (err) {
        return false
    }
}

export function logout() {
    // Delete token from cookie
    document.cookie = 'token=; Max-Age=0; path=/'

    // Optional: call NestJS logout endpoint (not required for JWT stateless)
    fetch('http://localhost:3001/auth/logout', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getTokenFromCookie()}`,
        },
    }).catch(() => {})

    // Redirect or reload
    window.location.href = '/login'
}

export async function getUserFromToken(token: string) {
    const res = await fetch('http://localhost:3001/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    })

    if (!res.ok) return null

    return res.json()
}

export function getTokenFromCookie(): string | null {
    const match = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))

    return match?.split('=')[1] || null
}
