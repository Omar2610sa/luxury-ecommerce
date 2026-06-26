'use client'

import { Home, Search, ShoppingCartIcon, SparklesIcon, User2Icon } from "lucide-react"
import { Link } from "@/services/navigation"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

type Props = {
    isLoggedIn: boolean
}

export default function MobileHeader({ isLoggedIn }: Props) {
    const pathname = usePathname()
    const cleanPathname = pathname.replace(/^\/(en|ar)/, '') || '/'

    const t = useTranslations('MobileHeader');

    const links = [
        { name: t('home'), icon: Home, href: "/" },
        { name: t('categories'), icon: Search, href: "/categories/14" },
        { name: t('NewArrival'), icon: SparklesIcon, href: "/products" },
        { name: t('cart'), icon: ShoppingCartIcon, href: "/cart" },
        ...(isLoggedIn
            ? [{ name: t('profile'), icon: User2Icon, href: "/profile" }]
            : []),
    ]

    return (
        <nav className="fixed sub bottom-0 end-0 start-0 w-full border-t bg-white z-[100] drop-shadow-2xl md:hidden block">
            <div className="py-2 px-3">
                <div className="mini-links w-full flex items-center justify-around py-2">
                    {links.map((ele, index) => {
                        const isActive = cleanPathname === ele.href

                        return (
                            <Link
                                key={index}
                                href={ele.href}
                                className={cn(
                                    "flex items-center justify-center flex-col gap-1 transition-colors",
                                    isActive ? "text-primary" : "text-gray-500"
                                )}
                            >
                                <ele.icon className="size-5" />
                                <p className="text-md sm:text-sm">{ele.name}</p>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}