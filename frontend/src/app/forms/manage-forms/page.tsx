"use client";

import React, {useState, useEffect} from "react";
import {Download, Edit, Trash2, Settings, QrCode, FileText} from "lucide-react";
import { FiEdit, FiTrash2, FiDownload, FiSettings, FiShare2 } from "react-icons/fi";

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
                image: "/form.jpeg",
            },
            {
                id: 1,
                name: "Test",
                date: "Oct 29, 2025",
                submissions: 1,
                scans: 1,
                image: "/form.jpeg",
            },
            {
                id: 1,
                name: "Test",
                date: "Oct 29, 2025",
                submissions: 1,
                scans: 1,
                image: "/form.jpeg",
            },
            {
                id: 1,
                name: "Test",
                date: "Oct 29, 2025",
                submissions: 1,
                scans: 1,
                image: "/form.jpeg",
            },
            {
                id: 1,
                name: "Test",
                date: "Oct 29, 2025",
                submissions: 1,
                scans: 1,
                image: "/form.jpeg",
            },
        ]);
    }, []);

    return (
        <div className="p-0 lg:m-4 w-full">
            <div className="flex flex-col lg:flex-row justify-between p-2 lg:p-4 mb-4">
                <div className="py-3">
                    <div className="text-xl text-pickled-bluewood-800 font-semibold">
                        Manage Forms
                    </div>
                    <div className="text-sm text-rock-blue-500">
                        View form submissions and Manage and Track QR Code scans.{" "}
                        <a
                            target="_blank"
                            href="/tiger-form-guide"
                            className="inline-block text-primary-400"
                        >

                        </a>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row">
                    <div className="flex border rounded-lg p-3">
                        <div className="w-40 lg:w-auto">
                            <div className="text-rock-blue-500 text-[13px]">
                                Total number of
                            </div>
                            <div className="text-lynch-500 font-semibold text-lg">
                                Submissions
                            </div>
                        </div>
                        <div
                            role="separator"
                            aria-orientation="vertical"
                            className="flex relative justify-center items-center items-start mx-4 md:mx-5 py-5 min-h-full before:block before:absolute before:left-1/2 before:top-0 before:transform before:-translate-x-1/2 before:min-h-full before:border-solid before:border-l before:border-surface-200 text-rock-blue-500"
                            style={{ alignItems: "center" }}
                        ></div>
                        <div className="text-primary-400 font-bold text-[32px]">1</div>
                    </div>

                    <div className="flex border rounded-lg p-3 ml-0 lg:ml-4 mt-2 lg:mt-0">
                        <div className="w-40 lg:w-auto">
                            <div className="text-rock-blue-500 text-[13px]">
                                Total number of
                            </div>
                            <div className="text-lynch-500 font-semibold text-lg">
                                QR code Scans
                            </div>
                        </div>
                        <div
                            role="separator"
                            aria-orientation="vertical"
                            className="flex relative justify-center items-center items-start mx-4 md:mx-5 py-5 min-h-full before:block before:absolute before:left-1/2 before:top-0 before:transform before:-translate-x-1/2 before:min-h-full before:border-solid before:border-l before:border-surface-200 text-rock-blue-500"
                            style={{ alignItems: "center" }}
                        ></div>
                        <div className="text-primary-400 font-bold text-[32px]">1</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 my-2 mx-2 lg:mx-0"></div>

            <div className="bg-white rounded-lg">
                <div className="p-datatable p-component p-datatable-responsive-scroll w-full p-2 lg:p-4">
                    <div className="p-4 min-h-screen">
                        {/* Top actions */}
                        <div className="flex flex-col lg:flex-row justify-between gap-3 mb-4">
                            <div className="flex gap-3">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-blue-700">
                                    Create Form <span className="text-lg">+</span>
                                </button>

                                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-blue-50">
                                    Choose a Template <span className="text-lg">✨</span>
                                </button>
                            </div>

                            <div className="flex gap-3">
                                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
                                    Download All Submissions (ZIP)
                                </button>

                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="border border-slate-300 rounded-lg px-3 py-2 outline-none w-56"
                                />
                            </div>
                        </div>

                        {/* Table header */}
                        <div className="grid grid-cols-6 text-sm text-slate-500 font-medium mb-2 px-4">
                            <div>Form Details</div>
                            <div>Form Actions</div>
                            <div>Date Created</div>
                            <div>Submissions</div>
                            <div>QR Code</div>
                            <div>Scans</div>
                        </div>

                        {/* Table rows */}
                        {forms.map((form) => (
                            <div
                                key={form.id}
                                className="grid grid-cols-6 items-center bg-white rounded-lg border border-gray-300 mb-3 p-4 hover:shadow-md transition"
                            >
                                {/* Form details */}
                                <div className="flex gap-3 items-center">
                                    <div className="w-20 h-16 border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                                        <img
                                            src={form.image}
                                            alt="form thumbnail"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-lg text-slate-800">{form.name}</div>
                                        <div className="text-sm text-slate-500">
                                            Last Modified: {form.modified}
                                        </div>
                                        <div className="flex gap-2 mt-1">
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md">
                  New
                </span>
                                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md">
                  {form.status}
                </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2">
                                    <button className="bg-slate-700 text-white flex items-center justify-center gap-2 py-2 rounded-md hover:bg-slate-800">
                                        <FiEdit /> Edit Form
                                    </button>
                                    <div className="flex gap-2">
                                        <button className="bg-red-50 text-red-600 border border-red-200 rounded-md px-3 py-2 flex items-center gap-1 hover:bg-red-100">
                                            <FiTrash2 /> Delete
                                        </button>
                                        <button className="bg-slate-50 text-slate-600 border border-slate-200 rounded-md px-3 py-2 flex items-center gap-1 hover:bg-slate-100">
                                            <FiShare2 />
                                        </button>
                                    </div>
                                </div>

                                <div className="text-slate-700">{form.created}</div>
                                <div className="text-slate-700">{form.submissions}</div>

                                {/* QR Code + download */}
                                <div className="flex flex-col items-center gap-2">
                                    <img
                                        src="/qrcode.png"
                                        alt="QR"
                                        className="w-16 h-16 border rounded-md"
                                    />
                                    <button className="border border-blue-600 text-blue-600 rounded-md px-3 py-1 text-sm flex items-center gap-1 hover:bg-blue-50">
                                        <FiDownload /> Download
                                    </button>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    <div className="text-slate-700 text-lg font-medium">
                                        {form.scans}
                                    </div>
                                    <button className="border border-slate-300 text-slate-600 rounded-md px-3 py-1 text-sm flex items-center gap-1 hover:bg-slate-50">
                                        <FiSettings /> Settings
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-3 mt-6 text-slate-500">
                            <button>{"«"}</button>
                            <button>{"‹"}</button>
                            <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
                                1
                            </div>
                            <button>{"›"}</button>
                            <button>{"»"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
