// components/form-builder/FieldPalette.tsx
"use client";
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import { FormField } from "../../types/field";

const PALETTE: { type: FormField["type"]; label: string }[] = [
    { type: "name", label: "Name" },
    { type: "text", label: "Short Text" },
    { type: "textarea", label: "Long Text" },
    { type: "email", label: "Email Address" },
    { type: "phone", label: "Mobile Number" },
    { type: "date", label: "Calendar" },
    { type: "time", label: "Time" },
    { type: "number", label: "Number" },
    { type: "single_option", label: "Single option" },
    { type: "multiple_option", label: "Multiple option" },
    { type: "signature", label: "Signature" },
];

export default function FieldPalette() {
    return (
        <div className="p-4">
            <h3 className="font-semibold mb-3">Common Fields</h3>
            <div className="space-y-2">
                {PALETTE.map((p) => (
                    <DraggablePaletteItem key={p.type} type={p.type} label={p.label} />
                ))}
            </div>
        </div>
    );
}

function DraggablePaletteItem({ type, label }: { type: FormField["type"]; label: string }) {
    // We will drag with a custom payload set in dataTransfer via dnd-kit sensors
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: `palette-${type}-${Math.random()}`,
        data: { type, templateId: uuidv4() },
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="cursor-grab select-none border rounded px-3 py-2 bg-white hover:shadow-sm"
            role="button"
            aria-label={`Drag ${label}`}
            title="Drag to canvas"
        >
            <div className="text-sm">{label}</div>
        </div>
    );
}
