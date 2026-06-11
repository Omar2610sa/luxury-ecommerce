'use client'
import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardAction } from "@/components/ui/card"
import Cookies from "js-cookie"

type Props = {
    productId: number
    isFav: boolean
}

export default function FavButton({ productId, isFav }: Props) {
    const [fav, setFav] = useState(isFav)
    const [loading, setLoading] = useState(false)


    const token = Cookies.get("token_luxary")
    const makeFav = async () => {
        if (loading) return
        setLoading(true)
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE}/api/client/make_fave/${productId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            setFav(prev => !prev)
        } catch (error) {
            console.error("Fav error:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <CardAction className="absolute z-30 top-3 right-3">
            <Button
                onClick={makeFav}
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