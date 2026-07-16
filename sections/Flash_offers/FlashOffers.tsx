"use client";

import { useTranslations } from 'next-intl';
import Image from "next/image";
import { useEffect, useState } from "react";
import pattern from "@/assets/pattern.png";
import flash from "@/assets/sssss3 1.png"
import dress from "@/assets/3ccc473ff409e493f8e367ad49d7bf0e34517e28.jpg"
import FadeIn from '@/Animations/Fadding';

const COUNTDOWN_SECONDS = 30 * 60;

export default function FlashOffers() {
    const t = useTranslations('FlashOffers');
    const [timeLeft, setTimeLeft] = useState(COUNTDOWN_SECONDS);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    const pad = (n: number) => String(n).padStart(2, "0");

    const flashOffers = [
        { id: 1, name: t('products.0.name'), price: 254, image: dress },
        { id: 2, name: t('products.1.name'), price: 254, image: dress },
        { id: 3, name: t('products.2.name'), price: 254, image: dress },
        { id: 4, name: t('products.3.name'), price: 254, image: dress },
    ];

    return (
        <div className="relative container py-8 rounded-lg overflow-hidden">
            <Image src={pattern} alt="pattern" fill className="absolute object-fill" />

            <div className="relative z-10 px-5">
                {/* Header */}
                <div className="flex flex-col gap-2.5 md:flex-row md:items-center justify-between mb-4">
                    {/* Flash Sale Badge */}
                    <div className="flex items-center gap-5 text-white font-bold text-xl">
                        <Image src={flash} alt="flash" className="size-10 object-fill" />
                        {t('flashSale')}
                    </div>

                    {/* Countdown */}
                    <div className="flex flex-col gap-2.5 md:flex-row md:items-center gap-4 text-lg font-semibold text-white">
                        <div className="flex justify-between">
                            <span className='md:px-3 text-xl'>{t('endsIn')}</span>
                            <div className="flex gap-2">
                                <div className="bg-black size-10 flex items-center justify-center p-1 rounded text-xl font-bold text-center">
                                    {pad(hours)}
                                </div>
                                <span>:</span>
                                <div className="bg-black size-10 flex items-center justify-center p-1 rounded text-xl font-bold text-center">
                                    {pad(minutes)}
                                </div>
                                <span>:</span>
                                <div className="bg-black size-10 flex items-center justify-center p-1 rounded text-xl font-bold text-center">
                                    {pad(seconds)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {flashOffers.map((product,index) => (
                        <FadeIn direction="up" delay={index * 0.3} duration={0.3} key={product.id} >

                        <div  className="overflow-hidden ">
                            <div className="relative aspect-[3/4] w-full">
                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                            </div>
                            <div className="p-2 pb-3">
                                <p className="text-white mb-1.5">{product.name}</p>
                                <p className="font-bold text-white text-xl flex items-center">
                                    {product.price}
                                    <span className="text-xl font-bold mx-2">{t('currency')}</span>
                                </p>
                            </div>
                        </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </div>
    );
}