"use client"
import { ForYou, Product } from "@/interfaces/interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import SecondButton from "@/components/Layout/SecondButton";
import { MoveLeft, MoveRight } from "lucide-react";
import ShopCardClient from "@/components/ShopCard/ShopCardClient";
import { useTranslations } from 'next-intl';
import Cookies from "js-cookie"
import FadeIn from "@/Animations/Fadding";



export default function NewEditions({ products, title }: { products: ForYou[], title: string }) {
    const t = useTranslations('View All');
    const isRtl = Cookies.get('NEXT_LOCALE') == "ar"

    return (
        <section className="container flex flex-col gap-5 py-10">
            {/* Title */}
            <FadeIn direction="down">

                <h2 className="mb-6 sm:mb-10 text-center text-primary !text-2xl md:!text-3xl lg:!text-4xl">
                    {title}
                </h2>
            </FadeIn>

            {/* Swiper */}
            <div className="w-full overflow-hidden">
                <FadeIn direction="up" delay={0.1} duration={0.3} >

                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={12}
                        loop={true}
                        autoplay={{ delay: 100, disableOnInteraction: true }}
                        speed={5000}
                        allowTouchMove={true}
                        className="!overflow-visible"
                        breakpoints={{
                            0: { slidesPerView: 1.2 },
                            640: { slidesPerView: 2.2 },
                            1024: { slidesPerView: 3.2 },
                            1280: { slidesPerView: 4.2 },
                        }}
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id} >


                                <ShopCardClient product={product as unknown as Product} />

                            </SwiperSlide>
                        ))}
                    </Swiper>
                </FadeIn>
            </div>

            {/* Btn */}
            <FadeIn direction="up" delay={0.2} duration={0.3} className="mx-auto" >
                <SecondButton text={t('Main')} icon={isRtl ? MoveLeft : MoveRight} />
            </FadeIn>
        </section>
    )
}