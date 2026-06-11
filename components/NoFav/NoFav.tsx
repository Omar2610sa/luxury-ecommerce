import Image from "next/image";
import logo from "@/assets/icons/fi_263417.png"
import MainButton from "../Layout/MainButton";

export default function NoFav() {
    return (
        <div className="container flex justify-center items-center flex-col gap-5">

            <div>
                <Image src={logo} alt="image" className="size-40" />
            </div>
            <div className="text-center flex flex-col justify-center items-center gap-3">
                <p className="text-xl">جاهز لحفظ منتجاتك إلي المفضلة</p>
                <p className="text-md text-gray-500">اضغط على أيقونة القلب لإضافة العناصر المفضلة لديك إلى قائمة الرغبات بنجاح.</p>
                <MainButton text="تسوق الان" />
            </div>
        </div>
    )
}
