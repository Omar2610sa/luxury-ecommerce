import HeaderLinks from "@/components/HeaderLinks/HeaderLinks";
import { ChevronDownIcon, Mail, Phone, Search } from "lucide-react";
import MainButton from "../MainButton";
import Image from "next/image";

import logo from "@/assets/image 44 (2) (1) 2 (1).png"
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LoginDialog } from "@/sections/Auth/LoginDialog";



const menuItems = [
    {
        label: "تسوق حسب الفئات",
        items: ["حقائب جلدية", "أحذية جلدية", "حزام جلدي"],
    },
    {
        label: "منتجات الجلود الطبيعية",
        items: ["حقائب جلدية", "أحذية جلدية", "حزام جلدي"],
    },
    {
        label: "ملابس وأزياء الجلود الطبيعية",
        items: ["جاكيت جلدي", "بنطلون جلدي", "تنورة جلدية"],
    },
    {
        label: "الديكورات الجلدية",
        items: ["إطارات صور", "وسائد جلدية", "سجادة جلدية"],
    },
    {
        label: "ازياء السهرة",
        items: ["فستان سهرة", "بدلة رسمية", "إكسسوارات سهرة"],
    },
]

export default function Header() {
    return (
        <header className="flex flex-col border-b ">
            {/* Top Nav */}
            <div className="bg-secondary flex justify-between items-center py-4 px-10">
                {/* Phone & Email */}
                <div className="flex items-center gap-8 text-sm">
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
            <nav className="grid grid-cols-[2fr_0.5fr] items-start justify-between gap-15  py-6 px-4  " >

                <div className="flex justify-between items-center gap-12">

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

                {/* Buttons */}
                <div className="flex gap-3 items-center shrink-0">
                    <LoginDialog />    
                    <MainButton text="انشاء حساب جديد" />
                </div>

            </nav>
        </header>
    )
}
