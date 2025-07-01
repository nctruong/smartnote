import {FiUser, FiSettings, FiHome} from 'react-icons/fi'
import Link from "next/link";

export default function AdminHeader() {
    return (
        <header className="h-14 border-b bg-white flex items-center justify-end px-6">
            <div className="flex items-center space-x-4 text-gray-600">
                <Link href="/"><FiHome /></Link>

                <FiSettings />
                <FiUser />
            </div>
        </header>
    )
}
