// components/Layout/Header/MobileTopHeader.tsx
import Image from "next/image"
import { Link } from "@/services/navigation"
import logo from "@/assets/image 44 (2) (1) 2 (1).png"
import { LoginDialog } from "@/sections/Auth/LoginDialog"
import { SignUp } from "@/sections/Auth/SignUp"
import FavouriteIcon from "@/components/FavoriteLink/FavLink"
import CartLink from "@/components/FavoriteLink/CartLink"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"

type Props = {
    isLoggedIn: boolean
}

export default function MobileTopHeader({ isLoggedIn }: Props) {
    return (
        <header className="md:hidden flex flex-col border-b bg-white sticky top-0 z-[300]">

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
                                <FavouriteIcon />
                                <CartLink />

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
                        <LanguageSwitcher />
                    </div>

                </div>
            </div>
        </header>
    )
}