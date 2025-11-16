import { useState } from "react";

type Option = {
    label: string;
};

interface Field {
    id: string;
    type?: string;
    label?: string;
    icon?: string;
    [key: string]: any;
}

type EditModalProps = {
    field: Field | null;
    onSave: (field: Field) => void;
    onClose: () => void;
};

const EditModal: React.FC<EditModalProps> = ({ field, onSave, onClose }) => {
    const [localField, setLocalField] = useState<Field | null>(field);

    const updateOption = (index: number, value: string) => {
        if (localField != null) {
            const updated = [...localField.options];
            updated[index].label = value;
            setLocalField({ ...localField, options: updated });
        }
        
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-[500px] p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">Single option</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black">
                        ✕
                    </button>
                </div>

                <label className="block font-medium mb-1">Label</label>
                <input
                    className="w-full border rounded-lg p-2 mb-4"
                    value={localField?.label}
                    onChange={(e) => {
                        if (localField !== null) {
                            setLocalField({...localField, label: e.target.value})
                        }
                    }
                    }
                />

                <div className="mb-4">
                    <div className="font-medium mb-1">Options</div>
                    {/*{localField && localField.options.map((opt: any, i: any) => (*/}
                    {/*    <input*/}
                    {/*        key={i}*/}
                    {/*        value={opt.label}*/}
                    {/*        onChange={(e) => updateOption(i, e.target.value)}*/}
                    {/*        className="w-full border rounded-lg p-2 mb-2"*/}
                    {/*    />*/}
                    {/*))}*/}

                    <button
                        type="button"
                        className="text-blue-600 text-sm"
                        onClick={() => {
                            if (localField !== null) {
                                setLocalField({
                                    ...localField,
                                    options: [...localField.options, {label: "New option"}],
                                })
                            }
                        }
                        }
                    >
                        + Add item
                    </button>
                </div>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-3 py-1 border rounded">
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            if (localField !== null) {
                                onSave(localField)
                            }
                        }} className="px-3 py-1 bg-blue-600 text-white rounded">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
