'use client'

import { useState } from 'react'
import EformModal from './EformModal'

export default function EformCard({ title }: { title: string }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div
                onClick={() => setShowModal(true)}
                className="bg-white p-4 rounded shadow flex gap-4 items-center cursor-pointer hover:bg-gray-50"
            >
                <div className="text-red-500 text-6xl">📄</div>
                <div>
                    <h2 className="font-semibold text-lg">{title}</h2>
                    <p className="text-sm text-gray-500">2025-04-18 00:30:11 +0800</p>
                    <div className="flex gap-2 mt-1">
                        <span className="text-green-600 bg-green-100 px-2 py-1 text-xs rounded">✔️ Signed</span>
                        <span className="text-green-600 bg-green-100 px-2 py-1 text-xs rounded">📤 Sent MPA</span>
                    </div>
                </div>
            </div>

            {showModal && <EformModal onClose={() => setShowModal(false)} />}
        </>
    )
}
