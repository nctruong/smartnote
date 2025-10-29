// types/field.ts
export type FieldType =
    | "name"
    | "text"
    | "email"
    | "phone"
    | "date"
    | "time"
    | "textarea"
    | "number"
    | "single_option"
    | "multiple_option"
    | "signature"
    ;

export interface FormField {
    id: string;
    type: FieldType;
    label: string;
    placeholder?: string;
    options?: string[]; // for option types
}
