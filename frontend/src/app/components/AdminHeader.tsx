'use client'
import {FiUser, FiSettings, FiHome} from 'react-icons/fi'
import Link from "next/link";
import {useState} from "react";
import {useAuth} from "@/app/components/AuthProvider";

export default function AdminHeader() {
    const [open, setOpen] = useState(false);
    const {user, logoutUser} = useAuth()

    return (
        <header className="h-14 bg-white shadow-md flex items-center justify-end px-6 relative">
            <div className="flex items-center space-x-4 text-gray-600">
                <Link href="/">
                    <FiHome className="cursor-pointer" />
                </Link>
                <FiSettings className="cursor-pointer" />

                {/* Dropdown for user */}
                <div className="relative">
                    <button onClick={() => setOpen(!open)}>
                        {/*<FiUser className="cursor-pointer" /> */}
                        {user?.email}
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-50">
                            <a
                                href="#"
                                onClick={logoutUser}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
