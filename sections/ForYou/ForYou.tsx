import FadeIn from "@/Animations/Fadding";
import SecondButton from "@/components/Layout/SecondButton";
import ShopCard from "@/components/ShopCard/ShopCard";
import type { Product } from "@/interfaces/interfaces";
import { MoveLeft, MoveRight } from "lucide-react";
import { getTranslations } from 'next-intl/server';
import { cookies } from "next/headers";


export default async function ForYouSection({ products, title }: { products: Product[]; title: string }) {
    const t = await getTranslations('View All');
    const cookieStore = await cookies()

    const isRtl = cookieStore.get("NEXT_LOCALE")?.value == 'ar'
    return (
        <section className="container flex flex-col gap-5 py-10">
            {/* Title */}
            <FadeIn direction="down">

                <h2 className="mb-6 sm:mb-10 text-center text-primary !text-2xl md:!text-3xl lg:!text-4xl">
                    {title}
                </h2>
            </FadeIn>

            {/* Cards */}

            <div className="grid mx- md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 ">
                {
                    products.map((prod, index) => {
                        return (
                                <ShopCard product={prod} key={index} />
                        )
                    })
                }
            </div>

            {/* Btn */}
            <FadeIn direction="up" delay={0.2} duration={0.3} className="mx-auto" >
                <SecondButton text={t('Main')} icon={isRtl ? MoveLeft : MoveRight} />
            </FadeIn>
        </section>
    )
}
