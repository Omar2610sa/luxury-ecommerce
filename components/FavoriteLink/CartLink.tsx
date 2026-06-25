'use client'
import { CartCount } from '@/store/useCountCartStore'
import { ShoppingBasketIcon } from 'lucide-react'
import Link from 'next/link'
import Cookies from "js-cookie"


export default function CartLink() {
    const { count } = CartCount()
    const isRtl = Cookies.get('NEXT_LOCALE') == "ar"

    return (
        <Link href="/cart" className="flex justify-center items-center relative size-10 rounded-full bg-primary/30">
            <ShoppingBasketIcon className="size-4 text-primary" />
            {count > 0 && (
                <span className={`absolute -top-1 ${isRtl ? "left-1/3" : 'right-1/3'}`}>
                    <span className="absolute size-4 rounded-full bg-red-500 flex justify-center items-center text-white text-xs">
                        {
                            count
                        }
                    </span>
                </span>
            )}
        </Link>
    )
}