"use client"

import { SuccessAlert } from "../Alert/SuccessAlert"
import { useState } from "react"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"
import { apiClient } from "@/services/useApiClient"

type Props = {
    productId: number
}

export default function AddShopCard({ productId }: Props) {
    const [loading, setLoading] = useState(false)

    const addCart = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await apiClient<{ data?: { product_detail_id: number, quantity: number } }>("cart", {
                method: "POST",
                body: {
                    product_detail_id: productId,
                    quantity: 1,
                },

            })

            if (response?.data) {
                SuccessAlert("تم إضافة المنتج إلى السلة بنجاح")
            }
        } catch (error) {
            console.error("Add to cart error:", error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <Button size="icon"
            className="rounded-full bg-yellow-200/40 w-10 h-10 text-[#9F6913] "
            onClick={addCart}
            disabled={loading}
        >
            <ShoppingCart className="size-5" />
        </Button>
    )
}
