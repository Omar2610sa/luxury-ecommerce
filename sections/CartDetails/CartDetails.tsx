'use client'
import { Cart } from "@/interfaces/interfaces"
import { Button } from "@/components/ui/button"
import { CheckCircle2Icon, MinusCircleIcon, PlusCircleIcon, Trash2Icon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { SuccessAlert } from "@/components/Alert/SuccessAlert"
import { useRouter } from "next/navigation"
import { apiClient } from "@/services/useApiClient"
import NoInfo from "@/components/NoInfo/NoInfo"


export default function CartDetails({ cart }: { cart: Cart }) {
    const [loadingId, setLoadingId] = useState<number | null>(null)
    const router = useRouter()
    const deleteItem = async (itemId: number) => {
        if (loadingId) return
        setLoadingId(itemId)

        try {
            const response = await apiClient<{ data?: unknown }>(`delete_item/${itemId}`, {
                method: "DELETE",
            })

            if (response) {
                SuccessAlert("تم حذف المنتج")
                router.refresh()
            } else {
                console.error("Delete failed:", response)
            }
        } catch (error) {
            console.error("Delete item error:", error)
        } finally {
            setLoadingId(null)
        }
    }
    const decreaseQuantity = async (itemId: number, newCount: number) => {
        if (loadingId) return
            setLoadingId(itemId)
        if (newCount < 1) return

            try {
                const response = await apiClient<{ data?: unknown }>(`update_count`, {
                    method: "POST",
                    body: {
                        cart_product_id: itemId,
                        count: newCount
                    }
                })

                if (response) {
                    router.refresh()
                } else {
                    console.error("Delete failed:", response)
                }
            } catch (error) {
                console.error("Delete item error:", error)
            } finally {
                setLoadingId(null)
            }
    }
    const increaceQuantity = async (itemId: number, newCount: number) => {
        if (loadingId) return
        setLoadingId(itemId)
        if (newCount < 1) return

        try {
            const response = await apiClient<{ data?: unknown }>(`update_count`, {
                method: "POST",
                body: {
                    cart_product_id: itemId,
                    count: newCount
                }
            })

            if (response) {
                router.refresh()
            } else {
                console.error("Delete failed:", response)
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
            {
                cart?.items && (

                    <div className="flex flex-col gap-4">
                        {cart?.items?.map((ele, index) => (
                            <div key={index} className="p-5 border border-[#E1E1E1] flex flex-col md:flex-row justify-between items-center gap-6">
                                <CheckCircle2Icon className="size-8 hidden md:block" />
                                        <Image
                                            src={ele?.images[0]?.media}
                                            alt={ele?.images[0]?.alt ?? ele?.title}
                                            width={80}
                                            height={80}
                                            className="object-contain"
                                        />
                                        <div className="flex flex-col items-center md:items-start gap-3">
                                            <h3 className="font-medium">{ele?.title}</h3>
                                            <p className="text-[#797979]">اللون: {ele?.color}</p>
                                            <p className="text-xl font-bold">{ele?.price} {ele?.currency} </p>
                                        </div>

                                <div className="flex justify-between items-center ">
                                    <div className="flex flex-col md:flex-row items-center gap-5">

                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <div className="flex justify-between items-center gap-4 p-1 bg-[#F5F5F5]">
                                                <Button
                                                    onClick={() => increaceQuantity(ele.product_cart_id, ele.quantity + 1)}
                                                    className="bg-transparent  hover:bg-transparent cursor-pointer">
                                                    <PlusCircleIcon className="size-6 text-black" />
                                                </Button>
                                                <p className="font-bold text-2xl">{ele?.quantity}</p>
                                                <Button
                                                    onClick={() => decreaseQuantity(ele.product_cart_id, ele.quantity - 1)}
                                                    disabled={ele.quantity === 1}
                                                    className="bg-transparent hover:bg-transparent cursor-pointer">
                                                    <MinusCircleIcon className="size-6 text-black" />
                                                </Button>
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
                )
            }
            {
                !cart?.items && (
                    <NoInfo title="لا يوجد منتجات مضافه الى السلة" />
                )
            }
        </div>
    )
}