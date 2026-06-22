"use client"
import { useState } from "react"
import PaymentMethods from "@/sections/CheckOut/PaymentMethods"
import OrderProcess from "@/sections/CheckOut/OrderProcess"
import CartAddress from "@/sections/CheckOut/CartAddress"
import OrderDetails from "@/sections/CheckOut/OrderDetails"
import { AddressData, CartData } from "@/interfaces/interfaces"

type PaymentMethod = "online" | "wallet" | "cash"

type Props = {
    cart: CartData
    Address: AddressData
}

export default function CheckoutClient({ cart, Address }: Props) {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-5">
                <CartAddress Address={Address} />
                <OrderDetails cart={cart} />
                <PaymentMethods onChange={setPaymentMethod} />
            </div>
            <OrderProcess cart={cart} paymentMethod={paymentMethod} />
        </div>
    )
}