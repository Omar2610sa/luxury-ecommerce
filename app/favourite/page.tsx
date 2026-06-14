import NoFav from "@/components/NoFav/NoFav";
import ShopCard from "@/components/ShopCard/ShopCard";
import { HomeData } from "@/interfaces/interfaces";
import { useApi } from "@/services/useApi";

export default async function page() {

    const { data: fave } = await useApi<HomeData>("get_fave_products")

    return (
        <div className="container flex flex-col gap-8">
            <div className="flex items-center gap-3 text-2xl">
                <p>المفضلة</p>
                <span className="text-gray-400">
                    (
                    {fave?.length || 0}
                    )
                </span>
            </div>
            {
                fave?.length === 0 && (
                    <NoFav />
                )
            }

            {
                fave && (

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 ">
                        {
                            fave?.map((ele, index) => {
                                return (
                                    <div key={index}>
                                        <ShopCard product={ele} />
                                    </div>
                                )
                            })
                        }
                    </div>
                )}
        </div>
    )
}
