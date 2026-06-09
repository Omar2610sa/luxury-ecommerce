import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb"
import CategoryFilter from "@/components/Filter/Filter"
import NoInfo from "@/components/NoInfo/NoInfo"
import ShopCard from "@/components/ShopCard/ShopCard"
import Link from "next/link"

type Props = {
    params: { id: number }
}

export default async function page({ params }: Props) {
    const { id } = await params

    const { data: categories } = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/client/get_categories`
    ).then(res => res.json())
    const category = categories?.find((cat: { id: number }) => cat.id === Number(id))
    

    
    const { data: products } = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/client/product?main_category_id=${category?.id}`
    ).then(res => res.json())


    return (
        <div className="container flex flex-col gap-10">
            <BreadCrumb secondLink="الأقسام" thirdLink={category?.title ?? ''} />
            <div className="grid grid-cols-[0.4fr_1fr]  items-start ">
                <div className="max-w-2xs">
                    <CategoryFilter subCategories={category?.sub_categories} />
                </div>
                {
                    products.length > 0 && (

                        <div className="grid  lg:grid-cols-3 xl:grid-cols-3 gap-6 ">
                    {
                        products.map((cat, index) => {
                            return (
                                <Link href={`/product/${cat.id}`} key={index}>
                                    <ShopCard product={cat} />
                                </Link>
                            )
                        })
                    }
                </div>
                )}

                {
                    products.length <= 0 && (
                        <NoInfo />
                    )
                }
            </div>
        </div>
    )
}