'use client'

import './globals.css'                
import {AuthProvider, useAuth} from './components/AuthProvider'
import {useRouter} from 'next/navigation'
import {JSX, useEffect} from 'react'
import Link from "next/link";
import {
    Linkedin,
    Twitter,
    Instagram,
    Facebook,
    Youtube,
    Globe,
    Send,
} from "lucide-react";


function ProtectedLayout({children}: { children: React.ReactNode }) {
    const {user, loading} = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [loading, user])

    if (loading) return <p className="p-4">Loading...</p>

    return <>{children}</>
}

export default function Layout({children}: { children: React.ReactNode }) {
    function SocialIcon({ icon }: { icon: JSX.Element }) {
        return (
            <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center hover:bg-gray-300 cursor-pointer">
                {icon}
            </div>
        );
    }

    return (
        <AuthProvider>
            <html lang="en">
            <body>
            {/* Main content */}
            <div className="min-h-screen bg-gray-50 text-gray-800">
                {/* Top Nav */}
                <div className="sticky top-0 card border-b border-0.5 border-[#CBD5E1] shadow-lg z-50 bg-white p-2">
                    <div className="mx-auto container xl:w-[72rem] min-w-max">
                        <div className="p-menubar p-component flex flex-row p-2">
                            <div className="p-menubar p-component flex flex-row p-2">
                                <div className="p-menubar-start">
                                    <a href="/" className="flex flex-row flex-wrap cursor-pointer mx-auto lg:mr-2.5">
                                        <div className="flex items-center"><span className="p-image p-component"
                                                                                 data-pc-name="image"
                                                                                 data-pc-section="root"><img
                                            src="/logo-colour.png"
                                            className="h-10" alt="TIGER FORM logo"
                                            title="TIGER FORM - Form QR code generator"/></span></div>
                                    </a>
                                </div>
                                <ul className="p-menubar-root-list lg:flex items-center flex-wrap flex-col gap-2 lg:flex-row hidden absolute lg:relative top-full left-0 lg:top-auto lg:left-auto w-full lg:w-auto m-0 py-1 lg:py-0 lg:p-0 list-none shadow-md lg:shadow-none border-0 bg-surface-0 lg:bg-transparent outline-none">
                                    <li className="p-menuitem p-2"><Link href="/forms/manage-forms" className="hover:text-blue-600">Forms</Link>
                                    </li>
                                    <li className="p-menuitem p-2"><a href="#"
                                                                      className="hover:text-blue-600">Templates</a>
                                    </li>
                                    <li className="p-menuitem p-2"><a href="#" className="hover:text-blue-600">Blog</a>
                                    </li>
                                    <li className="p-menuitem p-2"><a href="#"
                                                                      className="hover:text-blue-600">Pricing</a>
                                    </li>
                                    <li className="p-menuitem p-2"><a href="#" className="hover:text-blue-600">FAQ</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-menubar-end ml-auto self-center">
                                <div
                                    className="flex items-center gap-2 text-[15px] text-pickled-bluewood-800 font-medium font-[Manrope]">
                                    <button className="border rounded px-3 py-1">Eng</button>
                                    <div className="w-8 h-8 rounded-full bg-gray-200"/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Layout */}
                <div className="flex">
                    {/* Sidebar */}


                    {/* Content */}
                    <main className="flex-1 bg-gray-100">
                        <ProtectedLayout>{children}</ProtectedLayout>
                    </main>
                </div>

                <footer className="bg-gray-50 text-gray-600 ">
                    <div className=" mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
                        {/* Left section */}
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <img
                                    src="/logo.png"
                                    alt="Tiger Form"
                                    className="h-8 w-8 object-contain"
                                />
                                <h2 className="font-bold text-lg text-gray-800">TIGER FORM</h2>
                            </div>
                            <p className="text-sm mb-6">
                                The most advanced QR Form Generator Online
                            </p>

                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                                    STAY IN THE LOOP
                                </h3>
                                <p className="text-sm mb-3">
                                    Sign up for our newsletter and be the first to hear about promos,
                                    updates and tips
                                </p>
                                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="flex-1 px-3 py-2 text-sm focus:outline-none"
                                    />
                                    <button className="bg-blue-600 text-white px-3 py-2 hover:bg-blue-700">
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                                    JOIN THE COMMUNITY
                                </h3>
                                <div className="flex space-x-3">
                                    <SocialIcon icon={<Linkedin size={18} />} />
                                    <SocialIcon icon={<Twitter size={18} />} />
                                    <SocialIcon icon={<Instagram size={18} />} />
                                    <SocialIcon icon={<Facebook size={18} />} />
                                    <SocialIcon icon={<Youtube size={18} />} />
                                </div>
                            </div>
                        </div>

                        {/* Middle section */}
                        <div className="md:col-span-2 grid sm:grid-cols-3 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                                    RESOURCES
                                </h3>
                                <ul className="space-y-1 text-sm">
                                    <li>Retail Survey Form</li>
                                    <li>Promotion Form for Advertising</li>
                                    <li>Healthcare Form</li>
                                    <li>Project Evaluation Form for Construction</li>
                                    <li>Service Request Form for Utilities</li>
                                    <li>Student Registration Form</li>
                                    <li>Event Evaluation Form</li>
                                    <li>Restaurant Ordering System Form</li>
                                    <li>Supplier Evaluation Form for Logistics</li>
                                    <li>Customer Engagement Form</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2 text-sm">GUIDES</h3>
                                <ul className="space-y-1 text-sm">
                                    <li>Help Center</li>
                                    <li>Blog</li>
                                    <li>TIGER FORM Guide</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2 text-sm">COMPANY</h3>
                                <ul className="space-y-1 text-sm mb-4">
                                    <li>About us</li>
                                    <li>Contact us</li>
                                </ul>
                                <h3 className="font-semibold text-gray-800 mb-2 text-sm">TERMS</h3>
                                <ul className="space-y-1 text-sm">
                                    <li>Terms</li>
                                    <li>Privacy Policy</li>
                                    <li>Cookie Settings</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t text-center text-xs text-gray-500 py-4">
                        © QR Form Generator 2025 All rights reserved |{" "}
                        <a href="#" className="hover:text-blue-600">
                            Privacy Policy
                        </a>{" "}
                        |{" "}
                        <a href="#" className="hover:text-blue-600">
                            Refund / Cancellation Policy
                        </a>
                    </div>

                    {/* Floating help button */}
                    <button className="fixed bottom-6 right-6 bg-orange-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-orange-600 flex items-center space-x-1">
                        <span>💬</span>
                        <span className="font-medium text-sm">Need Help?</span>
                    </button>
                </footer>
            </div>
            </body>
            </html>
        </AuthProvider>
    )
}
