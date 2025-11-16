"use client";

import { DndContext, useDraggable, useDroppable, DragOverlay } from "@dnd-kit/core";
import { useFormBuilderStore } from "@/app/store/formBuilderStore";
import {
    User, Phone, Mail, Type, FileText, Calendar, Clock,
    ListChecks, List, CheckSquare, MapPin, Signature, Hash,
    Table, Volume2, File, Image, Video, Building2, VenetianMask, Layers
} from "lucide-react";
import { QrCode, Save, Play } from "lucide-react";

import { useState, useEffect } from "react";
import EditModal from './editModal'
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
interface Field {
    id: string;
    type?: string;
    label?: string;
    icon?: string;
    [key: string]: any;
}
export default function FormBuilderPage() {
    // const { fields, addField } = useFormBuilderStore();
    const [activeId, setActiveId] = useState<string | null | number>(null);
    const [fields, setFields] = useState<Field[]>([]);
    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        // Only drop if it's over the canvas
        if (!over || over.id !== "drop-zone") return;

        // Read custom data from draggable
        const type = active.data?.current?.type;

        const fieldDef = FIELD_TYPES.find((f) => f.type === type);
        if (fieldDef) {
            setFields((prev) => [...prev, { ...fieldDef, id: `${type}-${Date.now()}` }]);
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
                <div className="draggable-fields w-1/3 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-8 ">
                    <FieldSection
                        title="Basic Fields"
                        fields={[
                            { id: "Name", type: "text", icon: <User size={18} strokeWidth={3} /> },
                            { id: "Address", type: "textarea", icon: <Building2 size={18} strokeWidth={3} /> },
                            { id: "Mobile Number", type: "number", icon: <Phone size={18} strokeWidth={3} /> },
                            { id: "Gender", type: "select", icon: <VenetianMask size={18} strokeWidth={3} /> },
                            { id: "Email Address", type: "email", icon: <Mail size={18} strokeWidth={3} /> },
                            { id: "Title", type: "text", icon: <Type size={18} strokeWidth={3} /> },
                            { id: "Description", type: "textarea", icon: <FileText size={18} strokeWidth={3} /> },
                            { id: "Calendar", type: "date", icon: <Calendar size={18} strokeWidth={3} /> },
                            { id: "Time", type: "time", icon: <Clock size={18}  strokeWidth={3} /> },
                        ]}
                    />
                    <FieldSection
                        title="General Fields"
                        fields={[
                            { id: "Single Option", type: "radio", icon: <List size={18} strokeWidth={3}/> },
                            { id: "Multiple Option", type: "select", icon: <CheckSquare size={18} strokeWidth={3}/> },
                            { id: "Multiple-level Select", type: "select", icon: <Layers size={18} strokeWidth={3}/> },
                            { id: "Check List", type: "checkbox", icon: <ListChecks size={18} strokeWidth={3}/> },
                            { id: "Location", type: "map", icon: <MapPin size={18} strokeWidth={3}/> },
                            { id: "Signature", type: "signature", icon: <Signature size={18} strokeWidth={3}/> },
                            { id: "Number", type: "number", icon: <Hash size={18} strokeWidth={3}/> },
                            { id: "Sheet", type: "table", icon: <Table size={18} strokeWidth={3}/> },
                        ]}
                    />
                    <FieldSection
                        title="Multimedia Fields"
                        fields={[
                            { id: "Audio", type: "audio", icon: <Volume2 size={18} strokeWidth={3}/> },
                            { id: "Document", type: "file", icon: <File size={18} strokeWidth={3}/> },
                            { id: "Picture", type: "image", icon: <Image size={18} strokeWidth={3}/> },
                            { id: "Video", type: "video", icon: <Video size={18} strokeWidth={3}/> },
                        ]}
                    />

                    <hr/>
                    <div className="flex flex-col items-start gap-3 w-full max-w-sm">
                        {/* Generate QR Code button */}
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-lg py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm">
                            <QrCode size={20} className="text-white" />
                            Generate QR Code
                        </button>

                        {/* Create Form + How it works */}
                        <div className="flex items-center justify-between w-full bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-2 text-gray-800 font-medium text-base">
                                <Save size={20} className="text-gray-700" />
                                Create Form
                            </div>
                            <a
                                href="#"
                                className="flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700"
                            >
                                How it works <Play size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Canvas */}
                {/*<FormCanvas />*/}

                {/* Preview */}
                <div className="w-2/3 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Preview</h2>
                    <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                        <DroppableArea fields={fields} onDrop={setFields} onFieldsChange={setFields} />
                    </div>
                </div>
            </div>
            <DragOverlay>
                {activeId ? (
                    <div className="flex items-center gap-2 px-3 py-2 border border-indigo-300 bg-indigo-50 rounded-md shadow-md text-indigo-700">
                        {FIELD_TYPES.find((f) => f.type === activeId)?.icon || "📦"}
                        <span className="text-sm font-medium">{activeId}</span>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
interface DroppableAreaProps {
    fields: Field[];
    onDrop?: (field: Field[]) => void;
    onFieldsChange: (updatedFields: Field[]) => void;
}

function DroppableArea({ fields, onDrop, onFieldsChange }: DroppableAreaProps) {
    const { setNodeRef } = useDroppable({ id: "drop-zone" });
    const [editingField, setEditingField] = useState<Field | null>(null);

    const handleSaveField = (field: Field) => {
        const updated = fields.map((f) => (f.id === field.id ? field : f));
        onFieldsChange(updated);
        setEditingField(null);
    };

    const handleDeleteField = (id: string) => {
        const updated = fields.filter((f) => f.id !== id);
        onFieldsChange(updated);
    };

    const test = () => { alert('hello')}

    return (
        <div
            ref={setNodeRef}
            className="min-h-[900px] border-2 border-dashed border-gray-400 rounded-lg p-4 bg-gray-50"
        >
            {fields.length === 0 && (
                <p className="text-gray-400 text-center">Drag fields here</p>
            )}

            {fields.map((f) => (
                <PreviewField
                    key={f.id}
                    field={f}
                    onEdit={() => setEditingField(f)}
                    onDelete={() => handleDeleteField(f.id)}
                />
            ))}

            {editingField && (
                <EditModal
                    field={editingField}
                    onSave={handleSaveField}
                    onClose={() => setEditingField(null)}
                />
            )}
        </div>
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

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            data-id={id}
            style={style}
            className="flex items-center gap-2 text-lg w-full bg-gray-100 py-[10px] px-3 text-left text-slate-600 flex items-center cursor-pointer hover:bg-gray-200 hover:scale-[1.03] hover:shadow-md rounded-md"
        >
            <div className="self-center w-5 h-5 mr-3 flex-shrink-0">{icon}</div>
            <span>{id}</span>
        </div>
    );
}
interface PreviewFieldProps {
    key: string;
    field: Field;
    onEdit: (field: Field) => void;
    onDelete: (id: string) => void;
}
function PreviewField({ key, field, onEdit, onDelete }: PreviewFieldProps) {
    const [label, setLabel] = useState(field.label);
    const [hovered, setHovered] = useState(false);
    const renderField = () => {
        switch (field.type) {
            case "text":
                return <input placeholder={label} className="border border-gray-300 rounded p-2 w-full" />;
            case "textarea":
                return <textarea placeholder={label} className="border border-gray-300 rounded p-2 w-full" />;
            case "number":
                return <input type="number" placeholder={label} className="border border-gray-300 rounded p-2 w-full" />;
            case "date":
                return <input type="date" className="border border-gray-300 rounded p-2 w-full" />;
            case "time":
                return <input type="time" className="border border-gray-300 rounded p-2 w-full" />;
            case "radio":
                return (
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
                            <input type="radio" name={label} />
                            <span className="font-medium text-gray-700">Option 1</span>
                        </label>
                        <label className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
                            <input type="radio" name={label} />
                            <span className="font-medium text-gray-700">Option 2</span>
                        </label>
                    </div>
                );
            case "checkbox":
                return <input type="checkbox" />;
            case "select":
                return (
                    <select className="border border-gray-300 rounded p-2 w-full">
                        <option>{label}</option>
                    </select>
                );
            case "signature":
                return <div className="border border-gray-300 rounded p-4 text-gray-400 text-center">Signature Pad</div>;
            case "file":
                return <input type="file" className="border border-gray-300 rounded p-2 w-full" />;
            case "image":
                return <input type="file" accept="image/*" className="border border-gray-300 rounded p-2 w-full" />;
            case "video":
                return <input type="file" accept="video/*" className="border border-gray-300 rounded p-2 w-full" />;
            case "audio":
                return <input type="file" accept="audio/*" className="border border-gray-300 rounded p-2 w-full" />;
            default:
                return null;
        }
    };

    return (
        <div
            className={`border-2 rounded-md mb-2 bg-white relative transition-all ${
                hovered ? "border-blue-400 border-dashed" : "border-gray-200"
            }`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Header */}
            <div className="flex justify-between items-center p-2">
                <input
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="font-semibold border-none focus:outline-none w-full"
                />
                <div className="cursor-move opacity-70 hover:opacity-100">
                    ⋮⋮
                </div>
            </div>

            {/* Field body */}
            <div className="px-3 pb-3">{renderField()}</div>

            {/* Hover toolbar */}
            {hovered && (
                <div className="flex justify-around items-center border-t border-blue-200 bg-blue-50 py-2 text-blue-600 text-sm rounded-b-md">
                    <button className="flex items-center gap-1 hover:text-blue-700">
                        <svg width="16" height="16" fill="currentColor"><path d="M3 3h10v10H3z"/></svg>
                        Clone
                    </button>
                    <button onClick={(e) => {onEdit(field)}} className="flex items-center gap-1 hover:text-blue-700">
                        <svg width="16" height="16" fill="currentColor"><path d="M2 2h12v12H2z"/></svg>
                        Edit
                    </button>
                    <button onClick={(e) => {
                        if (field.id !== undefined) { 
                            onDelete(field.id) 
                        }
                    }} className="flex items-center gap-1 hover:text-blue-700">
                        <svg width="16" height="16" fill="currentColor"><path d="M3 6h10M6 6v6M10 6v6"/></svg>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

