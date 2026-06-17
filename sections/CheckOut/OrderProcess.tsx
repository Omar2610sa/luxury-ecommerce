import SecondButton from "@/components/Layout/SecondButton"
import { Button } from "@/components/ui/button"
import { Cart } from "@/interfaces/interfaces"
import { LucideArrowLeft, } from "lucide-react"
import Link from "next/link"
export default function OrderProcess() {
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
                            (0)
                            منتجات
                        </span>
                    </p>
                    <p>
                        0
                    </p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <p className="flex items-center gap-1">
                    رسوم الشحن
                </p>
                0
            </div>
            <div className="flex justify-between items-center">
                <p className="flex items-center gap-1">
                    خصم الكوبون
                </p>
                <p className="text-green-500">
                    0
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
                   0
                </p>

            </div>
            <div className="mx-auto my-5">

                <Button  className="rounded-none w-fit py-6 px-10 gap-4 text-2xl flex items-center cursor-pointer">
                    <Link href="/CheckOut" className="flex items-center gap-4 ">
                        إتمام الشراء
                        <LucideArrowLeft className="size-6" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}

// disabled={cart?.items.reduce((sum, ele) => sum + ele.total, 0) === undefined}
