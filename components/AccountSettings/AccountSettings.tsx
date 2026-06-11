"use client"
// import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PackagePlusIcon, ChevronLeft, HeartPlusIcon, WalletIcon, Globe, LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const links = [
    {
        header: "طلباتك",
        href: "/my-order",
        icons: PackagePlusIcon
    },

    {
        header: "المفضلة",
        href: "/my-order",
        icons: HeartPlusIcon

    },
    {
        header: "محفظتي",
        href: "/my-order",
        icons: WalletIcon

    },

]

export default function AccountSettings() {
const router = useRouter();
    const handleLogout = async () => {
        Cookies.remove("token_luxary")
        router.push("/")
        router.refresh()
    };
    return (
        <Card className="p-4 rounded-lg bg-[rgba(246,247,252,1)] sticky top-40">
            <CardContent className="p-0 space-y-4">

                {/* Header */}
                <div className="flex items-center justify-between pb-3  border-b-2 border-[#DEE0EA]">
                    <h3 className=" text-lg font-semibold">حسابك الشخصي</h3>
                </div>

                {/* Body Btns */}

                {
                    links.map((ele, index) => {
                        return (
                            <div key={index} className="flex my-8 justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="flex justify-center items-center rounded-full size-7 p-0.5 bg-white">
                                        <ele.icons className="size-5" />
                                    </div>
                                    <span className="font-medium text-lg">
                                        {ele.header}
                                    </span>
                                </div>
                                <ChevronLeft className="text-black/70" />
                            </div>
                        )
                    })}


                <div className="flex items-center justify-between pb-3  ">
                    <h3 className=" text-lg font-semibold">الإعدادات</h3>
                </div>
                <div className="bg-white p-1">

                    <div className="flex py-5 justify-between items-center  ">
                        <div className="flex items-center gap-2">
                            <div className="flex justify-center items-center rounded-full size-7 p-0.5 bg-white">
                                <Globe className="size-5" />
                            </div>
                            <span className="font-medium text-lg">
                                الإعدادات
                            </span>
                        </div>
                        <ChevronLeft className="text-black/70" />
                    </div>
                    <hr />
                    <div className="flex  justify-between items-center cursor-pointer py-5" onClick={handleLogout}>
                        <div className="flex items-center gap-2">
                            <div className="flex justify-center items-center rounded-full size-7 p-0.5 bg-white">
                                <LogOut className="size-5 text-red-500" />
                            </div>
                            <span className="font-medium text-lg text-red-500">
                                تسجيل خروج
                            </span>
                        </div>
                        <ChevronLeft className="text-red-500" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
