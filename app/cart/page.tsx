import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb"
import SecondButton from "@/components/Layout/SecondButton"
import { CartData } from "@/interfaces/interfaces"
import CartDetails from "@/sections/CartDetails/CartDetails"
import CartProcess from "@/sections/CartProcess/CartProcess"
import ForYouSection from "@/sections/ForYou/ForYou"
import { useApi } from "@/services/useApi"
import { LucideArrowLeft, } from "lucide-react"
import { cookies } from "next/headers"
import Image from "next/image"



export default async function page() {
    const token = (await cookies()).get("token_luxary")?.value
    const { data: cart } = await useApi<CartData>("cart", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    return (
        <div className="container flex flex-col gap-8"  >
            <BreadCrumb thirdLink="السلة" />
            <div className="grid md:grid-cols-2 gap-8 ">
                <CartDetails cart={cart} />
                <CartProcess cart={cart} />
            </div>
            {/* <ForYouSection title="موصى به لك" products={cart?.recommended_products ?? []} /> */}

        </div>
    )
}