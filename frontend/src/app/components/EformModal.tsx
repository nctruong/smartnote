'use client'

import { useEffect } from 'react'

export default function EformModal({ onClose }: { onClose: () => void }) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-6xl h-[90vh] rounded-lg overflow-hidden relative flex">
                {/* Sidebar */}
                <div className="w-64 bg-gray-100 p-4 space-y-6 border-r">
                    <div>
                        <h3 className="font-semibold mb-2">Vessel Chief Engineer</h3>
                        <p>👤 ovalencia@oocl.com</p>
                        <p>👤 ksan10@yahoo.com</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Eform Status</h3>
                        <ul className="space-y-2 text-sm">
                            <li>📄 After Bunkering Signed</li>
                            <li>
                                📄 Digital Signature processing...
                                <div className="w-full h-1 bg-blue-200 rounded overflow-hidden mt-1">
                                    <div className="h-full bg-blue-600 w-1/2 animate-pulse" />
                                </div>
                            </li>
                            <li>📄 Sent to MPA</li>
                        </ul>
                    </div>
                </div>

                {/* Main PDF viewer */}
                <div className="flex-1 relative">
                    <iframe
                        src="/sample.pdf" // 📝 Replace with actual PDF link
                        className="w-full h-full"
                    />
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                >
                    ✕
                </button>
            </div>
        </div>
    )
}
