import { HeartPlusIcon, PackagePlusIcon, ShoppingCart, WalletIcon } from "lucide-react";

export const links = [
    {
        header: 'orders',
        href: "/my-order",
        icons: PackagePlusIcon
    },

    {
        header: 'favorites',
        href: "/favoutie",
        icons: HeartPlusIcon

    },
    {
        header: 'cart',
        href: "/cart",
        icons: ShoppingCart

    },
    {
        header: 'wallet',
        href: "/wallet",
        icons: WalletIcon

    },

]