import Image from "next/image";
import cartCard from "@/assets/icons/CartCar.png"
import SecondButton from "../Layout/SecondButton";
export default function NoCart({ title, decs }: { title: string, decs?: string }) {
    return (
        <div className="container flex justify-center items-center flex-col gap-5">
            <div>
                <Image
                    src={cartCard}
                    alt="cartCard"
                    width={120}
                    height={120}
                    className="size-60 object-contain" />
            </div>
            <div className="text-center flex justify-center items-center flex-col gap-4">
                <p className="text-2xl font-bold">{title}</p>
                <p className="text-md text-gray-500">{decs}</p>
                <SecondButton text="تسوق الأن" />
            </div>
        </div>
    )
}
