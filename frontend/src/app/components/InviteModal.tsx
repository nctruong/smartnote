'use client'

import { useState } from 'react'

export default function InviteModal({ email, onClose }: { email: string, onClose: () => void }) {
    const [password, setPassword] = useState('')

    const handleSend = async () => {
        await fetch('http://localhost:3001/invite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        alert('Invitation sent!')
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Send invite to:</h2>

                <div className="mb-3">
                    <label className="text-sm font-medium">Email:</label>
                    <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full mt-1 p-2 border rounded bg-blue-50"
                    />
                </div>

                <div className="mb-3">
                    <label className="text-sm font-medium">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-1 p-2 border rounded bg-blue-50"
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleSend}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}
