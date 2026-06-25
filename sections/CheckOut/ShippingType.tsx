"use client"
import { useState } from "react"
import { useTranslations } from 'next-intl';

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field"

type ShippingType = "standard_shipping" | "express_shipping"

const methods: { key: ShippingType; labelKey: string; desKey: string }[] = [
    { key: "standard_shipping", labelKey: 'standard_shipping', desKey: 'standard_shipping_price' },
    { key: "express_shipping", labelKey: 'express_shipping', desKey: 'express_shipping_price' },
]



type Props = {
    onChange: (method: ShippingType) => void
}

export default function ShippingTypes({ onChange }: Props) {
    const t = useTranslations('Checkout');
    const [selected, setSelected] = useState<ShippingType | null>(null)


    const handleSelect = (key: ShippingType) => {
        setSelected(key)
        onChange(key)
    }

    return (
        <div className="flex flex-col gap-5 p-8 bg-[#F9F9F9]">
            <h3 className="text-2xl font-bold">{t('shipping_method')}</h3>

            <div className="flex flex-col gap-4">
                {methods.map(({ key, labelKey, desKey }) => (

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
                                <FieldTitle className="text-lg">{t(labelKey)}</FieldTitle>

                                <FieldDescription>
                                    {t(desKey)}

                                </FieldDescription>
                            </FieldContent>

                        </Field>
                    </FieldLabel>
                ))}
            </div>
        </div>
    )
}