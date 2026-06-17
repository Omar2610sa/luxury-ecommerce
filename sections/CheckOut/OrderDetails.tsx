import Image from "next/image";
import product from "@/assets/3ccc473ff409e493f8e367ad49d7bf0e34517e28.jpg"
export default function OrderDetails() {
    return (
        <div className="flex flex-col gap-5 p-8 bg-[#F9F9F9]">
            <h3 className="text-2xl font-bold">
                تفاصيل الطلب
            </h3>

            <div className="flex flex-col gap-4">
                <div className="p-5 border bg-white border-[#E1E1E1] flex flex-col md:flex-row justify-between items-center gap-6">
                    <Image
                        src={product}
                        alt="product"
                        width={80}
                        height={80}
                        className="object-contain"
                    />
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <h3 className="font-medium">فستان مصنوع من مزيج الكريب الشيفون عالي الجودة مع حزام قابل للفصل.</h3>
                        <p className="text-[#797979]">اللون: بيح3x</p>
                        <p className="text-xl font-bold">1500.00 EGY</p>
                    </div>
                    <div className="px-8 py-2 bg-gray-200">
                        x2
                    </div>
                </div>

            </div>
        </div>
    )
}
