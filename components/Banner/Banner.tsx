import Image from "next/image";
import Link from "next/link";


export default function Banner({ banner }: { banner: { image: string, id: number } }) {
    return (
        <Link href={`/slider/${banner?.id}`}>
            <div className="relative container h-[400px] my-6  rounded-2xl">
                <Image
                    src={banner?.image || ''}
                    alt="Banner"
                    fill
                    className="absolute object-contain  rounded-2xl z-20"
                />

            </div>
        </Link>
    )
}
