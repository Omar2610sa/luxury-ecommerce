import NoFav from "@/components/NoFav/NoFav";
import NoInfo from "@/components/NoInfo/NoInfo";
import ShopCard from "@/components/ShopCard/ShopCard";
import Tablist from "@/components/Tablist/Tablist";
import { CartData, HomeData, Product } from "@/interfaces/interfaces";
import ChangePasswordForm from "@/sections/Auth/ChangePass";
import CartDetails from "@/sections/CartDetails/CartDetails";
import MyOrders from "@/sections/MyOrders/MyOrders";
import { serverApi } from "@/services/serverApi";
import { getTranslations } from "next-intl/server";



type Props = {
    params: Promise<{
        slug: string;
        lang: string;
    }>;
    searchParams: Promise<{ type?: string }>
};

export default async function page({ params, searchParams }: Props) {
    const { slug, lang } = await params;
    const resolvedSearch = await searchParams;
    const status = resolvedSearch?.type;

    if (slug === "my-order") {
        return <MyOrders status={status} />  
    }

    if (slug === "cart") {
        const { data: cart } = await serverApi<CartData>("cart")
        const t = await getTranslations({ locale: lang, namespace: 'Cart' });
        return <CartDetails cart={cart} lang={lang} />
    }

    if (slug === "change-password") {
        return <ChangePasswordForm />
    }

    if (slug === "favoutie") {
        const { data: fave } = await serverApi<{ data: HomeData[] }>("get_fave_products")
        return (
            <>
                {fave?.length ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {fave.map((ele, index) => (
                            <ShopCard key={index} product={ele as unknown as Product} />
                        ))}
                    </div>
                ) : (
                    <NoFav />
                )}
            </>
        )
    }

    if (slug === "favoutie") {
        const { data: fave } = await serverApi<{ data: HomeData[] }>("get_fave_products")

        return (
            <>
                {
                    fave && (

                        <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-6 ">
                            {
                                fave?.map((ele, index) => {
                                    return (
                                        <div key={index}>
                                            <ShopCard product={ele as unknown as Product} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )}
                {fave?.length === 0 && <NoFav />}

            </>
        )
    }
    return (
        <div>

            {
                slug
            }
        </div>
    )
}
