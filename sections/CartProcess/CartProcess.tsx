import { Button } from "@/components/ui/button"
import { Cart } from "@/interfaces/interfaces"
import { LucideArrowLeft, } from "lucide-react"
import { Link } from "@/services/navigation"
import { getTranslations } from 'next-intl/server';

export default async function CartProcess({ cart, lang }: { cart: Cart; lang: string }) {
    const t = await getTranslations({ locale: lang, namespace: 'Cart' });

 
    return (
        <div className="flex flex-col gap-5 p-2">
            <h3 className="text-2xl font-bold">{t('orderSummary')}</h3>

            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <p className="flex items-center gap-1">
                        {t('subtotal')}
                        <span>({cart?.items.length ?? 0}) {t('products')}</span>
                    </p>
                    <p>{cart?.items.reduce((sum, ele) => sum + ele.total, 0) ?? 0} {cart?.items[0]?.currency ?? t('currency')}</p>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <p>{t('shippingFees')}</p>
                {cart?.items[0].express_shipping_price <= 0
                    ? <p className="text-green-500">{t('freeShipping')}</p>
                    : <p>{cart?.items.reduce((sum, ele) => sum + ele.express_shipping_price, 0) ?? 0} {cart?.items[0]?.currency}</p>
                }
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
                <p>{cart?.items.reduce((sum, ele) => sum + ele.total, 0) ?? 0} {cart?.items[0]?.currency}</p>
            </div>

            <div className="mx-auto my-5">
                <Button disabled={cart?.items.reduce((sum, ele) => sum + ele.total, 0) === undefined} className="rounded-none w-fit py-6 px-10 gap-4 text-2xl flex items-center cursor-pointer">
                    <Link href="/CheckOut" className="flex items-center gap-4">
                        {t('checkout')}
                        <LucideArrowLeft className="size-6" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
