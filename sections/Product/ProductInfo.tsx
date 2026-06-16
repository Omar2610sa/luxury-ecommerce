import ProductImageCarousel from "@/components/ProductSwiper/ProductSwiper";
import { CartData, Product } from "@/interfaces/interfaces";
import Image from "next/image";
import Star from "@/assets/icons/star.png";
import Link from "next/link";
import {  ChevronLeftIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ColorSelector from "@/components/ColorSelector/ColorSelector";
import icon from "@/assets/icons/Encapsulated Group.png"
import ShopCard from "@/components/ShopCard/ShopCard";
import ShippingInfo from "@/components/ShippingInfo/ShippingInfo";
import NoInfo from "@/components/NoInfo/NoInfo";

import FavButton from "@/components/FavHeart/FavHeart";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";


export default async function ProductInfo({ product }: { product: Product }) {
    // const { data: review } = await serverApi<CartData>(`product/${product.id}/review`)
    // const reviews = review ?? []
    // const hasReviews = reviews.length > 0
    // console.log(review)
    return (

        <div className="grid md:grid-cols-2 gap-5 items-start">

            <ProductImageCarousel
                mainImage={product.main_image}
                images={product.details[0]?.images ?? []}
            />
            <div className="w-full flex flex-col gap-8">
                <h2 className="text-2xl font-semibold leading-tight">
                    {product.title}
                </h2>

                {product.details.map((detail) => (
                    <div key={detail.id} className="flex flex-col gap-3">
                        <div

                            className="flex justify-between items-center"
                        >
                            {/* Prices */}
                            <p className="text-2xl font-extrabold">
                                {detail.price} {detail.currency}
                            </p>
                        </div>
                        <div className="flex justify-between items-center border-b-2 py-3">
                            <p className="line-through text-xl text-gray-500 ">
                                950 جنيه
                            </p>
                            <div className="flex items-center justify-between gap-1">
                                <Image
                                    src={Star}
                                    alt="Star"
                                    className={`size-5 object-cover mt-1 fill-yellow-400 text-yellow-400`}
                                />
                                <span className="text-xl font-medium">
                                    4.8
                                </span>
                            </div>
                        </div>


                        {/* Description */}
                        <div className="border-b-2 border-[#DEE0EA]flex flex-col  py-3 gap-3">
                            <p className="text-xl text-gray-800  mb-5  ">
                                {
                                    product.short_desc
                                }
                            </p>
                            {
                                detail.quantity <= 10 && (

                                    <div className="flex justify-between items-center my-3 bg-red-100/80 py-2 px-4">
                                        <p className="font-medium ">
                                            <span className="font-semibold text-red-800 ml-3.5">
                                                شعار
                                            </span>
                                            متبقي عدد {detail.quantity} من الكمية
                                        </p>
                                    </div>
                                )
                            }
                            <div className="flex justify-between items-center bg-gray-100 py-2 px-4">
                                <p className="font-medium text-xl">
                                    العلامة التجارية: {product.brand.title}
                                </p>
                                <Image src={product.brand.image.media} alt={product.brand.title} width={56} height={56} className="object-contain " />
                            </div>
                        </div>

                        {/* Color & size */}
                        <div className=" border-b-2 border-[#DEE0EA]  py-2 flex flex-col  gap-5">
                            <div className="my-1.5">
                                <div className="flex items-center gap-2 justify-between mb-4">
                                    <span className="font-medium text-xl">لون</span>

                                    {/* Button Select */}
                                    <Select defaultValue={detail.color.title}>
                                        <SelectTrigger className=" px-4  rounded-full transition-all flex items-center gap-2 bg-[#F5F5F5] duration-300 text-center">
                                            <SelectValue placeholder="اللون" />
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
                                    <ColorSelector details={product.details} />
                                </div>
                            </div>
                            {/* Size */}
                            <div>
                                <div className="flex items-center gap-2 justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <span className="font-medium text-xl">الحجم</span>
                                        {/* Button Select */}
                                        <Select defaultValue={detail.size.title}>
                                            <SelectTrigger className=" px-4  rounded-full transition-all flex items-center gap-2 bg-[#F5F5F5] duration-300 text-center">
                                                <SelectValue placeholder="نوع" />
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
                                        <span className="font-medium text-sm lg:text-lg">مقاس جيد</span>
                                        <ChevronLeftIcon className="size-5" />
                                    </Link>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2 flex-wrap">
                                        {product.details.map((detail) => (
                                            <button
                                                key={detail.id}
                                                className="border-black px-6 py-1 border rounded-full font-semibold !text-sm lg:!text-base hover:bg-black hover:text-white transition-colors"
                                            >
                                                {detail.size.tag}
                                            </button>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Add shop And is_Fav */}
                        <div className="flex flex-col md:flex-row justify-center  items-center gap-6">
                            {/* Wishlist */}
                            <div className="flex items-center gap-5">
                                <FavButton productId={product.id} isFav={product.is_fave} />
                                <Button variant="outline" className="bg-white rounded-full p-1.5  shadow">
                                    <Image src={icon} alt="icon" className="size-6 text-gray-400" />
                                </Button>
                            </div>
                            <AddToCartButton productId={detail.id} />
                        </div>
                    </div>
                ))}
            </div>

            <div className=" w-full flex flex-col gap-8 ">
                <div className="py-4 px-5 bg-gray-100">
                    <div className="flex items-center gap-3">
                        <p className="text-xl font-medium underline">ملاحظات</p>
                        <div className="flex items-center justify-between gap-1">
                            <Image
                                src={Star}
                                alt="Star"
                                className={`size-5 object-cover mt-1 fill-yellow-400 text-yellow-400`}
                            />
                            <span className="text-xl font-medium">
                                4.8
                            </span>
                        </div>
                    </div>
                </div>
                {/* Notes */}
                <div className="flex flex-col gap-6">

                </div>
            </div>
            <div className="w-full flex flex-col gap-8">
                <ShippingInfo />
                <div className="flex flex-col gap-10">
                    <h3 className="text-2xl font-bold">مطابقة الخيارات</h3>

                    <div className="grid md:grid-cols-2  gap-3 ">
                        {
                            product?.complete_outfit.map((prod, index) => {
                                return (
                                    <ShopCard product={prod} key={index} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


                   
                    // {
                        
                    //     review.map((ele, index) => {
                    //         return (

                    //             <div key={index} className="p-6 border-2 border-gray-100 flex justify-between items-start">
                    //                 <div className="flex flex-col gap-4">
                    //                     <h3 className="text-2xl font-bold">{ele?.user_name}</h3>
                    //                     <p className="text-lg font-medium">اللون : {ele?.color}</p>
                    //                     <p className="text-lg font-medium">الحجم :  {ele?.size}</p>
                    //                     <p className="text-lg font-medium">{ele?.review}</p>
                    //                     {
                    //                         ele?.image?.media && (
                    //                             <Image src={ele?.image?.media} alt="alt" width={80} height={80} />
                    //                         )
                    //                     }
                    //                 </div>
                    //                 {/* Stars */}
                    //                 <div className="flex items-center gap-0.5">
                    //                     {Array.from({ length: 5 }).map((_, i) => (
                    //                         <StarIcon
                    //                             key={i}
                    //                             className={`size-5 ${i < Math.round(ele?.rate) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    //                         />
                    //                     ))}
                    //                 </div>
                    //             </div>
                    //         )
                    //     })

                    // }
                    
