"use client"

import { useState } from "react";
import { User, CreditCard, Users, Settings, Star, Puzzle, Lock } from "lucide-react";

export default function FormSettings() {
    const [teamName, setTeamName] = useState("H4XX-SAST");
    const [teamDesc, setTeamDesc] = useState("");

    return (
        <div className="p-8 min-h-screen bg-gray-50 flex text-gray-800">
            {/* Sidebar */}
            <aside className="w-64">
                <div className="p-4 flex items-center space-x-2">
                    <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="text-gray-700" size={20} />
                    </div>
                    <span className="font-medium">Truong Nguyen</span>
                </div>

                {/* Sidebar links */}
                <nav className="">
                    <div className="mb-2 px-2 pt-4 pb-2 bg-white rounded-b-md">
                        <SidebarItem icon={<User size={18} />} label="Your Account" />
                        <SidebarDropdown
                            icon={<CreditCard size={18} />}
                            label="Billing"
                            items={["My Plan", "Billing Details", "Billing History"]}
                        />
                        <SidebarDropdown
                            icon={<Users size={18} />}
                            label="Team"
                            items={["My Team", "Members"]}
                            activeItem="My Team"
                        />
                    </div>

                    <div className="mb-8 px-2 pt-4 pb-2 bg-white rounded-md">
                        <p className="text-xs text-gray-500 mb-2 font-semibold uppercase">
                            Advanced Settings
                        </p>
                        <SidebarItem icon={<Star size={18} />} label="White Label" />
                        <SidebarItem icon={<Puzzle size={18} />} label="Integrations" />
                        <SidebarItem icon={<Lock size={18} />} label="SSO" />
                    </div>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8">
                <h1 className="text-2xl font-semibold mb-1">My Team</h1>
                <p className="text-gray-500 mb-6">
                    Streamline form-building collaboration by managing your team’s name,
                    description, and ownership. Enhance teamwork and coordination.{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                        Learn more
                    </a>
                </p>

                <div className="bg-white rounded-lg shadow-sm  p-6 mb-6">
                    <h2 className="font-semibold text-lg mb-4 flex items-center space-x-2">
                        <span>Team Details</span>
                        <span className="text-blue-500 text-sm">?</span>
                    </h2>

                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="text-sm font-medium block mb-1">Name</label>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md w-full p-2 text-sm"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                            />
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                Edit
                            </button>
                        </div>
                    </div>

                    {/* Description Field */}
                    <div>
                        <label className="text-sm font-medium block mb-1">Description</label>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                className="border border-gray-300  rounded-md w-full p-2 text-sm"
                                placeholder="Add a description about your team"
                                value={teamDesc}
                                onChange={(e) => setTeamDesc(e.target.value)}
                            />
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>

                {/* Team owner section */}
                <div className="bg-white rounded-lg shadow-sm  p-6">
                    <h2 className="font-semibold text-lg mb-4 flex items-center space-x-2">
                        <span>Team Details</span>
                        <span className="text-blue-500 text-sm">?</span>
                    </h2>
                    <p className="text-sm mb-4">
                        Team owner:{" "}
                        <span className="text-blue-600 font-medium">Truong Nguyen</span>
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Change Owner
                    </button>
                </div>
            </main>
        </div>
    );
}

/* Sidebar helper components */
function SidebarItem({ icon, label }: { icon: any; label: string }) {
    return (
        <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
            <div className="text-gray-600">{icon}</div>
            <span>{label}</span>
        </div>
    );
}

function SidebarDropdown({
                             icon,
                             label,
                             items,
                             activeItem,
                         }: {
    icon: any;
    label: string;
    items: string[];
    activeItem?: string;
}) {
    return (
        <div>
            <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                <div className="text-gray-600">{icon}</div>
                <span>{label}</span>
            </div>
            <div className="ml-6 mt-1">
                {items.map((item) => (
                    <div
                        key={item}
                        className={`p-2 rounded-md cursor-pointer ${
                            item === activeItem ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                        }`}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}
