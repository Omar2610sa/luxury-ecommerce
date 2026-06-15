'use client'
import { useState } from "react"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import { ShoppingBasket } from "lucide-react"
import { SuccessAlert } from "@/components/Alert/SuccessAlert"
import { apiClient } from "@/services/useApiClient"

    type Props = {
        productId: number
    }

export default function AddToCartButton({ productId }: Props) {
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
        <Button
            className="rounded-none w-fit py-6 px-10 gap-4 text-2xl flex items-center cursor-pointer"
            onClick={addCart}
            disabled={loading}
        >
            {loading ? "جاري الإضافة..." : "اضف الى السلة"}
            <ShoppingBasket className="size-6" />
        </Button>
    )
}