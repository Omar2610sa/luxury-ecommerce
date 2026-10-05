import Image from "next/image";
import { Link } from "@/services/navigation"
    ;
import FadeIn from "@/Animations/Fadding";


export default function Banner({ banner }: { banner: { image: string, id: number } }) {
    return (
        <FadeIn direction="up">
            <Link href={`/slider/${banner?.id}`}>
                <div className="relative container h-[180px] md:h-[450px] my-6  rounded-2xl">
                    <Image
                        src={banner?.image || ''}
                        alt="Banner"
                        fill
                        className="absolute object-contain  rounded-2xl z-20"
                    />
                </div>
            </Link>
        </FadeIn>
    )
}
