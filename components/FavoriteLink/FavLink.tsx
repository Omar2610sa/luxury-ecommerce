'use client'
import { FavouriteStore } from '@/store/useFavouriteStore'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import Cookies from "js-cookie"


export default function FavouriteIcon() {
    const { count } = FavouriteStore()
    const isRtl = Cookies.get('NEXT_LOCALE') == "ar"

    return (
        <Link href="/favourite" className="flex justify-center items-center relative size-10 rounded-full bg-primary/30">
            <Heart className="size-4 text-primary" />
            {count > 0 && (
                <span className={`absolute top-0 ${isRtl ? "left-1/3" : 'right-1/3'}`}>
                    <span className="animate-ping absolute  h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                    <span className="absolute h-3 w-3 rounded-full bg-red-500"></span>
                </span>
            )}
        </Link>
    )
}