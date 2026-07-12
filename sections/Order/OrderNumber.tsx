import { Order } from "@/interfaces/interfaces"
import { useTranslations } from "next-intl"

type Props = {
    order: Order
}

export default function OrderNumber({ order }: Props) {
    const t = useTranslations('Cart');

    return (
        <div className="flex flex-col gap-5 py-5 px-3 bg-[#F9F9F9] h-fit">
            <h3 className="font-bold text-xl sm:text-2xl ">{t('order_summary')}</h3>

            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <p className="flex items-center gap-1  text-xl sm:text-2xl ">
                        سعر المنتج (شامل الضريبة)
                    </p>

                    <p className="flex  gap-1 font-bold text-xl whitespace-nowrap">
                        {order?.total}
                        <span>
                            {order?.currency ? "" : "جنية مصري"}
                        </span>
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="flex items-center gap-1 m text-xl text-[#797979] sm:text-2xl">
                        الشحن
                    </p>

                    <p className="text-green-500 font-bold text-xl whitespace-nowrap">
                        {order?.shipping_value}

                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="flex items-center gap-1 text-xl sm:text-2xl ">
                        المجموع
                    </p>

                    <p className="flex  gap-1 font-bold text-xl whitespace-nowrap">
                        {order?.total}
                        <span>
                            {order?.currency ? "" : "جنية مصري"}
                        </span>
                    </p>
                </div>
            </div>
            {/* <div className="flex justify-between items-center">
                <p>{t('shippingFees')}</p>
                {order?.items[0].express_shipping_price <= 0 ? (
                    <p className="text-green-500">{t('freeShipping')}</p>

                ) : (
                    <p>
                        {order?.items.reduce((sum, ele) => sum + ele.express_shipping_price, 0) ?? 0}{" "}
                        {order?.items[0]?.currency}
                    </p>
                )}
            </div>
            <div className="flex justify-between items-center">
                <p>{t('couponDiscount')}</p>

                <p className="text-green-500">{order?.items[0].offer_price ?? 0}</p>
            </div>
            <div className="flex justify-between items-center">
                <p className="flex items-center gap-1 font-bold">
                    {t('total')}
                    <span className="text-[#8D8D8D]">{t('includingTax')}</span>
                </p>

                <p>
                    {order?.items.reduce((sum, ele) => sum + ele.total, 0) ?? 0}{" "}
                    {order?.items[0]?.currency}
                </p>
            </div> */}

        </div>
    )
}