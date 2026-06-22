import ShopCard from "@/components/ShopCard/ShopCard"
import NoInfo from "@/components/NoInfo/NoInfo"
import { Product } from "@/interfaces/interfaces"
import { serverApi } from "@/services/serverApi"

type Props = {
    categoryId: number
    searchParams: {
        sub_cat?: string
        sub_sub_cat?: string
        min_price?: string
        max_price?: string
    }
}

export default async function CategoryProducts({ categoryId, searchParams }: Props) {
    const { sub_cat, sub_sub_cat, min_price, max_price } = await  searchParams

    const queryParams = new URLSearchParams()
    queryParams.set("main_category_id", categoryId.toString())
    if (sub_cat) queryParams.set("sub_category_id", sub_cat)
    if (sub_sub_cat) queryParams.set("sub_sub_category_id", sub_sub_cat)
    if (min_price) queryParams.set("price_from", min_price)   
    if (max_price) queryParams.set("price_to", max_price)     

    const { data: products } = await serverApi<{ data: Product[] }>(
        `product?${queryParams.toString()}`
    )


    if (!products || products.length === 0) {
        return <NoInfo title="لا يوجد بيانات حاليا" decs="لا يوجد منتاجات حاليا" />
    }

    return (
        <div className="grid lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {products.map((product, index) => (
                <ShopCard product={product} key={index} />
            ))}
        </div>
    )
}