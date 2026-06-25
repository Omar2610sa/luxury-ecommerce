'use client'

import ProductImageCarousel from "@/components/ProductSwiper/ProductSwiper";
import { Product } from "@/interfaces/interfaces";
import Image from "next/image";
import Star from "@/assets/icons/star.png";
import { Link } from "@/services/navigation"
    ;
import { ChevronLeftIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ColorSelector from "@/components/ColorSelector/ColorSelector";
import icon from "@/assets/icons/Encapsulated Group.png"
import ShopCard from "@/components/ShopCard/ShopCard";
import ShippingInfo from "@/components/ShippingInfo/ShippingInfo";
import FavButton from "@/components/FavHeart/FavHeart";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import NoInfo from "@/components/NoInfo/NoInfo";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ShopCardClient from "@/components/ShopCard/ShopCardClient";


export default function ProductInfo({ product }: { product: Product }) {
    // const { data: review } = await serverApi<CartData>(`product/${product.id}/review`)
    const reviews = product.details[0].reviews ?? []
    const hasReviews = reviews.length > 0
    const description = product.details[0] ?? []
    // console.log(review)
    const t = useTranslations('ProductInfo');
    const [selectedDetail, setSelectedDetail] = useState(product.details[0])

    return (
        <div className="grid md:grid-cols-2 gap-5 items-start">
            <ProductImageCarousel
                mainImage={selectedDetail?.images[0] ?? product.main_image}
                images={selectedDetail?.images.slice(1) ?? []}  // ✅ بيشيل أول صورة علشان متتعرضش مرتين
            />
            <div className="w-full flex flex-col gap-8">
                <h2 className="text-2xl font-semibold leading-tight">
                    {product.title}
                </h2>

                {product.details.map((detail) => (
                    <div key={detail.id} className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <p className="text-2xl font-extrabold">
                                {selectedDetail.price} {selectedDetail.currency}
                            </p>
                        </div>
                        <div className="flex justify-between items-center border-b-2 py-3">
                            <p className="line-through text-xl text-gray-500">
                                {/* {t('oldPrice')} */}
                            </p>
                            <div className="flex items-center justify-between gap-1">
                                <Image src={Star} alt="Star" className="size-5 object-cover mt-1 fill-yellow-400 text-yellow-400" />
                                <span className="text-xl font-medium">{detail.rate_avg}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="border-b-2 border-[#DEE0EA] flex flex-col py-3 gap-3">
                            <p className="text-xl text-gray-800 mb-5">{product.short_desc}</p>

                            {detail.quantity === 0 ? (
                                <div className="flex justify-between items-center my-3 bg-red-200/80 py-2 px-4">
                                    <p className="font-medium">
                                        <span className="font-semibold text-red-800 ml-3.5">
                                            {t('outOfStock')}
                                        </span>
                                    </p>
                                </div>
                            ) : detail.quantity <= 10 && (
                                <div className="flex justify-between items-center my-3 bg-red-100/80 py-2 px-4">
                                    <p className="font-medium">
                                        {t('lowStock', { quantity: detail.quantity })}
                                    </p>
                                </div>
                            )}

                            {product.brand && (
                                <div className="flex justify-between items-center bg-gray-100 py-2 px-4">
                                    <p className="font-medium text-xl">
                                        {t('brand')}: {product.brand.title}
                                    </p>
                                    <Image src={product.brand.image.media} alt={product.brand.title} width={56} height={56} className="object-contain" />
                                </div>
                            )}
                        </div>

                        {/* Color & Size */}
                        <div className="border-b-2 border-[#DEE0EA] py-2 flex flex-col gap-5">
                            <div className="my-1.5">
                                <div className="flex items-center gap-2 justify-between mb-4">
                                    <span className="font-medium text-xl">{t('color')}</span>
                                    <Select value={selectedDetail.color.title}
                                        onValueChange={(value) => {
                                            const detail = product.details.find(d => d.color.title === value)
                                            if (detail) setSelectedDetail(detail)
                                        }} >
                                        <SelectTrigger className="px-4 rounded-full transition-all  flex items-center gap-2 bg-[#F5F5F5] duration-300 text-center">
                                            <SelectValue placeholder={t('colorPlaceholder')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {product.details.map((detail) => (
                                                <SelectItem key={detail.id} value={detail.color.title}>
                                                    {detail.color.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    <ColorSelector
                                        details={product.details}
                                        // onChange={(detail) => setSelectedDetail(detail)}
                                    />
                                </div>
                            </div>

                            {/* Size */}
                            <div>
                                <div className="flex items-center gap-2 justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <span className="font-medium text-xl">{t('size')}</span>
                                        <Select defaultValue={detail.size.title}>
                                            <SelectTrigger className="px-4 rounded-full transition-all flex items-center gap-2 bg-[#F5F5F5] duration-300 text-center">
                                                <SelectValue placeholder={t('sizePlaceholder')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {product.details.map((detail) => (
                                                    <SelectItem key={detail.id} value={detail.size.title}>
                                                        {detail.size.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Link href="/" className="flex items-center gap-3">
                                        <span className="font-medium text-sm lg:text-lg">{t('sizeGuide')}</span>
                                        <ChevronLeftIcon className="size-5" />
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2 flex-wrap">
                                        {product.details.map((detail) => (
                                            <button key={detail.id} className="border-black px-6 py-1 border rounded-full font-semibold !text-sm lg:!text-base hover:bg-black hover:text-white transition-colors">
                                                {detail.size.tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart & Fav */}
                        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                            <div className="flex items-center gap-5">
                                <FavButton productId={product.id} isFav={product.is_fave} />
                                <Button variant="outline" className="bg-white rounded-full p-1.5 shadow">
                                    <Image src={icon} alt="icon" className="size-6 text-gray-400" />
                                </Button>
                            </div>
                            <AddToCartButton productId={selectedDetail.id} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Reviews */}
            <div className="w-full flex flex-col gap-8">
                <div className="py-4 px-5 bg-gray-100">
                    <div className="flex items-center gap-3">
                        <p className="text-xl font-medium underline">{t('notes')}</p>
                        <div className="flex items-center justify-between gap-1">
                            <Image src={Star} alt="Star" className="size-5 object-cover mt-1 fill-yellow-400 text-yellow-400" />
                            <span className="text-xl font-medium">{product?.details[0]?.rate_avg}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {hasReviews ? (
                        product?.details.map((ele, index) => (
                            <div key={index}>
                                {ele.reviews.map((ele, index) => (
                                    <div key={index} className="p-6 border-2 border-gray-100 flex justify-between items-start">
                                        <div className="flex flex-col gap-4">
                                            <h3 className="text-2xl font-bold">{ele?.user_name}</h3>
                                            <p className="text-lg font-medium">{t('reviewColor')} : {ele?.color}</p>
                                            <p className="text-lg font-medium">{t('reviewSize')} : {ele?.size}</p>
                                            <p className="text-lg font-medium">{ele?.review}</p>
                                            {ele?.image?.media && (
                                                <Image src={ele?.image?.media} alt="alt" width={80} height={80} />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <StarIcon key={i} className={`size-5 ${i < Math.round(ele?.rate) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <NoInfo title={t('noReviews')} />
                    )}
                </div>
            </div>

            {/* Match Options */}
            <div className="w-full flex flex-col gap-8">
                <ShippingInfo />
                <div className="flex flex-col gap-10">
                    <h3 className="text-2xl font-bold">{t('matchOptions')}</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                        {product?.complete_outfit.map((prod, index) => (
                            <ShopCardClient product={prod} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


