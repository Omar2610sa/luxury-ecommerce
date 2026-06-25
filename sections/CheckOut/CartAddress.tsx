'use client'
import { EditIcon, Trash2Icon } from "lucide-react"
import { AddressDialog } from "../Address/AddressDialog"
import { Address, AddressData } from "@/interfaces/interfaces"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { apiClient } from "@/services/useApiClient"
import { useRouter } from "next/navigation"
import { SuccessAlert } from "@/components/Alert/SuccessAlert"
import { ErrorAlert } from "@/components/Alert/ErrorAlert"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field"
import { useTranslations } from 'next-intl';


type Props = {
    Address: Address[]
    onChange: (id: number) => void
    selected: number | null
}



export default function CartAddress({ Address, onChange, selected }: Props) {
    const t = useTranslations('Checkout');
    const [loadingId, setLoadingId] = useState<number | null>(null)

    const router = useRouter()


    const deleteAddress = async (itemId: number) => {
        if (loadingId) return
        setLoadingId(itemId)
        try {
            const response = await apiClient<{ status?: string; message?: string }>(`address/${itemId}`, {
                method: "DELETE",
            })
if (response?.status === "success") {
                SuccessAlert(t('address_deleted'))
                
                router.refresh()
} else {
                ErrorAlert(response?.message ?? t('error_generic'))
            }
} catch {
            ErrorAlert(t('error_server_connection'))
        } finally {
            setLoadingId(null)
        }
    }

    return (
        <div className="flex flex-col gap-5 p-8 bg-[#F9F9F9]">
            <h3 className="text-2xl font-bold">{t('shipping_address')}</h3>

            <div className="flex flex-col gap-4">
                {Address.map((ele) => (
                    <FieldLabel
                        key={ele.id}
                        className="p-5 border bg-white border-[#E1E1E1] cursor-pointer"
                        onClick={() => onChange(ele.id)}
                    >
                        <Field orientation="horizontal" className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <Checkbox
                                checked={selected === ele.id}
                                className="rounded-full size-6"
                                readOnly
                            />
                            <FieldContent>
                                <FieldTitle className="text-xl font-bold">{ele.first_name}</FieldTitle>
                                <p className="text-[#797979]">{ele.phone}</p>
                                <p className="text-[#797979]">{ele.street_address}</p>
                            </FieldContent>
                            <div className="flex items-center gap-2">
                                <Button type="button" variant="ghost">
                                    <span className="text-primary">{t('edit')}</span>
                                    <EditIcon className="text-primary size-6" />
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        deleteAddress(ele.id)
                                    }}
                                    disabled={loadingId === ele.id}
                                >
                                    <Trash2Icon className="size-7 text-red-600" />
                                </Button>
                            </div>
                        </Field>
                    </FieldLabel>
                ))}
            </div>
            <AddressDialog />
        </div>
    )
}