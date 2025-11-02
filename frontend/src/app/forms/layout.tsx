'use client'

import '@/app/globals.css'
import {AuthProvider, useAuth} from './../components/AuthProvider'
import {useRouter} from 'next/navigation'
import {JSX, useEffect} from 'react'
import Navbar from "@/app/components/Navbar";
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
                

                {/* Main Layout */}
                <div className="flex">
                    {/* Sidebar */}
                    <aside className="bg-white w-32 min-w-32 hidden xl:block">
                        <div className="flex flex-col items-center text-center">
                            <Link href={"/forms/form-builder"}>
                                <div className="w-full py-4 hover:bg-gray-100" title="Form Builder"><a
                                className="flex flex-col cursor-pointer" data-pd-ripple="true">
                                <div className="flex items-center justify-center mb-1">
                                    <div className="self-center mx-1">
                                        <svg className="size-8" width="36" height="43" viewBox="0 0 36 43" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M28.3132 0.00012207H8.01007C3.80688 0.00413283 0.400495 3.41052 0.396484 7.61379V35.1679C0.400495 39.3712 3.80688 42.7776 8.01015 42.7816H28.3132C32.5165 42.7776 35.9228 39.3712 35.9268 35.1679V7.61379C35.9228 3.41052 32.5164 0.00413283 28.3132 0.00012207ZM18.1616 32.5067H9.46029C8.45911 32.5067 7.64751 31.6951 7.64751 30.6939C7.64751 29.6928 8.45911 28.8812 9.46029 28.8812H18.1616C19.1628 28.8812 19.9744 29.6928 19.9744 30.6939C19.9744 31.6951 19.1628 32.5067 18.1616 32.5067ZM26.863 23.3268H9.46029C8.45911 23.3268 7.64751 22.5153 7.64751 21.5141C7.64751 20.5129 8.45911 19.7013 9.46029 19.7013H26.8629C27.8641 19.7013 28.6757 20.5129 28.6757 21.5141C28.6757 22.5153 27.8641 23.3268 26.863 23.3268ZM26.863 13.9005H9.46029C8.45911 13.9005 7.64751 13.0889 7.64751 12.0877C7.64751 11.0865 8.45911 10.2749 9.46029 10.2749H26.8629C27.8641 10.2749 28.6757 11.0865 28.6757 12.0877C28.6757 13.0888 27.8641 13.9005 26.863 13.9005Z"
                                                fill="#0078D7"></path>
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-slate-600">Form Builder</span><span
                                role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false"
                                className="p-ink" data-pc-name="ripple" data-pc-section="root"></span></a></div>
                            </Link>
                            <Link href={"/forms/manage-forms"}>
                                <div className="w-full py-4 hover:bg-gray-100" title="Manage Forms"><a
                                className="flex flex-col cursor-pointer" data-pd-ripple="true">
                                <div className="flex items-center justify-center mb-1">
                                    <div className="self-center mx-1">
                                        <svg className="size-8" width="42" height="42" viewBox="0 0 42 42" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M41.1284 35.1914L41.1196 35.5244C40.952 38.8296 38.3018 41.4798 34.9966 41.6475L34.6636 41.6562H6.61963L6.28662 41.6475C2.98124 41.4799 0.331229 38.8298 0.163574 35.5244L0.154785 35.1914V10.2432H41.1284V35.1914ZM21.812 39.0703H34.6636C36.8057 39.0703 38.5425 37.3335 38.5425 35.1914V30.9248H21.812V39.0703ZM2.74072 35.1914C2.74073 37.3335 4.47751 39.0703 6.61963 39.0703H19.6655V30.9248H2.74072V35.1914ZM21.812 28.7793H38.5425V22.1445H21.812V28.7793ZM2.74072 28.7793H19.6655V22.1445H2.74072V28.7793ZM21.812 19.999H38.5425V12.8291H21.812V19.999ZM2.74072 19.999H19.6655V12.8291H2.74072V19.999ZM34.6636 0.681641C38.2338 0.681641 41.1284 3.57628 41.1284 7.14648V10.2422H0.154785V7.14648C0.154785 3.57628 3.04943 0.681641 6.61963 0.681641H34.6636Z"
                                                fill="#64748B"></path>
                                        </svg>
                                    </div>
                                </div>
                                <a href="/forms/manage-forms"><span className="text-sm font-bold text-slate-600">Manage Forms</span></a>
                                <span
                                    role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false"
                                    className="p-ink" data-pc-name="ripple" data-pc-section="root"></span></a></div>
                            </Link>
                            <Link href={"/forms/form-settings"}>
                                <div className="w-full py-4 hover:bg-gray-100" title="Settings"><a
                                className="flex flex-col cursor-pointer" data-pd-ripple="true">
                                <div className="flex items-center justify-center mb-1">
                                    <div className="self-center mx-1">
                                        <svg className="size-8" width="43" height="44" viewBox="0 0 43 44" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                  d="M40.4483 25.8841C39.0146 25.0702 38.1241 23.554 38.1241 21.9253C38.1241 20.2974 39.0145 18.7811 40.4441 17.968C41.9114 17.1368 42.5216 15.4096 41.8946 13.8616C41.1087 11.9062 40.0386 10.0798 38.7219 8.43252C37.6727 7.12095 35.8502 6.77745 34.383 7.61404C32.9535 8.43252 31.1727 8.43498 29.739 7.62019C28.3094 6.8054 27.4233 5.28667 27.4275 3.65507C27.4275 1.98595 26.2152 0.600724 24.5391 0.361826C22.4323 0.0611373 20.2921 0.0628073 18.177 0.367979C16.5049 0.608547 15.2928 1.99298 15.2969 3.65877C15.2969 5.28834 14.4106 6.8062 12.9811 7.62019C11.5473 8.4341 9.7708 8.43243 8.33709 7.61483C6.86992 6.77825 5.0474 7.12341 3.9982 8.43498C3.3461 9.25222 2.74412 10.1259 2.21333 11.0333C1.68244 11.9392 1.21845 12.8886 0.825543 13.8537C0.194311 15.4042 0.804671 17.1338 2.27184 17.9671C3.70564 18.7802 4.59599 20.2973 4.59599 21.9252C4.59599 23.5531 3.70564 25.0689 2.27603 25.8833C0.808863 26.7146 0.198592 28.4408 0.825543 29.9884C1.61144 31.945 2.68151 33.7715 3.9982 35.4179C5.0474 36.7294 6.86992 37.0729 8.33709 36.2363C9.7667 35.4179 11.5474 35.4162 12.9811 36.2302C14.4106 37.045 15.2969 38.5637 15.2969 40.1953C15.2927 41.864 16.509 43.2492 18.1811 43.4886C19.2303 43.6381 20.2837 43.7127 21.337 43.7127C22.4071 43.7127 23.4772 43.636 24.5431 43.4824C26.2151 43.2414 27.4273 41.8582 27.4273 40.1924C27.4231 38.562 28.3092 37.0441 29.7388 36.2302C31.1726 35.4163 32.9492 35.4179 34.3829 36.2355C35.85 37.0721 37.6726 36.7277 38.7217 35.4154C39.3739 34.5977 39.9758 33.724 40.5066 32.8178C41.0333 31.9121 41.5057 30.9625 41.8944 29.9967C42.5258 28.4462 41.9156 26.7162 40.4483 25.8841ZM27.047 25.1616C26.1734 26.6586 24.7563 27.7299 23.0593 28.1773C21.3664 28.6246 19.594 28.3952 18.0766 27.5302C14.9416 25.7457 13.8632 21.7802 15.6731 18.6888C16.8853 16.6152 19.1008 15.4544 21.3705 15.4544C22.4866 15.4544 23.6111 15.7329 24.6435 16.3203C27.7785 18.1043 28.857 22.071 27.047 25.1616Z"
                                                  fill="#64748B"></path>
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-slate-600">Settings</span><span
                                role="presentation"
                                aria-hidden="true"
                                data-p-ink="true"
                                data-p-ink-active="false"
                                className="p-ink"
                                data-pc-name="ripple"
                                data-pc-section="root"></span></a>
                            </div>
                            </Link>

                        </div>
                    </aside>

                    {/* Content */}
                    <main className="flex-1 bg-gray-100">
                        <ProtectedLayout>{children}</ProtectedLayout>
                    </main>
                </div>

                <footer className="bg-gray-50 text-gray-600 ">
                    <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
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
