import { Button } from "@/components/ui/button"
import { Cart } from "@/interfaces/interfaces"
import { useTranslations } from "next-intl"

type Props = {
    cart: Cart
    onOrder: () => void
}

export default function OrderProcess({ cart, onOrder }: Props) {
    const t = useTranslations('Checkout');

    return (
        <div className="flex flex-col gap-5 p-2">
            <h3 className="text-2xl font-bold">{t('order_summary')}</h3>

            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <p className="flex items-center gap-1">
                        {t('subtotal')}
                        <span>({cart?.items.length ?? 0}) {t('products')}</span>
                    </p>

                    <p>
                        {cart?.items.reduce((sum, ele) => sum + ele.total, 0) ?? 0}{" "}
                        {cart?.items[0]?.currency ?? "جنية مصري"}
                    </p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <p>{t('shippingFees')}</p>
                {cart?.items[0].express_shipping_price <= 0 ? (
                    <p className="text-green-500">{t('freeShipping')}</p>

                ) : (
                    <p>
                        {cart?.items.reduce((sum, ele) => sum + ele.express_shipping_price, 0) ?? 0}{" "}
                        {cart?.items[0]?.currency}
                    </p>
                )}
            </div>
            <div className="flex justify-between items-center">
                <p>{t('couponDiscount')}</p>

                <p className="text-green-500">{cart?.items[0].offer_price ?? 0}</p>
            </div>
            <div className="flex justify-between items-center">
                <p className="flex items-center gap-1 font-bold">
                    {t('total')}
                    <span className="text-[#8D8D8D]">{t('includingTax')}</span>
                </p>

                <p>
                    {cart?.items.reduce((sum, ele) => sum + ele.total, 0) ?? 0}{" "}
                    {cart?.items[0]?.currency}
                </p>
            </div>
            <div className="mx-auto my-5">
                <Button
                    onClick={onOrder}
                    className="rounded-none w-fit py-6 px-10 gap-4 text-2xl cursor-pointer"
                >
                    {t('confirm_order')}

                </Button>
            </div>
        </div>
    )
}