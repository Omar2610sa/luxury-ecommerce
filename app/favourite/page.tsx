import NoFav from "@/components/NoFav/NoFav";
import ShopCard from "@/components/ShopCard/ShopCard";
import { Link } from "lucide-react";
import { cookies } from "next/headers";

export default async function page() {
    const token = (await cookies()).get("token_luxary")?.value

    let fave = null
    if (token) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/client/get_fave_products`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.json())
        fave = res.data
    }
    console.log(fave)
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
