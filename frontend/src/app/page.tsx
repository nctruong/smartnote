'use client'
import Image from "next/image";
import {useAuth} from "./components/AuthProvider"

import Landing from './landing'

export default function Home() {

    return (
        <div className="bg-gray-100">
            {/*<Navbar/>*/}
            <div className="flex mx-auto mt-2">
                {/*/!* Sidebar *!/*/}
                {/*<aside className="w-64 bg-gray-100 border-r p-4">*/}
                {/*    <div className="font-bold text-lg mb-6">Administrator</div>*/}
                {/*    <nav className="space-y-2 text-sm">*/}
                {/*        <a href="/admin" className="block px-2 py-1 rounded hover:bg-gray-200">Admin</a>*/}
                {/*    </nav>*/}
                {/*</aside>*/}

                {/* Main content */}
                <div className="flex-1">

                    <Landing/>
                </div>
            </div>
        </div>
    )
}
