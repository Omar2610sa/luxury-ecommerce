"use client"
import { useState } from "react"
import { useTranslations } from 'next-intl';

import { useRouter } from "next/navigation"
import { apiClient } from "@/services/useApiClient"
import { SuccessAlert } from "@/components/Alert/SuccessAlert"
import { ErrorAlert } from "@/components/Alert/ErrorAlert"
import PaymentMethods from "@/sections/CheckOut/PaymentMethods"
import OrderProcess from "@/sections/CheckOut/OrderProcess"
import CartAddress from "@/sections/CheckOut/CartAddress"
import OrderDetails from "@/sections/CheckOut/OrderDetails"
import { Address, Cart } from "@/interfaces/interfaces"
import ShippingTypes from "../CheckOut/ShippingType"

type PaymentMethod = "online" | "wallet" | "cash"
type ShippingType = "standard_shipping" | "express_shipping"

type Props = {
    cart: Cart
    Address: Address[]
}

export default function CheckoutClient({ cart, Address }: Props) {
    const t = useTranslations('Checkout');
    const router = useRouter()

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
    const [shippingType, setShippingType] = useState<ShippingType | null>(null)
    const [addressId, setAddressId] = useState<number | null>(
        Address.find(addr => addr.is_default)?.id ?? null
    )
    const handleOrder = async () => {
        if (!paymentMethod) {
            ErrorAlert(t('choose_payment_method'))

            return
        }
        if (!addressId) {
            ErrorAlert(t('choose_shipping_address'))

            return
        }
        if (!shippingType) {
            ErrorAlert(t('choose_shipping_method'))

            return
        }

        const form = new FormData()
        form.append("address_id", addressId.toString())
        form.append("payment_type", paymentMethod)
        form.append("shipping_type", shippingType)


        cart.items.forEach((item, index) => {
            form.append(`product_cart_ids[${index}]`, item.product_cart_id.toString())
        })

        try {
            const response = await apiClient<{ status?: string; message?: string }>("orders", {
                method: "POST",
                // apiClient expects a Record<string, unknown> for body; cast FormData accordingly
                body: form as unknown as Record<string, unknown>,
            })

            if (response?.status === "success") {
                SuccessAlert(t('order_confirmed'))

                router.push("/")
            } else {
                ErrorAlert(response?.message ?? t('error_generic'))
            }
        } catch {
            ErrorAlert(t('error_server_connection'))
        }
    }


    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-5">
                <CartAddress
                    Address={Address}
                    onChange={setAddressId}
                    selected={addressId}
                />
                <OrderDetails cart={cart} />
                <PaymentMethods onChange={setPaymentMethod} />
                <ShippingTypes onChange={setShippingType} />
            </div>
            <OrderProcess cart={cart} onOrder={handleOrder} />
        </div>
    )
}