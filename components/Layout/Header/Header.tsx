import HeaderLinks from "@/components/HeaderLinks/HeaderLinks";
import { ChevronDownIcon, Mail, Phone, Search, User2Icon } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/image 44 (2) (1) 2 (1).png"
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "@/services/navigation";
import { LoginDialog } from "@/sections/Auth/LoginDialog";
import { cookies } from "next/headers";
import { SignUp } from "@/sections/Auth/SignUp";
import MobileHeader from "./MobileHeader";
import MobileTopHeader from "./MobileHeaderTop";
import FavouriteIcon from "@/components/FavoriteLink/FavLink";
import CartLink from "@/components/FavoriteLink/CartLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getTranslations } from 'next-intl/server';




export default async function Header() {
    const token = (await cookies()).get('token_luxary')?.value ?? null
    const t = await getTranslations('Header');
const menuItems = [
        {
            label: t('menu.categories.label'),
            items: [
                t('menu.categories.items.0'),
                t('menu.categories.items.1'),
                t('menu.categories.items.2'),
            ],
        },
        {
            label: t('menu.naturalLeather.label'),
            items: [
                t('menu.naturalLeather.items.0'),
                t('menu.naturalLeather.items.1'),
                t('menu.naturalLeather.items.2'),
            ],
        },
        {
            label: t('menu.fashion.label'),
            items: [
                t('menu.fashion.items.0'),
                t('menu.fashion.items.1'),
                t('menu.fashion.items.2'),
            ],
        },
        {
            label: t('menu.decor.label'),
            items: [
                t('menu.decor.items.0'),
                t('menu.decor.items.1'),
                t('menu.decor.items.2'),
            ],
        },

    ]
    return (
        <>
            <header className="hidden md:flex flex-col border-b shrink-0">
                {/* Top Nav */}
                <div className="bg-secondary flex justify-between items-center py-4 px-10">
                    {/* Phone & Email */}
                    <div className="flex flex-col md:flex-row items-center gap-8 text-sm">
                        <div className="flex items-center gap-2">
                            admin@gmail.com
                            <Mail className="size-4" />
                        </div>
                        <div className="flex items-center gap-2">
                            +966102030405
                            <Phone className="size-4" />
                        </div>
                    </div>
                    <HeaderLinks />
                </div>

                {/* Second Nav */}
                <nav className="grid grid-cols-[3fr_1.5fr] items-start justify-between gap-15  py-6 px-4  " >

                    <div className="flex justify-between items-center gap-6">

                        {/* Logo */}
                        <Link href="/" className="shrink-0">
                            <Image src={logo} className="size-22 object-cover" alt="logo" />
                        </Link>

                        {/* Search + Menu Items */}
                        <div className="flex flex-col gap-6 flex-1">

                            {/* Search */}
                            <div className="relative w-full max-w-2xl">
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    placeholder="البحث عن منتج"
                                    className="pr-9 text-right"

                                />
                            </div>
                            {/* Menu Items */}
                            <div className="flex items-center justify-between text-sm text-primary">
                                <div className="flex justify-between items-center gap-5">
                                    {menuItems.map((item) => (
                                        <DropdownMenu key={item.label}>
                                            <DropdownMenuTrigger className="flex items-center gap-1 whitespace-nowrap hover:text-foreground transition-colors cursor-pointer">
                                                {item.label}
                                                <ChevronDownIcon className="size-3.5 shrink-0" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent >
                                                <DropdownMenuGroup>
                                                    {item.items.map((subItem) => (
                                                        <DropdownMenuItem key={subItem} >
                                                            {subItem}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    {
                        !token && (

                            <div className="flex gap-3 items-center shrink-0">
                                <LoginDialog />
                                <SignUp />
                                <LanguageSwitcher />
                            </div>
                        )
                    }
                    {
                        token && (
                            <div className="flex gap-5 items-center shrink-0">
                                {/* Fav */}
                                <FavouriteIcon />
                                {/* notifation */}
                                <Link href="/profile" className="flex justify-center items-center  size-10 rounded-full bg-primary/30">
                                    <User2Icon className="size-4 text-primary" />
                                </Link>
                                {/* notifation */}
                                <CartLink />
                                {/* Language */}
                                <LanguageSwitcher />
                            </div>
                        )
                    }
                </nav>
            </header>
            <MobileTopHeader isLoggedIn={!!token} />
            <MobileHeader isLoggedIn={!!token} />
        </>

    )
}
