import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb"
import { CartData } from "@/interfaces/interfaces"
import { useApi } from "@/services/useApi"
import { CheckCircle2Icon, MinusCircleIcon, Plus, PlusCircleIcon, Trash2Icon } from "lucide-react"
import { cookies } from "next/headers"
import Image from "next/image"



export default async function page() {
    const token = (await cookies()).get("token_luxary")?.value
    const { data: cart } = await useApi<CartData>("cart", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    console.log(cart)
    return (
        <div className="container flex flex-col gap-8"  >
            <BreadCrumb thirdLink="السلة" />
            <div className="grid grid-cols-2 gap-3 items-center">
                <div className="flex flex-col gap-8">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold">
                            المنتجات المضافة
                        </h3>
                        <span className="text-2xl font-bold">
                            (
                            {cart?.items.length ?? 0}
                            )
                        </span>
                    </div>

                    <div className="flex flex-col gap-4">
                        {
                            cart?.items.map((ele, index) => {
                                return (
                                    <div key={index} className="p-5 border border-[#E1E1E1] flex  items-center gap-6">
                                        <CheckCircle2Icon className="size-8" />

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-5">
                                                <Image src={ele?.images[0]?.media} alt={ele?.images[0]?.alt} width={80} height={80} className="object-contain " />
                                                <div className="flex flex-col gap-3">
                                                    <h3 className="font-medium">
                                                        {ele?.title}
                                                    </h3>
                                                    <p className="text-[#797979]">
                                                        اللون: {ele?.color}
                                                    </p>
                                                    <p className="text-2xl font-bold">
                                                        EGY {ele?.total}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-center justify-center gap-4">

                                                <div className="flex justify-between items-center gap-4 p-3 bg-[#F5F5F5]">
                                                    <PlusCircleIcon className="size-8" />
                                                    <p className="font-bold text-2xl">{ele?.quantity}</p>
                                                    <MinusCircleIcon className="size-8" />
                                                </div>
                                                <Trash2Icon className="size-8 text-red-600" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}