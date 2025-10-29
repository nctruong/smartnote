"use client"

import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { GripHorizontal } from "lucide-react";

const FIELD_TYPES = [
    { type: "text", label: "Short Text", icon: "📝" },
    { type: "textarea", label: "Long Text", icon: "📄" },
    { type: "number", label: "Number", icon: "🔢" },
    { type: "date", label: "Calendar", icon: "📅" },
    { type: "time", label: "Time", icon: "⏰" },
    { type: "radio", label: "Single Option", icon: "🔘" },
    { type: "checkbox", label: "Check List", icon: "☑️" },
    { type: "select", label: "Multiple Select", icon: "📋" },
    { type: "signature", label: "Signature", icon: "✍️" },
    { type: "file", label: "Document", icon: "📎" },
    { type: "image", label: "Picture", icon: "🖼️" },
    { type: "video", label: "Video", icon: "🎥" },
    { type: "audio", label: "Audio", icon: "🔊" },
];

function DraggableField({ field }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: field.type,
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
            }}
            className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg shadow-sm cursor-grab"
        >
            <span>{field.icon}</span>
            <span>{field.label}</span>
        </div>
    );
}

function DroppableArea({ fields, onDrop }) {
    const { setNodeRef } = useDroppable({ id: "drop-zone" });

    return (
        <div
            ref={setNodeRef}
            className="min-h-[300px] border-2 border-dashed border-gray-400 rounded-lg p-4 bg-gray-50"
        >
            {fields.length === 0 && (
                <p className="text-gray-400 text-center">Drag fields here</p>
            )}
            {fields.map((f, idx) => (
                <PreviewField key={idx} field={f} />
            ))}
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

export default function FormBuilder() {
    const [fields, setFields] = useState([]);

    const handleDragEnd = (event) => {
        const droppedField = FIELD_TYPES.find((f) => f.type === event.active.id);
        if (droppedField) setFields((prev) => [...prev, droppedField]);
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex gap-6">
                <div className="w-1/3 space-y-3">
                    {FIELD_TYPES.map((field) => (
                        <DraggableField key={field.type} field={field} />
                    ))}
                </div>

                <div className="flex-1">
                    <DroppableArea fields={fields} onDrop={setFields} />
                </div>
            </div>
        </DndContext>
    );
}
