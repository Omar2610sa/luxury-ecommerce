import { Link } from "@/services/navigation"

import Image from "next/image"

import logo from "@/assets/image 44 (2) (1) 2 (1).png"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import googlePlay from "@/assets/icons/Google Play Black.png"
import ApplePlay from "@/assets/icons/Google Play Black (1).png"
import youtube from "@/assets/icons/youtube.png"
import tiktok from "@/assets/icons/tiktok.png"
import snapchat from "@/assets/icons/snapchat.png"
import instagram from "@/assets/icons/instagram.png"
import facebook from "@/assets/icons/facebook.png"
import { getTranslations } from 'next-intl/server';

const socials = [
    { name: "youtube", icon: youtube, href: "#" },
    { name: "tiktok", icon: tiktok, href: "#" },
    { name: "snapchat", icon: snapchat, href: "#" },
    { name: "instagram", icon: instagram, href: "#" },
    { name: "facebook", icon: facebook, href: "#" },
]

export default async function Footer() {
    const t = await getTranslations('Footer');


    return (
        <footer className="border-t">
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">

                {/* Col 1 - Logo & Info */}
                <div className="flex flex-col gap-4">
                    <Image src={logo} alt="Logo" width={120} height={120} />
                    <p className="text-primary leading-relaxed">
                        {t('description')}
                    </p>
                    <div className="flex flex-col gap-1 text-sm">
                        <p className="text-primary"><span className="font-semibold">Email:</span> {t('email')}</p>
                        <p className="text-primary"><span className="font-semibold">Phone:</span> {t('phone')}</p>
                        <p>
                            <span className="font-semibold text-primary">Main address: </span>
                            <Link href="#" className="text-primary underline text-xs">
                                {t('address')}
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Col 2 - Section */}
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-primary text-2xl">{t('section.title')}</h3>
                    <nav className="flex flex-col gap-4">
                        <Link href="#" className="hover:text-black text-primary underline transition-colors">{t('section.eveningFashion')}</Link>
                        <Link href="#" className="hover:text-black text-primary underline transition-colors">{t('section.leatherDecor')}</Link>
                        <Link href="#" className="hover:text-black text-primary underline transition-colors">{t('section.leatherClothing')}</Link>
                        <Link href="#" className="hover:text-black text-primary underline transition-colors">{t('section.leatherProducts')}</Link>
                    </nav>
                </div>

                {/* Col 3 - Center & Help */}
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-primary text-2xl">{t('help.title')}</h3>
                    <nav className="flex flex-col gap-4">
                        <Link href="#" className="hover:text-black text-primary underline transition-colors">{t('help.home')}</Link>
                        <Link href="#" className="hover:text-black text-primary underline transition-colors">{t('help.faq')}</Link>
                        <Link href="#" className="hover:text-black text-primary underline transition-colors">{t('help.howToBuy')}</Link>
                    </nav>
                </div>

                {/* Col 4 - Newsletter & App */}
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-primary text-2xl">{t('newsletter.title')}</h3>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder={t('newsletter.placeholder')}
                                className="flex-1 border px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                            />
                            <Button className="bg-primary text-white text-sm px-4 py-1.5 hover:bg-primary/90 hover:text-white transition-colors">
                                {t('newsletter.subscribe')}
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-primary text-2xl">{t('downloadApp')}</h3>
                        <div className="flex gap-2">
                            <Link href="#"><Image src={googlePlay} alt="Google Play" className="w-[140px] max-w-full" /></Link>
                            <Link href="#"><Image src={ApplePlay} alt="App Store" className="w-[140px] max-w-full" /></Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-5">
                        {socials.map((social) => (
                            <Link key={social.name} href={social.href} className="bg-primary p-3 flex justify-center items-center rounded-full hover:bg-primary/80 duration-300">
                                <Image src={social.icon} alt={social.name} width={20} height={20} className="size-4 object-contain" />
                            </Link>
                        ))}
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t">
                <div className="container flex items-center justify-between py-4 text-primary px-30">
                    <p>{t('rights')}</p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="text-primary hover:text-black transition-colors">{t('privacy')}</Link>
                        <Link href="#" className="text-primary hover:text-black transition-colors">{t('terms')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}