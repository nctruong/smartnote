"use client";

import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { useFormBuilderStore } from "@/app/store/formBuilderStore";

interface Field {
    id: string;
    type: string;
    label: string;
    placeholder: string;
}

const FIELD_TYPES = [
    "Name",
    "Short Text",
    "Long Text",
    "Email Address",
    "Mobile Number",
    "Number",
    "Single Option",
    "Multiple Option",
    "Signature",
];

export default function FormBuilderPage() {
    const { fields, addField } = useFormBuilderStore();
    const [activeId, setActiveId] = useState<string | null>(null);

    const handleDragEnd = (event: any) => {
        const { over, active } = event;
        if (over?.id === "canvas" && active?.id) {
            addField({
                id: `${active.id}-${Date.now()}`,
                type: active.id,
                label: active.id,
                placeholder: `Enter ${active.id}`,
            });
        }
        setActiveId(null);
    };

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={(e) => setActiveId(e.active.id)}>
            <div className="flex gap-6 p-8 bg-gray-100 min-h-screen text-gray-800">
                {/* Sidebar */}
                <div className="w-1/4 bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Common Fields</h2>
                    <div className="space-y-2">
                        {FIELD_TYPES.map((field) => (
                            <DraggableField key={field} id={field} />
                        ))}
                    </div>
                </div>

                {/* Canvas */}
                <FormCanvas />

                {/* Preview */}
                <div className="w-1/3 bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Preview</h2>
                    <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                        {fields.length === 0 ? (
                            <p className="text-gray-400 text-center py-10">Drag fields here to preview form</p>
                        ) : (
                            <form className="space-y-4">
                                {fields.map((f) => (
                                    <div key={f.id} className="flex flex-col">
                                        <label className="font-medium mb-1">{f.label}</label>
                                        <input
                                            type="text"
                                            className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder={f.placeholder}
                                        />
                                    </div>
                                ))}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </DndContext>
    );
}

function DraggableField({ id }: { id: string }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    const style = transform
        ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
        : undefined;

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-sm font-medium cursor-grab hover:bg-indigo-50 hover:border-indigo-400 transition-colors"
        >
            {id}
        </div>
    );
}

function FormCanvas() {
    const { fields } = useFormBuilderStore();
    const { setNodeRef } = useDroppable({ id: "canvas" });

    return (
        <div
            ref={setNodeRef}
            className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col"
        >
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Form Canvas</h2>
            <div className="flex-1 border border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
                {fields.length === 0 ? (
                    <p className="text-gray-400 text-center mt-12">Drag fields from left to start building</p>
                ) : (
                    <ul className="space-y-2">
                        {fields.map((f) => (
                            <li
                                key={f.id}
                                className="px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 text-sm"
                            >
                                {f.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
