"use client"
import { useState } from "react"
import { useTranslations } from 'next-intl';

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field"
import paymentOne from "@/assets/paycar.png"
import paymentTwo from "@/assets/visa.png"
import paymentThree from "@/assets/tabby.png"
import paymentFour from "@/assets/money.png"
import Image from "next/image"

type PaymentMethod = "online" | "wallet" | "cash"

type Props = {
    onChange: (method: PaymentMethod) => void
}

export default function PaymentMethods({ onChange }: Props) {
    const t = useTranslations('Checkout');

    const [selected, setSelected] = useState<PaymentMethod | null>(null)

    const methods: { key: PaymentMethod; label: string; images: string[] }[] = [
        { key: "online", label: t('cash_online_label'), images: [paymentTwo, paymentOne] },
        { key: "wallet", label: t('cash_wallet_label'), images: [paymentThree] },
        { key: "cash", label: t('cash_on_delivery_label'), images: [paymentFour] },
    ]


    const handleSelect = (key: PaymentMethod) => {
        setSelected(key)
        onChange(key)
    }

    return (
        <div className="flex flex-col gap-5 p-8 bg-[#F9F9F9]">
            <h3 className="text-2xl font-bold">{t('payment_method')}</h3>

            <div className="flex flex-col gap-4">
                {methods.map(({ key, label, images }) => (
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
                            <FieldContent>
                                <FieldTitle className="text-lg">{label}</FieldTitle>
                            </FieldContent>
                            <div className="flex items-center gap-3">
                                {images.map((img, i) => (
                                    <div key={i} className="bg-gray-200 px-4 py-2">
                                        <Image src={img} alt={key} width={40} height={40} className="w-14 h-8 object-contain" />
                                    </div>
                                ))}
                            </div>
                        </Field>
                    </FieldLabel>
                ))}
            </div>
        </div>
    )
}