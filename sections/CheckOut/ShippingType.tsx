"use client"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field"

type ShippingType = "standard_shipping" | "express_shipping"

const methods: { key: ShippingType; label: string; des: string }[] = [
    { key: "standard_shipping", label: "شحن عادي", des: "+5 جنية" },
    { key: "express_shipping", label: "شحن سريع", des: "+30 جنية" },
]

type Props = {
    onChange: (method: ShippingType) => void
}

export default function ShippingTypes({ onChange }: Props) {
    const [selected, setSelected] = useState<ShippingType | null>(null)

    const handleSelect = (key: ShippingType) => {
        setSelected(key)
        onChange(key)
    }

    return (
        <div className="flex flex-col gap-5 p-8 bg-[#F9F9F9]">
            <h3 className="text-2xl font-bold">طريقة الشحن</h3>
            <div className="flex flex-col gap-4">
                {methods.map(({ key, label, des }) => (
                    <FieldLabel
                        key={key}
                        className="p-5 border bg-white border-[#E1E1E1] cursor-pointer"
                        onClick={() => handleSelect(key)}
                    >
                        <Field orientation="horizontal" className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <Checkbox
                                checked={selected === key}
                                className="rounded-full size-6"
                                readOnly
                            />
                            <FieldContent className="flex flex-col items-start">
                                <FieldTitle className="text-lg">{label}</FieldTitle>
                                <FieldDescription>
                                    {
                                        des
                                    }
                                </FieldDescription>
                            </FieldContent>

                        </Field>
                    </FieldLabel>
                ))}
            </div>
        </div>
    )
}