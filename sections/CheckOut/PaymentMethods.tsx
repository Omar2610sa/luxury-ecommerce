import { Checkbox } from "@/components/ui/checkbox"
import {
    Field,
    FieldContent,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field"

import paymentOne from "@/assets/paycar.png"
import paymentTwo from "@/assets/visa.png"
import paymentThree from "@/assets/tabby.png"
import paymentFour from "@/assets/money.png"



import Image from "next/image"
export default function PaymentMethods() {
    return (
        <div className="flex flex-col gap-5 p-8 bg-[#F9F9F9]">
            <h3 className="text-2xl font-bold">
                طريقة الدفع
            </h3>
            <div className="flex flex-col gap-4">
                <FieldLabel className="p-5 border bg-white border-[#E1E1E1] ">
                    <Field orientation="horizontal" className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" className="rounded-full size-6" />
                        <FieldContent>
                            <FieldTitle className="text-lg">الدفع المباشر</FieldTitle>
                        </FieldContent>
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-200 px-4 py-2">
                                <Image
                                    src={paymentTwo}
                                    alt="paymentTwo"
                                    width={40}
                                    height={40}
                                    className="w-14 h-8 object-contain"
                                />
                            </div>
                            <div className="bg-gray-200 px-4 py-2">
                                <Image
                                    src={paymentOne}
                                    alt="paymentOne"
                                    width={40}
                                    height={40}
                                    className="w-14 h-8 object-contain"
                                />
                            </div>
                        </div>
                    </Field>

                </FieldLabel>
                <FieldLabel className="p-5 border bg-white border-[#E1E1E1] ">
                    <Field orientation="horizontal" className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" className="rounded-full size-6" />
                        <FieldContent>
                            <FieldTitle className="text-lg">قسمها إلى 4 أقساط.</FieldTitle>
                        </FieldContent>
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-200 px-4 py-2">
                                <Image
                                    src={paymentThree}
                                    alt="paymentThree"
                                    width={40}
                                    height={40}
                                    className="w-14 h-8 object-contain"
                                />
                            </div>

                        </div>
                    </Field>

                </FieldLabel>
                <FieldLabel className="p-5 border bg-white border-[#E1E1E1] ">
                    <Field orientation="horizontal" className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" className="rounded-full size-6" />
                        <FieldContent>
                            <FieldTitle className="text-lg">الدفع عند الاستلام</FieldTitle>
                        </FieldContent>
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-200 px-4 py-2 flex flex-col items-center justify-center">
                                <Image
                                    src={paymentFour}
                                    alt="paymentFour"
                                    width={40}
                                    height={40}
                                    className="w-10 h-6 object-contain"
                                />
                                <span>
                                    نقد
                                </span>
                            </div>

                        </div>
                    </Field>

                </FieldLabel>
            </div>
        </div>
    )
}
