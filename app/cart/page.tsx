import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb"
import { CartData } from "@/interfaces/interfaces"
import CartDetails from "@/sections/CartDetails/CartDetails"
import CartProcess from "@/sections/CartProcess/CartProcess"
import { serverApi } from "@/services/serverApi"



export default async function page() {
    const { data: cart } = await serverApi<CartData>("cart")

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