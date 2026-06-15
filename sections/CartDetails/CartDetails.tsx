'use client'
import { Cart } from "@/interfaces/interfaces"
import { Button } from "@/components/ui/button"
import { CheckCircle2Icon, MinusCircleIcon, PlusCircleIcon, Trash2Icon } from "lucide-react"
import Image from "next/image"
import Cookies from "js-cookie"
import { useState } from "react"
import { SuccessAlert } from "@/components/Alert/SuccessAlert"
import { useRouter } from "next/navigation"

export default function CartDetails({ cart }: { cart: Cart }) {
    const [loadingId, setLoadingId] = useState<number | null>(null)
    const router = useRouter()
    const deleteItem = async (itemId: number) => {
        if (loadingId) return
        setLoadingId(itemId)

        const token = Cookies.get("token_luxary")
        const guestToken = Cookies.get("guest_token")

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE}/api/client/delete_item/${itemId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),

                    },
                }
            ).then((res) => res.json())

            if (response) {
                SuccessAlert("تم حذف المنتج")
                router.refresh()
            } else {
                console.error("Delete failed:", response?.message)
            }
        } catch (error) {
            console.error("Delete item error:", error)
        } finally {
            setLoadingId(null)
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">
                    المنتجات المضافة
                </h3>
                <span className="text-2xl font-bold">
                    ({cart?.items?.length ?? 0})
                </span>
            </div>

            <div className="flex flex-col gap-4">
                {cart?.items?.map((ele, index) => (
                    <div key={index} className="p-5 border border-[#E1E1E1] flex  items-center gap-6">
                        <CheckCircle2Icon className="size-8" />

                        <div className="flex justify-between items-center">
                            <div className="flex flex-col md:flex-row items-center gap-5">
                                <Image
                                    src={ele?.images[0]?.media}
                                    alt={ele?.images[0]?.alt ?? ele?.title}
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                />
                                <div className="flex flex-col gap-3">
                                    <h3 className="font-medium">{ele?.title}</h3>
                                    <p className="text-[#797979]">اللون: {ele?.color}</p>
                                    <p className="text-2xl font-bold">EGY {ele?.price}</p>
                                </div>

                                <div className="flex flex-col items-center justify-center gap-4">
                                    <div className="flex justify-between items-center gap-4 p-3 bg-[#F5F5F5]">
                                        <PlusCircleIcon className="size-8" />
                                        <p className="font-bold text-2xl">{ele?.quantity}</p>
                                        <MinusCircleIcon className="size-8" />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => deleteItem(ele.product_cart_id)}
                                        disabled={loadingId === ele.product_cart_id}
                                    >
                                        <Trash2Icon className="size-8 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}