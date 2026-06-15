import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb"
import NoInfo from "@/components/NoInfo/NoInfo"
import ShopCard from "@/components/ShopCard/ShopCard"
import Link from "next/link"

type Props = {
    params: { id: string }
}

export default async function page({ params }: Props) {
    const { id } = await params
    const { data: slider } = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/client/slider/${id}`).then(res => res.json())

    const products = slider?.product_details ?? []
    const hasProducts = products.length > 0

    return (
        <div className="container flex flex-col gap-8"  >
            <BreadCrumb secondLink="السلايدر" thirdLink={slider?.name ?? ''} />
            {
                hasProducts ? (

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 ">
                        {
                            slider?.product_details.map((product, index) => {
                                return (
                                    <Link href={`/product/${product.id}`} key={index}>
                                        <ShopCard product={product} />
                                    </Link>
                                )
                            })
                        }
                    </div>
                )
                :
                <NoInfo title="لا يوجد بيانات" />
            }

        </div>
    )
}