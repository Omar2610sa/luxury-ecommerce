import Image from "next/image";
import { Cart } from "@/interfaces/interfaces";
export default function OrderDetails({ cart }: { cart: Cart }) {
    return (
        <div className="flex flex-col gap-5 p-8 bg-[#F9F9F9]">
            <h3 className="text-2xl font-bold">
                تفاصيل الطلب
            </h3>

            {
                cart?.items && (

                    <div className="flex flex-col gap-4">
                        {cart?.items?.map((ele, index) => (
                            <div key={index} className="p-5 border border-[#E1E1E1] flex flex-col md:flex-row justify-between items-center gap-6">
                                <Image
                                    src={ele?.images[0]?.media}
                                    alt={ele?.images[0]?.alt ?? ele?.title}
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                />
                                <div className="flex flex-col items-center md:items-start gap-3">
                                    <h3 className="font-medium">{ele?.title}</h3>
                                    <p className="text-[#797979]">اللون: {ele?.color} - المقاس: {ele?.size}</p>
                                    <p className="text-xl font-bold">{ele?.price} {ele?.currency} </p>
                                </div>

                                <div className="flex justify-between items-center ">
                                    <div className="flex flex-col md:flex-row items-center gap-5">
                                        <div className="px-8 py-2 bg-gray-200">
                                            x{ele?.quantity}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
)}

