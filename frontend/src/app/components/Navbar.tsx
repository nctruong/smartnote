import Image from 'next/image'
import {useAuth} from "@/app/components/AuthProvider";
import {useState} from "react";
import {FiUser} from "react-icons/fi";

export default function Navbar() {
    const {user, logoutUser} = useAuth()
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-orange-600">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={80}
                    height={40}
                    className="rounded"
                />
            </div>
            <div className="relative">
                <button onClick={() => setOpen(!open)}>
                    <FiUser className="cursor-pointer" />
                </button>

                {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-50">
                        <button
                            onClick={logoutUser}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
