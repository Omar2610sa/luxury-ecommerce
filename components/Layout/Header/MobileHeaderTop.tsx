// components/Layout/Header/MobileTopHeader.tsx
import Image from "next/image"
import Link from "next/link"
import { ChevronDownIcon, Heart, ShoppingBasketIcon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import logo from "@/assets/image 44 (2) (1) 2 (1).png"
import flag from "@/assets/icons/saudia.png"
import flag2 from "@/assets/icons/english(3-5).svg"
import MobileSearch from "./MobileSearch"
import { LoginDialog } from "@/sections/Auth/LoginDialog"
import { SignUp } from "@/sections/Auth/SignUp"

type Props = {
    isLoggedIn: boolean
}

export default function MobileTopHeader({ isLoggedIn }: Props) {
    return (
        <header className="md:hidden flex flex-col border-b bg-white [&_nav]:translate-y-0 [&_nav]:!py-3 [&_nav_.sub2]:!top-[108px] [&_.sub]:hidden [&_nav]:fixed lg:[&_nav]:!py-3 [&_nav]:bg-white [&_nav]:shadow top-0 w-full transition-all  ">
            <nav className="absolute start-0 [&_.sub2]:!top-[140px]  top-0 z-[1000] transition-all duration-300 w-full py-3 lg:py-6 end-0">

            <div className="flex items-center justify-between px-4 py-3 gap-3">
                {/* Logo */}
                <Link href="/" className="shrink-0">
                    <Image src={logo} alt="logo" className="size-12 object-cover" />
                </Link>
                <div className="flex items-center gap-3 shrink-0">

                    <div className="flex items-center gap-3 shrink-0">
                        {/* Notifications */}
                        {isLoggedIn && (
                            <>
                                <Link
                                    href="/favourite"
                                    className="flex justify-center items-center size-9 rounded-full bg-primary/30"
                                >
                                    <Heart className="size-4 text-primary" />
                                </Link>
                                <Link
                                    href="/cart"
                                    className="flex justify-center items-center size-9 rounded-full bg-primary/30"
                                >
                                    <ShoppingBasketIcon className="size-4 text-primary" />
                                </Link>
                            </>
                        )}
                        {!isLoggedIn && (
                            <>
                                <LoginDialog />
                                <SignUp />
                            </>

                        )

                        }
                        {/* <MobileSearch /> */}

                        {/* Language */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1 cursor-pointer">
                                <Image src={flag} alt="flag" className="size-6 object-contain rounded-xs" />
                                <ChevronDownIcon className="size-3.5" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Image src={flag} alt="flag" className="size-6 ml-2 object-contain rounded-xs" />
                                        العربية
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Image src={flag2} alt="flag" className="size-6 ml-2 object-contain rounded-xs" />
                                        الإنجليزية
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                </div>
            </div>
            </nav>
        </header>
    )
}