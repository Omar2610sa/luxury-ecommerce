import { secondSlider } from "@/interfaces/interfaces";
import Image from "next/image";

export default function SecondSlider({secondSlider}: {secondSlider : secondSlider[]}) {
    return (
        <section className='container  space-y-10 w-full'>
            <div className="hidden gap-y-10 md:mb-4 md:pb-4 gap-x-2.5 mt-4 pt-4 lg:mt-8 lg:pt-8 sm:grid grid-cols-6 md:grid-cols-7">
                {secondSlider.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-3 justify-center mx-auto w-fit">
                        <div className="relative w-[80px] h-[80px] lg:size-[100px] xl:h-[120px] xl:w-[120px] hover:scale-110 transition-all duration-300 overflow-hidden rounded-full bg-gray-100">

                        <Image src={item.image} alt={item.title} fill className="h-full w-full object-cover" />
                        </div>
                        <span className="text-xl mx-auto line-clamp-3 text-center   text-black">{item.title}</span>
                    </div>
                ))}
            </div>

        </section>
    )
}
