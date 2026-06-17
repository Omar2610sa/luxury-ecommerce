'use client'
import { EditIcon, Trash2Icon } from "lucide-react";
import { AddressDialog } from "../Address/AddressDialog";
import { AddressData } from "@/interfaces/interfaces";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { apiClient } from "@/services/useApiClient";
import { useRouter } from "next/navigation";
import { SuccessAlert } from "@/components/Alert/SuccessAlert";
import { ErrorAlert } from "@/components/Alert/ErrorAlert";

export default function CartAddress({ Address }: { Address: AddressData }) {
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
                SuccessAlert("تم حذف الموقع")
                router.refresh()
            } else {
                ErrorAlert(response?.message ?? "حدثت مشكلة")
            }
        } catch {
            ErrorAlert("حدثت مشكلة في الاتصال بالسيرفر")
        } finally {
            setLoadingId(null)
        }
    }
    return (
        <div className="flex flex-col gap-5 p-8 bg-[#F9F9F9]">
            <h3 className="text-2xl font-bold">
                عنوان الشحن
            </h3>

            <div className="flex flex-col gap-4">
                {
                    Address.map((ele, index) => {
                        return (
                            <div key={index} className="p-5 border bg-white border-[#E1E1E1] flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex flex-col items-center md:items-start gap-3">

                                    <h3 className="text-xl  font-bold">{ele?.first_name}</h3>
                                    <p className="text-[#797979]">{ele?.phone}</p>
                                    <p className="text-[#797979]">{ele?.street_address}</p>
                                    {/* {
                                        ele?.is_default && (
                                            <p className="text-xl font-bold">افتراضي</p>
                                        )
                                    } */}
                                </div>
                                <div className="flex items-center gap-2">

                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            variant="ghost">
                                            <span className="text-primary">حرر</span>
                                            <EditIcon className="text-primary size-6" />
                                        </Button>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => deleteAddress(ele.id)}
                                        disabled={loadingId === ele.id}
                                    >
                                        <Trash2Icon className="size-7 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                        )

                    })
                }
            </div>

            <AddressDialog />
        </div>
    )
}
