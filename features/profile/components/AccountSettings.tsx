"use client"
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Globe, LogOut, UserRoundXIcon } from "lucide-react";
import { Link } from "@/services/navigation"
import { useTranslations } from 'next-intl';
import { useLogout } from "@/features/auth/utils/logout";
import { useDeleteAccount } from "@/features/profile/utils/deleteAccount";
import { links } from "../utils/accountsLinks";
import Cookies from "js-cookie"


export default function AccountSettings() {
    const t = useTranslations('Account Setting');
    const { handleLogout } = useLogout({ title: t('logoutQ') })
    const { handleDeleteAccount } = useDeleteAccount({ title: t('DeleteQ') })
    const isRtl = Cookies.get('NEXT_LOCALE') === "ar"

    return (
        <Card className="p-4 rounded-lg bg-[rgba(246,247,252,1)] order-2 md:order-1">
            <CardContent className="p-0 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3  border-b-2 border-[#DEE0EA]">
                    <h3 className=" text-lg font-semibold">{t('account_title')}</h3>
                </div>

                {links.map((ele, index) => {
                    return (
                        <Link href={`/profile${ele.href}`} key={index} className="flex my-8 justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="flex justify-center items-center rounded-full size-7 p-0.5 bg-white">
                                    <ele.icons className="size-5" />
                                </div>
                                <span className="font-medium text-lg">
                                    {t(ele.header)}
                                </span>
                            </div>
                            {isRtl ? <ChevronLeft className="text-black/70" /> : <ChevronRight className="text-black/70" />}
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
                        {isRtl ? <ChevronLeft className="text-black/70" /> : <ChevronRight className="text-black/70" />}
                    </Link>
                    <hr />
                    <div className="flex  justify-between items-center cursor-pointer py-5" onClick={handleDeleteAccount} >
                        <div className="flex items-center gap-2">
                            <div className="flex justify-center items-center rounded-full size-7 p-0.5 bg-white">
                                <UserRoundXIcon className="size-5 text-red-500" />
                            </div>
                            <span className="font-medium text-lg text-red-500">
                                {t('Delete')}
                            </span>
                        </div>
                        {isRtl ? <ChevronLeft className="text-red-500" /> : <ChevronRight className="text-red-500" />}
                    </div>
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
                        {isRtl ? <ChevronLeft className="text-red-500" /> : <ChevronRight className="text-red-500" />}

                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
