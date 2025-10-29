"use client";

import React, { useState, useEffect } from "react";
import { Download, Edit, Trash2, Settings, QrCode, FileText } from "lucide-react";

export default function ManageFormsPage() {
    const [forms, setForms] = useState<any[]>([]);

    useEffect(() => {
        // Mock data — replace with API call
        setForms([
            {
                id: 1,
                name: "Test",
                date: "Oct 29, 2025",
                submissions: 1,
                scans: 1,
                image: "/form-thumbnail.png",
            },
        ]);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Top Nav */}
            <header className="flex items-center justify-between bg-white border-b px-8 py-3">
                <div className="flex items-center space-x-8">
                    <div className="font-bold text-lg">🐯 TIGER FORM</div>
                    <nav className="flex space-x-6 text-sm">
                        <a href="#" className="hover:text-blue-600">Forms</a>
                        <a href="#" className="hover:text-blue-600">Templates</a>
                        <a href="#" className="hover:text-blue-600">Blog</a>
                        <a href="#" className="hover:text-blue-600">Pricing</a>
                        <a href="#" className="hover:text-blue-600">FAQ</a>
                    </nav>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                    <button className="border rounded px-3 py-1">Eng</button>
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                </div>
            </header>

            {/* Main Layout */}
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-52 bg-white border-r min-h-screen py-6">
                    <nav className="flex flex-col text-sm space-y-3">
                        <a href="#" className="px-6 py-2 flex items-center space-x-2 font-medium text-gray-700 hover:bg-blue-50 border-l-4 border-transparent hover:border-blue-500">
                            <span>🧩</span>
                            <span>Form Builder</span>
                        </a>
                        <a href="#" className="px-6 py-2 flex items-center space-x-2 font-medium text-blue-600 bg-blue-50 border-l-4 border-blue-500">
                            <span>📋</span>
                            <span>Manage Forms</span>
                        </a>
                        <a href="#" className="px-6 py-2 flex items-center space-x-2 font-medium text-gray-700 hover:bg-blue-50 border-l-4 border-transparent hover:border-blue-500">
                            <span>⚙️</span>
                            <span>Settings</span>
                        </a>
                    </nav>
                </aside>

                {/* Content */}
                <main className="flex-1 p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-xl font-semibold">Manage Forms</h1>
                            <p className="text-sm text-gray-500">
                                View form submissions and Manage and Track QR Code scans.
                            </p>
                        </div>
                        <div className="flex space-x-8">
                            <div className="bg-white shadow rounded p-3 text-center">
                                <div className="text-xs text-gray-500">Total number of</div>
                                <div className="font-medium">Submissions</div>
                                <div className="text-lg font-bold">1</div>
                            </div>
                            <div className="bg-white shadow rounded p-3 text-center">
                                <div className="text-xs text-gray-500">Total number of</div>
                                <div className="font-medium">QR code Scans</div>
                                <div className="text-lg font-bold">1</div>
                            </div>
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className="flex items-center space-x-3 mb-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2">
                            <span>+ Create Form</span>
                        </button>
                        <button className="border px-4 py-2 rounded text-gray-700 flex items-center space-x-2">
                            <span>Choose a Template</span>
                        </button>
                        <div className="flex-1"></div>
                        <button className="border px-4 py-2 rounded text-gray-700">
                            Download All Submissions (ZIP)
                        </button>
                        <input
                            type="text"
                            placeholder="Search"
                            className="border rounded px-3 py-2 text-sm w-48"
                        />
                    </div>

                    {/* Form List */}
                    <div className="bg-white rounded shadow overflow-hidden">
                        {forms.map((f) => (
                            <div key={f.id} className="flex items-center border-b last:border-none p-4 hover:bg-gray-50">
                                <div className="flex items-center w-1/3 space-x-3">
                                    <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden">
                                        <img src={f.image} alt="thumbnail" className="object-cover w-full h-full" />
                                    </div>
                                    <div>
                                        <div className="font-medium">{f.name}</div>
                                        <div className="text-xs text-gray-500">Last Modified: 10/29/25</div>
                                        <div className="flex space-x-2 mt-1 text-xs">
                                            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Active</span>
                                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">New</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-1/4 flex space-x-2">
                                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm px-3 py-1 rounded flex items-center space-x-1">
                                        <Edit size={14} /> <span>Edit Form</span>
                                    </button>
                                    <button className="bg-red-100 hover:bg-red-200 text-red-600 px-2 py-1 rounded">
                                        <Trash2 size={14} />
                                    </button>
                                </div>

                                <div className="w-1/6 text-sm text-gray-600">{f.date}</div>
                                <div className="w-1/12 text-center text-sm">{f.submissions}</div>
                                <div className="w-1/6 flex items-center space-x-3 justify-center">
                                    <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded">
                                        <QrCode size={20} />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <button className="border rounded px-3 py-1 text-sm flex items-center space-x-1">
                                            <Download size={14} /> <span>Download</span>
                                        </button>
                                        <button className="border rounded px-3 py-1 text-sm flex items-center space-x-1">
                                            <Settings size={14} /> <span>Settings</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="w-1/12 text-center text-sm">{f.scans}</div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center space-x-3 mt-6 text-sm text-gray-600">
                        <button className="px-2 py-1 border rounded">«</button>
                        <span className="px-3 py-1 bg-gray-200 rounded">1</span>
                        <button className="px-2 py-1 border rounded">»</button>
                    </div>
                </main>
            </div>
        </div>
    );
}
