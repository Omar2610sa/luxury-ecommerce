'use client'
import { useState } from "react"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import { ShoppingBasket } from "lucide-react"
import { SuccessAlert } from "@/components/Alert/SuccessAlert"

type Props = {
    productId: number
}

export default function AddToCartButton({ productId }: Props) {
    const [loading, setLoading] = useState(false)

    const addCart = async () => {
        if (loading) return
        setLoading(true)

        const token = Cookies.get("token_luxary")
        const guestToken = Cookies.get("guest_token")

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE}/api/client/cart`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Accept": "application/json", // ✅ ده اللي يحل المشكلة
                    },
                    body: JSON.stringify({
                        product_detail_id: productId,
                        quantity: 1,
                    }),
                }
            ).then((res) => res.json())

            if (response?.data) {
                SuccessAlert("تم إضافة المنتج إلى السلة بنجاح")
            }
        } catch (error) {
            console.error("Add to cart error:", error)
        } finally {
            setLoading(false)
        }
    }
    console.log("URL:", `${process.env.NEXT_PUBLIC_API_BASE}/api/client/cart`)
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