import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthFieldProps } from "../types";

export default function AuthField({
    label,
    id,
    name,
    type,
    placeholder,
    value,
    handleChange,
    handleBlur,
    error
}: AuthFieldProps) {
    return (
        <Field>
            <Label htmlFor="identifier">
                {label}
            </Label>
            <Input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">
                    {error}
                </p>
            )}
        </Field>
    )
}
