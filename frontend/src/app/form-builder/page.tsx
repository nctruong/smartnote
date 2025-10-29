"use client";

import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useFormBuilderStore } from "@/app/store/formBuilderStore";
import {
    User, Phone, Mail, Type, FileText, Calendar, Clock,
    ListChecks, List, CheckSquare, MapPin, Signature, Hash,
    Table, Volume2, File, Image, Video, Building2, VenetianMask, Layers
} from "lucide-react";
import { useState, useEffect } from "react";

export default function FormBuilderPage() {
    const { fields, addField } = useFormBuilderStore();
    const [activeId, setActiveId] = useState<string | null>(null);

    const handleDragEnd = (event: any) => {
        const { over, active } = event;
        if (over?.id === "canvas" && active?.id) {
            const fieldType = active.data?.current?.type || "text";
            addField({
                id: `${active.id}-${Date.now()}`,
                type: fieldType,
                label: active.id,
                placeholder: `Enter ${active.id}`,
            });
        }
        setActiveId(null);
    };

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            onDragStart={(e) => setActiveId(e.active.id)}
        >
            <div className="build-area flex gap-6 p-8 bg-gray-100 min-h-screen text-gray-800">
                {/* Sidebar */}
                <div className="draggable-fields w-1/3 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-8 overflow-y-auto">
                    <FieldSection
                        title="Basic Fields"
                        fields={[
                            { id: "Name", type: "text", icon: <User size={16} /> },
                            { id: "Address", type: "textarea", icon: <Building2 size={16} /> },
                            { id: "Mobile Number", type: "number", icon: <Phone size={16} /> },
                            { id: "Gender", type: "select", icon: <VenetianMask size={16} /> },
                            { id: "Email Address", type: "email", icon: <Mail size={16} /> },
                            { id: "Title", type: "text", icon: <Type size={16} /> },
                            { id: "Description", type: "textarea", icon: <FileText size={16} /> },
                            { id: "Calendar", type: "date", icon: <Calendar size={16} /> },
                            { id: "Time", type: "time", icon: <Clock size={16} /> },
                        ]}
                    />
                    <FieldSection
                        title="General Fields"
                        fields={[
                            { id: "Single Option", type: "radio", icon: <List size={16} /> },
                            { id: "Multiple Option", type: "select", icon: <CheckSquare size={16} /> },
                            { id: "Multiple-level Select", type: "select", icon: <Layers size={16} /> },
                            { id: "Check List", type: "checkbox", icon: <ListChecks size={16} /> },
                            { id: "Location", type: "map", icon: <MapPin size={16} /> },
                            { id: "Signature", type: "signature", icon: <Signature size={16} /> },
                            { id: "Number", type: "number", icon: <Hash size={16} /> },
                            { id: "Sheet", type: "table", icon: <Table size={16} /> },
                        ]}
                    />
                    <FieldSection
                        title="Multimedia Fields"
                        fields={[
                            { id: "Audio", type: "audio", icon: <Volume2 size={16} /> },
                            { id: "Document", type: "file", icon: <File size={16} /> },
                            { id: "Picture", type: "image", icon: <Image size={16} /> },
                            { id: "Video", type: "video", icon: <Video size={16} /> },
                        ]}
                    />
                </div>

                {/* Canvas */}
                <FormCanvas />

                {/* Preview */}
                <div className="w-1/3 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Preview</h2>
                    <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                        {fields.length === 0 ? (
                            <p className="text-gray-400 text-center py-10">
                                Drag fields here to preview form
                            </p>
                        ) : (
                            <form className="space-y-4">
                                {fields.map((f, idx) => (
                                    <PreviewField key={idx} field={f} />
                                ))}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </DndContext>
    );
}

function FieldSection({ title, fields }: { title: string; fields: any[] }) {
    return (
        <div>
            <h3 className="font-semibold mb-3 text-gray-700">{title}</h3>
            <div className="grid grid-cols-2 gap-2">
                {fields.map((f) => (
                    <DraggableField key={f.id} id={f.id} icon={f.icon} type={f.type} />
                ))}
            </div>
        </div>
    );
}

function DraggableField({ id, icon, type = "text" }: { id: string; icon: React.ReactNode; type?: string }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data: { type },
    });

    const style = transform
        ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
        : undefined;

    // ✅ add .dragging class manually
    // useEffect(() => {
    //     const el = document.querySelector(`[data-id="${id}"]`);
    //     if (!el) return;
    //
    //     const handleDragStart = () => el.classList.add("dragging");
    //     const handleDragEnd = () => { el.classList.remove("dragging"); alert('up')}
    //     el.addEventListener("mousedown", handleDragStart);
    //     el.addEventListener("mouseup", handleDragEnd);
    //     return () => {
    //         el.removeEventListener("mousedown", handleDragStart);
    //         el.removeEventListener("mouseup", handleDragEnd);
    //     };
    // }, [id]);

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            data-id={id}
            style={style}
            className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm font-medium cursor-grab hover:bg-indigo-50 hover:border-indigo-400 transition-colors draggable-field"
        >
            {icon}
            <span>{id}</span>
        </div>
    );
}

function FormCanvas() {
    const { fields } = useFormBuilderStore();
    const { setNodeRef } = useDroppable({ id: "canvas" });

    return (
        <div
            ref={setNodeRef}
            className="form-canvas flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col relative z-0"
        >
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Form Canvas</h2>
            <div className="flex-1 border border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
                {fields.length === 0 ? (
                    <p className="text-gray-400 text-center mt-12">
                        Drag fields from left to start building
                    </p>
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

function PreviewField({ field }) {
    const [label, setLabel] = useState(field.label);

    const renderField = () => {
        switch (field.type) {
            case "text":
                return <input placeholder={label} className="border rounded p-2 w-full" />;
            case "textarea":
                return <textarea placeholder={label} className="border rounded p-2 w-full" />;
            case "number":
                return <input type="number" placeholder={label} className="border rounded p-2 w-full" />;
            case "date":
                return <input type="date" className="border rounded p-2 w-full" />;
            case "time":
                return <input type="time" className="border rounded p-2 w-full" />;
            case "radio":
                return <input type="radio" />;
            case "checkbox":
                return <input type="checkbox" />;
            case "select":
                return (
                    <select className="border rounded p-2 w-full">
                        <option>{label}</option>
                    </select>
                );
            case "signature":
                return <div className="border rounded p-4 text-gray-400 text-center">Signature Pad</div>;
            case "file":
                return <input type="file" className="border rounded p-2 w-full" />;
            case "image":
                return <input type="file" accept="image/*" className="border rounded p-2 w-full" />;
            case "video":
                return <input type="file" accept="video/*" className="border rounded p-2 w-full" />;
            case "audio":
                return <input type="file" accept="audio/*" className="border rounded p-2 w-full" />;
            default:
                return null;
        }
    };

    return (
        <div className="border p-3 rounded-md mb-2 bg-white">
            <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="font-semibold mb-1 w-full border-b focus:outline-none"
            />
            {renderField()}
        </div>
    );
}

/* ✅ Add this CSS to globals.css or tailwind.css */
`
.dragging {
  position: absolute !important;
  z-index: 9999 !important;
  pointer-events: none;
  opacity: 0.8;
}
.draggable-field {
  transition: all 0.15s ease-in-out;
}
`
