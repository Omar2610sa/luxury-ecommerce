export interface ShopCardProps {
    image: string
    title: string
    subtitle: string
    oldPrice: number
    newPrice: number
    discount: number
    rating: number
    reviewCount: number
    isTrending?: boolean
    isBestSeller?: boolean
    isAvailable?: boolean
}