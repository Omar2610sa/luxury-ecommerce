import NoInfo from "@/components/NoInfo/NoInfo";
import ShopCard from "@/components/ShopCard/ShopCard";
import { CartData, HomeData, Product } from "@/interfaces/interfaces";
import ChangePasswordForm from "@/sections/Auth/ChangePass";
import CartDetails from "@/sections/CartDetails/CartDetails";
import { serverApi } from "@/services/serverApi";



type Props = {
    params: Promise<{
        slug: string;
    }>;
};
export default async function page({ params }: Props) {
    const { slug } = await params;

    if (slug === "my-order") {
        const { data: order } = await serverApi<{ data: CartData[] }>("orders")
        return (
                <div className="container bg-[#F6F7FC]">
                                    <div className="flex items-center justify-between">
                                        
                                    </div>
                    <h3 className="text-lg font-semibold text-primary">طلباتي</h3>

                {
                    order && (

                        <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-6 ">
                            {
                                order?.map((ele, index) => {
                                    return (
                                        <div key={index}>
                                            {ele?.status}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )}
                {
                    !order.length && (
                        <NoInfo title="لا يوجد طلب مسبق" decs="اذهب و تسوق الأن" />
                    )
                }
            </div>
        )
    }
    if (slug === "cart") {
        const { data: cart } = await serverApi<CartData>("cart")
        return (
            <CartDetails cart={cart} />
        )
    }
    if (slug === "change-password") {

        return (
            <>
                <ChangePasswordForm />
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
