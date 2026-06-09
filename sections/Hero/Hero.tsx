import SecondButton from "@/components/Layout/SecondButton";
import { Slider } from "@/interfaces/interfaces";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link";

export default function Hero({ slider }: { slider: Slider[] }) {
    return (
        <div className="">
            <Carousel >
                <CarouselContent >
                    {slider.map((slider, index) => (
                        <CarouselItem key={index} className=" relative z-40 w-full md:h-150vh h-[calc(100vh-92px)] overflow-hidden ">
                            {/* Background image per slide */}
                            <Image
                                src={slider.image}
                                className="absolute top-0 left-0 w-full h-full object-cover z-30"
                                fill
                                alt=""
                            />
                            <div className="absolute inset-0 bg-black/30 z-30" />

                            {/* Content */}
                            <div className="relative z-40 h-full flex items-center justify-center text-center text-white">
                                <div className="flex flex-col items-center justify-center space-y-16 px-6">
                                    <div className="space-y-6">

                                        <h1 className="font-bold text-[40px] md:text-7xl leading-[1.4]">
                                            {slider.name}
                                        </h1>
                                        <p className="text-3xl leading-relaxed">
                                            {slider.desc}
                                        </p>
                                    </div>
                                    <Link href={`/slider/${slider.id}`} >
                                        <SecondButton variant="secondary" text="تسوق الآن" />
                                    </Link>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious size="lg" className="absolute top-1/2 left-12 size-12 -translate-y-1/2 z-50 bg-white/20 text-white border-white/60" />
                <CarouselNext className="absolute top-1/2 right-12 size-12 -translate-y-1/2 z-50 bg-white/20 text-white border-white/60" />
            </Carousel>
        </div>
    )
}
