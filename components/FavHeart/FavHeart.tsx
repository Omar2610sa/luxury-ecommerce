'use client'
import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardAction } from "@/components/ui/card"
import Cookies from "js-cookie"
import { apiClient } from "@/services/useApiClient"
import { FavouriteStore } from "@/store/useFavouriteStore"
import { useRouter } from "next/navigation"

type Props = {
    productId: number
    isFav: boolean
}

export default function FavButton({ productId, isFav }: Props) {
    const [fav, setFav] = useState(isFav)
    const [loading, setLoading] = useState(false)
    const { increment, decrement } = FavouriteStore()
    const router = useRouter()
    const makeFav = async () => {
        if (loading) return
        setLoading(true)

        try {
            await apiClient<unknown>(`make_fave/${productId}`, {
                method: "GET",

            })
            const newFav = !fav
            setFav(newFav)
            newFav ? increment() : decrement()
            router.refresh()

        } catch (error) {
            console.error("Fav error:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <CardAction
            onClick={makeFav}
            className="">
            <Button
                variant="outline"
                className="bg-white rounded-full p-1.5 shadow"
                disabled={loading}
            >
                <Heart
                    className={`size-6 transition-colors ${fav ? "fill-red-500 text-red-500" : "text-gray-400"
                        }`}
                />
            </Button>
        </CardAction>
    )
}