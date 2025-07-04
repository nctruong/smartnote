'use client'
import Image from "next/image";
import {useAuth} from "./components/AuthProvider"
import Navbar from "@/app/components/Navbar";
import Breadcrumb from "@/app/components/Breadcrumb";
import EformCard from "@/app/components/EformCard";
import Pagination from "@/app/components/Pagination";

export default function Home() {

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar/>
            <div className="flex h-screen max-w-7xl mx-auto mt-2">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-100 border-r p-4">
                    <div className="font-bold text-lg mb-6">Administrator</div>
                    <nav className="space-y-2 text-sm">
                        <a href="/admin" className="block px-2 py-1 rounded hover:bg-gray-200">Admin</a>
                    </nav>
                </aside>

                {/* Main content */}
                <div className="flex-1 bg-white p-6 overflow-auto">

                    <div className="max-w-6xl mx-auto px-6 py-4">
                        <Breadcrumb path={['Home', 'Eform']}/>

                        <h1 className="text-xl font-bold mb-4">Eforms</h1>

                        <EformCard
                            title="EMF_EMISSARY_EBDN_3299"
                            timestamp="2025-04-18 00:30:11 +0800"
                            signed
                            sentMpa
                            vesselMaster={['ovalencia@oocl.com', 'ksan10@yahoo.com']}
                        />

                        <Pagination currentPage={1}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
