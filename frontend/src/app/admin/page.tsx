export default function AdminDashboardPage() {
    const handleDelete = async (id: string) => {
        const confirm = window.confirm('Are you sure you want to delete this user?')
        if (!confirm) return

        const res = await fetch(`http://localhost:3001/users/${id}`, {
            method: 'DELETE',
        })

        if (res.ok) {
            setUsers(prev => prev.filter(user => user.id !== id))
        } else {
            alert('Failed to delete user.')
        }
    }
    
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
