import { EditIcon } from "lucide-react";

export default function CartAddress() {
    return (
        <div className="flex flex-col gap-5 p-8 bg-[#F9F9F9]">
            <h3 className="text-2xl font-bold">
                عنوان الشحن
            </h3>

            <div className="flex flex-col gap-4">
                <div className="p-5 border bg-white border-[#E1E1E1] flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <h3 className="text-xl  font-bold">نور  أحمد</h3>
                        <p className="text-[#797979]">010112233445</p>
                        <p className="text-[#797979]">سندوب, الأول من المنصورة, محافظة الدقهلية 7651334</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-primary">حرر</span>
                        <EditIcon className="text-primary size-6" />
                    </div>
                </div>
            </div>
        </div>
    )
}
