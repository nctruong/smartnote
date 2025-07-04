import axiosClient from "@/lib/axiosClient";

export default function AdminDashboardPage() {

    
    return (
        <div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded border border-green-300 mb-4">
                ✅ Signed in successfully.
            </div>

            <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
            <p className="text-sm text-gray-600 mb-6">
                Welcome to Active Admin. This is the default dashboard page.
            </p>

            <p className="text-xs text-gray-400 border-t pt-4">
                Powered by Active Admin 4.0.0.beta7
            </p>
        </div>
    )
}
