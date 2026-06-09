import { CircleOffIcon } from "lucide-react";

export default function NoInfo() {
    return (
        <div className="container flex justify-center items-center flex-col gap-5">

                <div>
                    <CircleOffIcon className="size-40 text-primary" />
                </div>
                <div>
            <p className="text-xl">لا يوجد بيانات</p>
            <p className="text-md text-gray-500">لا يوجد بيانات حاليا</p>
                </div>
        </div>
    )
}
