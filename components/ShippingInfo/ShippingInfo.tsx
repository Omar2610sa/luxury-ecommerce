import { TruckIcon, RotateCcwIcon, InfoIcon, ChevronLeft } from "lucide-react"

export default function ShippingInfo() {
    return (
        <div className="flex flex-col gap-4 w-full">

            {/* Shipping To Egypt */}
            <div className="flex  gap-4 pb-4 border-b">
                <TruckIcon className="size-8 shrink-0 mt-1" />
                <div className="flex flex-col  gap-2 t">
                    <p className="text-xl font-semibold">الشحن إلى مصر</p>
                    <p className="text-lg text-gray-500">
                        مجاناً للطلبات التي تزيد عن 2500 جنيه أو أكثر
                    </p>
                    <p className="text-lg text-gray-500 ">
                        من المتوقع أن يتم تسليمها في
                        <span className="font-medium"> 2022/09/15 - 2022/09/30</span>
                    </p>
                </div>
            </div>

            {/* Return Policy */}
            <button className="flex items-center justify-between gap-4 pb-4 border-b">
                <div className="flex items-center gap-4">

                    <RotateCcwIcon className="size-7" />
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-semibold">سياسة الإرجاع</span>
                    </div>
                </div>
                <ChevronLeft className="size-5 text-gray-400" />
            </button>

            {/* Description */}
            <button className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">

                    <InfoIcon className="size-7" />
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-semibold">وصف</span>
                    </div>
                </div>
                <ChevronLeft className="size-5 text-gray-400" />
            </button>

        </div>
    )
}