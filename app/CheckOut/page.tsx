import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb";
import CartAddress from "@/sections/CheckOut/CartAddress";
import OrderDetails from "@/sections/CheckOut/OrderDetails";
import OrderProcess from "@/sections/CheckOut/OrderProcess";
import PaymentMethods from "@/sections/CheckOut/PaymentMethods";

export default function page() {
    
    return (
        <div className="container flex flex-col gap-8">
            <BreadCrumb secondLink="تأكيد الطلب" thirdLink="الدفع" />
            <div className="grid md:grid-cols-2 gap-8 ">
                <div className="flex flex-col gap-5">
                    <CartAddress />
                    <OrderDetails />
                    <PaymentMethods />
                </div>
                <OrderProcess />
            </div>
        </div>
    )
}
