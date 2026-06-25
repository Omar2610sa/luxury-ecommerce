import Image from "next/image";
import logo from "@/assets/icons/fi_263417.png"
import MainButton from "../Layout/MainButton";
import { getTranslations } from 'next-intl/server';
import { Link } from "@/services/navigation";

export default async function NoFav() {
    const t = await getTranslations('NoFav');

    return (
        <div className="container flex justify-center items-center flex-col gap-5">
            <div>
                <Image src={logo} alt="image" className="size-40" />
            </div>
            <div className="text-center flex flex-col justify-center items-center gap-3">
                <p className="text-xl">{t('title')}</p>
                <p className="text-md text-gray-500">{t('description')}</p>
                <Link href='/'>
                    <MainButton text={t('button')} />
                </Link>
            </div>
        </div>
    )
}
