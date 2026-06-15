import SecondButton from "@/components/Layout/SecondButton"
import { Cart } from "@/interfaces/interfaces"
import { LucideArrowLeft, } from "lucide-react"
export default function CartProcess({ cart }: { cart: Cart }) {
    return (
        <div className="flex flex-col gap-5 p-2">
            <h3 className="text-2xl font-bold">
                ملخص الطلب
            </h3>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <p className="flex items-center gap-1">
                        المجموع الفرعي
                        <span>
                            ({cart?.items.length ?? 0})
                            منتجات
                        </span>
                    </p>
                    <p>
                        {
                            cart?.items
                                .reduce((sum, ele) => sum + ele.total, 0)
                        } {cart?.items[0]?.currency}
                    </p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <p className="flex items-center gap-1">
                    رسوم الشحن
                </p>
                {
                    cart?.items[0].express_shipping_price <= 0 ? <p className="text-green-500">مجانا</p> : <p>
                        {
                            cart?.items
                                .reduce((sum, ele) => sum + ele.express_shipping_price, 0)
                        } {cart?.items[0]?.currency}
                    </p>

                }
            </div>
            <div className="flex justify-between items-center">
                <p className="flex items-center gap-1">
                    خصم الكوبون
                </p>
                <p className="text-green-500">
                    {cart?.items[0].offer_price}
                </p>

            </div>
            <div className="flex justify-between items-center">
                <p className="flex items-center gap-1 font-bold">
                    المجموع
                    <span className="text-[#8D8D8D]">
                        (شامل الضريبة)
                    </span>
                </p>
                <p className="">
                    {
                        cart?.items
                            .reduce((sum, ele) => sum + ele.total, 0)
                    } {cart?.items[0]?.currency}
                </p>

            </div>
            <div className="mx-auto my-5">

                <SecondButton text="إتمام الشراء" icon={LucideArrowLeft} />
            </div>
        </div>
    )
}
