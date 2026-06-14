import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb";
import { Product, ProductData } from "@/interfaces/interfaces";
import Image from "next/image";
import ProductImageCarousel from "@/components/ProductSwiper/ProductSwiper";
import ProductInfo from "@/sections/Product/ProductInfo";
import ForYouSection from "@/sections/ForYou/ForYou";
import { useApi } from "@/services/useApi";

type Props = {
    params: Promise<{
        id: string;
    }>;
};



export default async function Page({ params }: Props) {
    const { id } = await params;

    const { data: product } = await useApi<ProductData>(`web_product/${id}`)



    return (
        <div className="container flex flex-col gap-10">
            <BreadCrumb thirdLink={product.title} />
            <ProductInfo product={product} />
            <ForYouSection title="موصى به لك" products={product?.recommended ?? []} />
            <ForYouSection title="اختارنا لك" products={product?.also_may_like ?? []} />

        </div>
    );
}