"use client"
import ShopCard from "@/components/ShopCard/ShopCard";
import { ForYou } from "@/interfaces/interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import SecondButton from "@/components/Layout/SecondButton";
import { MoveLeft } from "lucide-react";

export default function NewEditions({ products }: { products: ForYou[] }) {
    return (
        <section className="container flex flex-col gap-5 py-10">
            {/* Title */}
            <h2 className="mb-6 sm:mb-10 text-center text-primary !text-2xl md:!text-3xl lg:!text-4xl">
                أحدث الإصدارات
            </h2>

            {/* Swiper */}
            <div className="w-full overflow-hidden">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={12}
                    loop={true}
                    autoplay={{ delay: 100, disableOnInteraction: true }}
                    speed={5000}
                    allowTouchMove={true}
                    className="!overflow-visible"
                    breakpoints={{
                        0:    { slidesPerView: 1.2 },
                        640:  { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3.2 },
                        1280: { slidesPerView: 4.2 },
                    }}
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id} >
                            <ShopCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

                {/* Btn */}
                <div className="mx-auto">
                <SecondButton text="عرض الكل" icon={MoveLeft} />
                </div>
        </section>
    )
}