import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb";
import { Product } from "@/interfaces/interfaces";
import Star from "@/assets/icons/star.png";
import Image from "next/image";
import ProductImageCarousel from "@/components/ProductSwiper/ProductSwiper";

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

            <div className="grid grid-cols-2 gap-5 items-start">

                    <ProductImageCarousel
                        mainImage={product.main_image}
                        images={product.details[0]?.images ?? []}
                    />
                <div className="w-full flex flex-col gap-8">
                    <h2 className="text-4xl font-semibold leading-tight">
                        {product.title}
                    </h2>

                    {product.details.map((detail) => (
                        <div key={detail.id} className="flex flex-col gap-5">
                            <div

                                className="flex justify-between items-center"
                            >
                                <p className="text-2xl font-extrabold">
                                    {detail.price} {detail.currency}
                                </p>
                            </div>

                            <div className="flex justify-between items-center">
                                <p className="line-through text-xl text-gray-500 font-bold">
                                    950 جنيه
                                </p>
                                <div className="flex items-center justify-between gap-1">
                                    <Image
                                        src={Star}
                                        alt="Star"
                                        className={`size-5 object-cover mt-1 fill-yellow-400 text-yellow-400`}
                                    />
                                    <span className="text-xl font-medium">
                                        4.8
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}