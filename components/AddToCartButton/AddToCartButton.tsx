'use client'
import { useState } from "react"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import { ShoppingBasket } from "lucide-react"
import { SuccessAlert } from "@/components/Alert/SuccessAlert"
import { apiClient } from "@/services/useApiClient"
import { CartCount } from "@/store/useCountCartStore"
import { ErrorAlert } from "../Alert/ErrorAlert"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

type Props = {
    productId: number
}

export default function AddToCartButton({ productId }: Props) {
    const t = useTranslations('AddTOCart')
    const tMessgae = useTranslations('Alert messages')
    const [loading, setLoading] = useState(false)
    const { increment } = CartCount()
    const router = useRouter()
    const addCart = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await apiClient<{ data?: { product_detail_id: number, quantity: number }, status: string, message: string }>("cart", {
                method: "POST",
                body: {
                    product_detail_id: productId,
                    quantity: 1,
                },

            })

            if (response?.status === "success") {
                if (response?.data) {
                    increment()
                    SuccessAlert(tMessgae('addShopCard'))
                    setLoading(false)
                    router.refresh()
                }
            } else {
                ErrorAlert(response?.message ?? "حدثت مشكلة")
                setLoading(false)

            }
        } catch {
            ErrorAlert("حدثت مشكلة في الاتصال بالسيرفر")
            setLoading(false)

        }
    }
    return (
        <Button
            className="rounded-none w-fit py-6 px-10 gap-4 text-2xl flex items-center cursor-pointer"
            onClick={addCart}
            disabled={loading}
        >
            {loading ? t('loading') : t('add')}
            <ShoppingBasket className="size-6" />
        </Button>
    )
}