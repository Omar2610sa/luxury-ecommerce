import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb";
import { Product } from "@/interfaces/interfaces";
import Image from "next/image";
import ProductImageCarousel from "@/components/ProductSwiper/ProductSwiper";
import ProductInfo from "@/sections/Product/ProductInfo";

type Props = {
    params: Promise<{
        id: string;
    }>;
};



export default async function Page({ params }: Props) {
    const { id } = await params;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/client/web_product/${id}`
    );

    const result: { data: Product } = await response.json();

    const product = result.data;

    return (
        <div className="container flex flex-col gap-10">
            <BreadCrumb thirdLink={product.title} />
            <ProductInfo product={product} />
        </div>
    );
}