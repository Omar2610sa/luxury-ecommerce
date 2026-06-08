import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { ForYou } from "@/interfaces/interfaces"
import { Heart, PoundSterling, SaudiRiyal, ShoppingCart, Star, ZapIcon } from "lucide-react"
import Image from "next/image"


export default function ShopCard({ product  }: { product: ForYou }) {

    return (
        <Card className="relative h-full max-w-xs rounded-none bg-gray-50/50 border-b  p-0 group hover:cursor-pointer overflow-hidden">

            {/* Discount Badge */}
            {product.offer_price > 0 && (
                <Badge className="absolute z-30 top-3 left-3 text-md p-4 bg-red-600 text-white rounded-none">
                    خصم %{product.detail.discount_offer}
                </Badge>
            )}

            {/* Wishlist */}
            <CardAction className="absolute z-30 top-3 right-3">
                <button className="bg-white rounded-full p-1.5 shadow">
                    <Heart className="size-6 text-gray-400" />
                </button>
            </CardAction>

            {/* Product Image */}
            <div className="relative">

                <Image
                    width={300}
                    height={300}
                    src={product.main_image.media}
                    alt={product.main_image.alt ?? product.title}
                    className="w-full h-[280px] object-cover object-top group-hover:scale-103 duration-300 "
                />

                {/* Badges */}
                <div className="absolute bottom-2 left-3 z-30 flex gap-1">
                    {product.best_seller && (
                        <Badge className="bg-gray-800 text-md p-4 rounded-none "><ZapIcon /> شائع</Badge>
                    )}
                </div>
            </div>

            <CardHeader className="gap-3 px-4  ">
                <div className="flex justify-between  pb-2">
                    {
                        product.is_trendy && (
                            <Badge className="bg-yellow-200/40 text-[#9F6913] text-md py-3 px-4 rounded-none">الأكثر شيوعاً</Badge>
                        )
                    }

                    <Badge variant={"destructive"} className=" text-md py-3 px-4 rounded-none">غير متوفر</Badge>
                </div>
                <CardTitle className="text-lg font-bold text-right leading-snug line-clamp-2">
                    {product.title}
                </CardTitle>
                <CardDescription className="text-xs font-thin text-right line-clamp-1">
                    {product.short_desc}
                </CardDescription>
                {/* Price */}
                <div className="flex justify-between items-start">

                    <span className="text-green-400 ml-4">
                        -20 %
                    </span>

                    <div className="flex text-right items-center justify-end gap-1">
                        {product.offer_price > 0 && (
                            <span className="text-xs line-through text-muted-foreground">
                                {product.detail.price} {product.detail.currency}
                            </span>
                        )}
                        <span className="font-bold ">
                            {product.offer_price > 0 ? product.offer_price : product.detail.price} {product.detail.currency}
                        </span>
                    </div>

                </div>

            </CardHeader>

            <CardFooter className="flex items-center justify-between px-4 pb-3">
                <div className="flex flex-col items-start gap-0.5">
                    {/* Stars */}
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`size-5 ${i < Math.round(product.detail.rate_avg) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                        ))}
                        <span className="text-lg text-muted-foreground ml-1">({product.detail.sold})</span>
                    </div>

                </div>

                {/* Cart Button */}
                <Button size="icon" className="rounded-full bg-yellow-200/40 w-10 h-10 text-[#9F6913] ">
                    <ShoppingCart className="size-5" />
                </Button>
            </CardFooter>

        </Card>
    )
}