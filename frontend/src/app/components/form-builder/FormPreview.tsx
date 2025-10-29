// components/form-builder/FormPreview.tsx
"use client";
import React from "react";
import { useBuilderStore } from "../../store/formBuilderStore";
import { FormField } from "../../types/field";

export default function FormPreview() {
    const fields = useBuilderStore((s) => s.fields);
    const updateField = useBuilderStore((s) => s.updateField);

    if (!fields) return null;

    return (
        <div className="p-4">
            <h3 className="font-semibold mb-3">Preview</h3>
            <div className="w-full border rounded-lg overflow-hidden bg-white">
                <div className="bg-blue-600 text-white text-center py-4 font-semibold">Form Preview</div>
                <div className="p-6 space-y-4">
                    {fields.map((f) => (
                        <PreviewField key={f.id} field={f} onChange={(patch) => updateField(f.id, patch)} />
                    ))}

                    {fields.length > 0 && (
                        <div>
                            <button className="w-full bg-blue-600 text-white py-2 rounded">Submit</button>
                        </div>
                    )}
                    {fields.length === 0 && <div className="text-sm text-gray-500">Form is empty</div>}
                </div>
            </div>
        </div>
    );
}

function PreviewField({ field, onChange }: { field: FormField; onChange: (patch: Partial<FormField>) => void }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">
                <input
                    className="border rounded px-2 py-1 w-full text-sm mb-1"
                    value={field.label}
                    onChange={(e) => onChange({ label: e.target.value })}
                />
            </label>

            {field.type === "name" ? (
                <div className="flex gap-2">
                    <input className="border rounded px-3 py-2 w-1/2 text-sm" placeholder={field.placeholder || "First Name"} onChange={() => {}} />
                    <input className="border rounded px-3 py-2 w-1/2 text-sm" placeholder={field.placeholder || "Last Name"} onChange={() => {}} />
                </div>
            ) : field.type === "textarea" ? (
                <textarea className="border rounded px-3 py-2 w-full text-sm" placeholder={field.placeholder || "Your answer"} />
            ) : (
                <input
                    className="border rounded px-3 py-2 w-full text-sm"
                    placeholder={field.placeholder || `Enter ${field.label}`}
                />
            )}

            {/* placeholder edit */}
            <div className="mt-2 text-xs text-gray-500 flex gap-2 items-center">
                <span>Placeholder:</span>
                <input
                    className="border rounded px-2 py-1 text-xs"
                    value={field.placeholder || ""}
                    onChange={(e) => onChange({ placeholder: e.target.value })}
                />
            </div>
        </div>
    );
}
