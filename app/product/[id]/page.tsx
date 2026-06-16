import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb";
import { CartData, Product, ProductData } from "@/interfaces/interfaces";
import Image from "next/image";
import ProductInfo from "@/sections/Product/ProductInfo";
import ForYouSection from "@/sections/ForYou/ForYou";
import { serverApi } from "@/services/serverApi";

type Props = {
    params: Promise<{
        id: string;
    }>;
};



export default async function Page({ params }: Props) {
    const { id } = await params;

    const { data: product } = await serverApi<{data : ProductData}>(`web_product/${id}`)



    return (
        <div className="container flex flex-col gap-10">
            <BreadCrumb thirdLink={product.title} />
            <ProductInfo product={product as unknown as Product} />
            <ForYouSection title="موصى به لك" products={product?.recommended ?? []} />
            <ForYouSection title="اختارنا لك" products={product?.also_may_like ?? []} />

        </div>
    );
}