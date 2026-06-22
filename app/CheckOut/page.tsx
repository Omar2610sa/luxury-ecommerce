import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb";
import { Address, CartData } from "@/interfaces/interfaces";
import CheckoutClient from "@/sections/CheckoutClient/CheckoutClient";

import { serverApi } from "@/services/serverApi";

export default async function page() {
    const { data: addresses } = await serverApi<{ data: Address[] }>(`address`)
    const { data: cart } = await serverApi<CartData>("cart")

    return (
        <div className="container flex flex-col gap-8">
            <BreadCrumb secondLink="تأكيد الطلب" thirdLink="الدفع" />
            <CheckoutClient cart={cart} Address={addresses} />
        </div>
    )
}
