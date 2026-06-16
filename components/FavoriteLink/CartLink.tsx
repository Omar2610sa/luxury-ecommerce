'use client'
import { CartCount } from '@/store/useCountCartStore'
import {  ShoppingBasketIcon } from 'lucide-react'
import Link from 'next/link'

export default function CartLink() {
    const { count } = CartCount()

    return (
        <Link href="/cart" className="flex justify-center items-center relative size-10 rounded-full bg-primary/30">
            <ShoppingBasketIcon className="size-4 text-primary" />
            {count > 0 && (
                <span className="absolute top-0.5 left-1/3">
                    <span className="animate-ping absolute  h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                    <span className="absolute h-3 w-3 rounded-full bg-red-500"></span>
                </span>
            )}
        </Link>
    )
}