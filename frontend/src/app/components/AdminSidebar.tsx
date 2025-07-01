'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Users', href: '/admin/users' },
    // { label: 'Activity Logs', href: '/admin/logs' },
    { label: 'Companies', href: '/admin/companies' },
    { label: 'Receiving Vessel Companies', href: '/admin/vessels' },
]

export default function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 bg-white border-r h-full p-4 space-y-2">
            <h2 className="text-xl font-semibold mb-4">Administrator</h2>
            <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`px-3 py-2 rounded text-sm ${
                            pathname === item.href
                                ? 'bg-gray-200 font-medium'
                                : 'hover:bg-gray-100'
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
