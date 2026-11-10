export type AuthDialogProps = {
    title: string,
    children: React.ReactNode,
    className?: string
}

export type AuthFieldProps = {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
    id: string;
}

