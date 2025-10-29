// components/form-builder/FormCanvas.tsx
"use client";
import React from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragOverEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
    useSortable,
    defaultAnimateLayoutChanges,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBuilderStore } from "../../store/formBuilderStore";
import { v4 as uuidv4 } from "uuid";
import { FormField } from "../../types/field";

export default function FormCanvas() {
    const fields = useBuilderStore((s) => s.fields);
    const addField = useBuilderStore((s) => s.addField);
    const moveField = useBuilderStore((s) => s.moveField);
    const removeField = useBuilderStore((s) => s.removeField);

    const sensors = useSensors(useSensor(PointerSensor));

    function handleDragEnd(e: DragEndEvent) {
        const { active, over } = e;
        // If dragging a palette item: active.id startsWith('palette-') with data
        // If over is null -> do nothing
        if (!over) return;

        // If dropping onto canvas container (over.id === 'canvas'), create new item at end
        if (String(over.id) === "canvas" && String(active.id).startsWith("palette-")) {
            const t = active.data?.current?.type as FormField["type"] | undefined;
            const newField: FormField = {
                id: uuidv4(),
                type: t || "text",
                label: capitalizeLabel(t || "Short Text"),
                placeholder: "",
            };
            addField(newField);
            return;
        }

        // If reorder inside canvas: active.id and over.id are item ids
        if (String(active.id).startsWith("item-") && String(over.id).startsWith("item-")) {
            const fromIndex = fields.findIndex((f) => `item-${f.id}` === active.id);
            const toIndex = fields.findIndex((f) => `item-${f.id}` === over.id);
            if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
                moveField(fromIndex, toIndex);
            }
            return;
        }

        // If dragging palette item and dropping on an existing item -> insert before that item
        if (String(active.id).startsWith("palette-") && String(over.id).startsWith("item-")) {
            const t = active.data?.current?.type as FormField["type"] | undefined;
            const idx = fields.findIndex((f) => `item-${f.id}` === over.id);
            const newField: FormField = {
                id: uuidv4(),
                type: t || "text",
                label: capitalizeLabel(t || "Short Text"),
                placeholder: "",
            };
            addField(newField, idx);
            return;
        }
    }

    function handleDragOver(e: DragOverEvent) {
        // optional: highlight insert position, omitted for brevity
    }

    return (
        <div className="p-4">
            <h3 className="font-semibold mb-3">Form Canvas</h3>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
                <div
                    id="canvas"
                    className="min-h-[420px] border rounded p-3 bg-gray-50"
                    // droppable area is the container itself; @dnd-kit will use over.id === 'canvas'
                >
                    <SortableContext items={fields.map((f) => `item-${f.id}`)} strategy={verticalListSortingStrategy}>
                        {fields.length === 0 && <div className="text-sm text-gray-500 p-8 text-center">Kéo field từ trái vào để tạo form</div>}
                        {fields.map((f, idx) => (
                            <SortableField key={f.id} field={f} index={idx} onRemove={() => removeField(f.id)} />
                        ))}
                    </SortableContext>
                </div>
            </DndContext>
        </div>
    );
}

function SortableField({ field, index, onRemove }: { field: FormField; index: number; onRemove: () => void }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: `item-${field.id}`,
        animateLayoutChanges: (args) => defaultAnimateLayoutChanges(args),
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.8 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className="bg-white border rounded p-3 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div {...attributes} {...listeners} className="cursor-grab p-1 text-gray-500">
                    ≡
                </div>
                <div>
                    <div className="font-medium text-sm">{field.label}</div>
                    <div className="text-xs text-gray-500">{field.type}</div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button onClick={onRemove} className="text-red-500 text-sm px-2 py-1 border rounded">
                    Delete
                </button>
            </div>
        </div>
    );
}

function capitalizeLabel(t: string) {
    if (!t) return t;
    return t
        .split("_")
        .map((p) => p[0].toUpperCase() + p.slice(1))
        .join(" ");
}
