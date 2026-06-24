import SecondButton from "@/components/Layout/SecondButton";
import ShopCard from "@/components/ShopCard/ShopCard";
import type { Product } from "@/interfaces/interfaces";
import { MoveLeft } from "lucide-react";
import { getTranslations } from 'next-intl/server';


export default async function ForYouSection({ products, title }: { products: Product[]; title: string }) {
    const t = await getTranslations('View All');

    return (
        <section className="container flex flex-col gap-5 py-10">
            {/* Title */}
            <h2 className="mb-6 sm:mb-10 text-center text-primary !text-2xl md:!text-3xl lg:!text-4xl">
                {title}
            </h2>
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
            <div className="mx-auto">
                <SecondButton text={t('Main')} icon={MoveLeft} />
            </div>
        </section>
    )
}
