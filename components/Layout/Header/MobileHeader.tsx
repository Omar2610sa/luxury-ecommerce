'use client'

import { Home, Search, ShoppingCartIcon, SparklesIcon, User2Icon } from "lucide-react"
import { Link } from "@/services/navigation"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type Props = {
    isLoggedIn: boolean
}

export default function MobileHeader({ isLoggedIn }: Props) {
    const pathname = usePathname()

    const links = [
        {
            name: "الرئيسية",
            icon: Home,
            href: "/"
        },
        {
            name: "الأقسام",
            icon: Search,
            href: "/categories"
        },
        {
            name: "المنتجات",
            icon: SparklesIcon,
            href: "/products"
        },
        {
            name: "السلة",
            icon: ShoppingCartIcon,
            href: "/cart"
        },
        ...(isLoggedIn
            ? [
                {
                    name: "ملفي الشخصي",
                    icon: User2Icon,
                    href: "/profile",
                },
            ]
            : []),
    ]

    return (
        <nav className="fixed sub bottom-0 end-0 start-0 w-full border-t bg-white z-[100] drop-shadow-2xl md:hidden block">
            <div className="py-2 px-3">
                <div className="mini-links w-full flex items-center justify-around py-2">
                    {links.map((ele, index) => {
                        const isActive = pathname === ele.href

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