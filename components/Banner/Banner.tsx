import Image from "next/image";


export default function Banner({banner} : {banner : string}) {
    return (
        <div className="relative container h-[600px] rounded-2xl">
            <Image
                src={banner}
                alt="Banner"
                fill
                className="absolute object-contain rounded-2xl z-20"
            />

        </div>
    )
}
