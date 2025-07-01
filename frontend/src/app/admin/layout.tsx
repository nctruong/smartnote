// app/admin/layout.tsx
import AdminSidebar from '@/app/components/AdminSidebar'
import AdminHeader from '@/app/components/AdminHeader'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-50">
            <AdminSidebar />

            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    )
}
