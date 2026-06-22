import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb"
import CategoryFilter from "@/components/Filter/Filter"
import NoInfo from "@/components/NoInfo/NoInfo"
import ProductsGridSkeleton from "@/components/ProductsGridSkeleton/ProductsGridSkeleton"
import ShopCard from "@/components/ShopCard/ShopCard"
import { Product } from "@/interfaces/interfaces"
import CategoryProducts from "@/sections/CategoryProducts/CategoryProducts"
import { serverApi } from "@/services/serverApi"
import { Suspense } from "react"

type Props = {
    params: { id: number }
    searchParams: {
        sub_cat?: string
        sub_sub_cat?: string
        min_price?: string
        max_price?: string
    }
}
export default async function page({ params, searchParams }: Props) {
    const { id } = await params

    const { data: categories } = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/client/get_categories`
    ).then(res => res.json())

    const category = categories?.find((cat: { id: number }) => cat.id === Number(id))

    return (
        <div className="container flex flex-col gap-10">
            <BreadCrumb secondLink="الأقسام" thirdLink={category?.title ?? ''} />
            <div className="grid md:grid-cols-[0.4fr_1fr] justify-center gap-5 items-center md:items-start">
                <div className="max-w-2xs">
                    <CategoryFilter subCategories={category?.sub_categories} />
                </div>
                <Suspense fallback={<ProductsGridSkeleton />} key={JSON.stringify(await searchParams)}>
                    <CategoryProducts searchParams={searchParams} categoryId={category?.id} />
                </Suspense>
            </div>
        </div>
    )
}