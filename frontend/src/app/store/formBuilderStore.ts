import { create } from "zustand";

interface Field {
    id: string;
    type: string;
    label: string;
    placeholder: string;
}

interface FormBuilderState {
    fields: Field[];
    addField: (field: Field) => void;
}

export const useFormBuilderStore = create<FormBuilderState>((set) => ({
    fields: [],
    addField: (field) => set((state) => ({ fields: [...state.fields, field] })),
}));
