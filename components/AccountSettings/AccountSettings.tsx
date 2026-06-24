"use client"
// import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PackagePlusIcon, ChevronLeft, HeartPlusIcon, WalletIcon, Globe, LogOut, ShoppingCart } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Link } from "@/services/navigation"
;
import { useTranslations } from 'next-intl';



export default function AccountSettings() {
const t = useTranslations('Account Setting');
const router = useRouter();
    const handleLogout = async () => {
        Cookies.remove("token_luxary")
        router.push("/")
        router.refresh()
    };
const links = [
    {
        header: t('orders'),
        href: "/my-order",
        icons: PackagePlusIcon
    },

    {
        header: t('favorites'),
        href: "/favoutie",
        icons: HeartPlusIcon

    },
    {
        header: t('cart'),
        href: "/cart",
        icons: ShoppingCart

    },
    {
        header: t('wallet'),
        href: "/my-order",
        icons: WalletIcon

    },

]
    return (
        <Card className="p-4 rounded-lg bg-[rgba(246,247,252,1)] order-2 md:order-1">
            <CardContent className="p-0 space-y-4">

                {/* Header */}
                <div className="flex items-center justify-between pb-3  border-b-2 border-[#DEE0EA]">
                    <h3 className=" text-lg font-semibold">{t('account_title')}</h3>
                </div>

                {/* Body Btns */}

                {
                    links.map((ele, index) => {
                        return (
                            <Link href={`/profile${ele.href}`} key={index} className="flex my-8 justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="flex justify-center items-center rounded-full size-7 p-0.5 bg-white">
                                        <ele.icons className="size-5" />
                                    </div>
                                    <span className="font-medium text-lg">
                                        {ele.header}
                                    </span>
                                </div>
                                <ChevronLeft className="text-black/70" />
                            </Link>
                        )
                    })}


                <div className="flex items-center justify-between pb-3  ">
                    <h3 className=" text-lg font-semibold">{t('settings_title')}</h3>
                </div>
                <div className="bg-white p-1">

                    <Link href="/profile" className="flex py-5 justify-between items-center  ">
                        <div className="flex items-center gap-2">
                            <div className="flex justify-center items-center rounded-full size-7 p-0.5 bg-white">
                                <Globe className="size-5" />
                            </div>
                            <span className="font-medium text-lg">
                                {t('settings_title')}
                            </span>
                        </div>
                        <ChevronLeft className="text-black/70" />
                    </Link>
                    <hr />
                    <div className="flex  justify-between items-center cursor-pointer py-5" onClick={handleLogout}>
                        <div className="flex items-center gap-2">
                            <div className="flex justify-center items-center rounded-full size-7 p-0.5 bg-white">
                                <LogOut className="size-5 text-red-500" />
                            </div>
                            <span className="font-medium text-lg text-red-500">
                                {t('logout')}
                            </span>
                        </div>
                        <ChevronLeft className="text-red-500" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
