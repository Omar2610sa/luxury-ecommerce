import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb"
import NoInfo from "@/components/NoInfo/NoInfo"
import ShopCard from "@/components/ShopCard/ShopCard"
import { Product, Slider } from "@/interfaces/interfaces"
import { serverApi } from "@/services/serverApi"
import Link from "next/link"

type Props = {
    params: { id: string }
}

export default async function page({ params }: Props) {
    const { id } = params
    const { data: slider } = await serverApi<{ data: Slider }>(`slider/${id}`)

    // Ensure product_details is treated as an array even if the API returns a single object
    const products = Array.isArray(slider?.product_details)
        ? slider!.product_details
        : slider?.product_details
            ? [slider.product_details]
            : []

    const hasProducts = products.length > 0

    return (
        <div className="container flex flex-col gap-8"  >
            <BreadCrumb secondLink="السلايدر" thirdLink={slider?.name ?? ''} />
            {
                hasProducts ? (

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 ">
                        {products.map((product, index) => {
                            return (
                                <Link href={`/product/${product.id}`} key={index}>
                                    <ShopCard product={product as unknown as Product} />
                                </Link>
                            )
                        })}
                    </div>
                )
                    :
                    <NoInfo title="لا يوجد بيانات" />
            }

        </div>
    )
}