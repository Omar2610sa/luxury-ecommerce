import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb";
import { Order, OrderDetailsData } from "@/interfaces/interfaces";
import OrderDetails from "@/sections/Order/OrderDetails";
import OrderNumber from "@/sections/Order/OrderNumber";
import { serverApi } from "@/services/serverApi";


type Props = {
    params: Promise<{
        lang: string;
        id: string;
    }>;
};

export default async function page({ params }: Props) {
    const { id } = await params;
    const { data: order } = await serverApi<{ data: Order & OrderDetailsData }>(`orders/${id}`);

    return (
        <section className="container flex flex-col gap-5">
            <BreadCrumb secondLink="الطلبات" thirdLink={order?.order_no} />
            <div className="grid md:grid-cols-2 gap-8">
                <OrderDetails order={order} />
                <OrderNumber order={order} />
            </div>
        </section>
    )
}
