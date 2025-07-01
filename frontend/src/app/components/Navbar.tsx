import Image from 'next/image'

export default function Navbar() {
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
            <div className="text-sm text-orange-600">
                <i className="mr-1">👤</i>ovalencia@oocl.com(member)
            </div>
        </div>
    )
}
