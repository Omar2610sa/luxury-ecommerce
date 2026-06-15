import { CircleOffIcon } from "lucide-react";

export default function NoInfo({ title, decs }: { title: string, decs?: string }) {
    return (
        <div className="container flex justify-center items-center flex-col gap-5">

            <div>
                <CircleOffIcon className="size-40 text-primary" />
            </div>
            <div className="text-center">
                <p className="text-xl">{title}</p>
                <p className="text-md text-gray-500">{decs}</p>
            </div>
        </div>
    )
}
