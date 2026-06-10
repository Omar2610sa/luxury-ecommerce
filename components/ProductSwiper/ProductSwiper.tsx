'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel'
import Image from 'next/image'

type ProductImage = {
    id: number
    media: string
    alt: string | null
}

type Props = {
    mainImage: {
        id?: number
        media: string
        alt?: string | null
    }
    images: ProductImage[]
}

const ProductImageCarousel = ({ mainImage, images }: Props) => {
    const [mainApi, setMainApi] = React.useState<CarouselApi>()
    const [thumbApi, setThumbApi] = React.useState<CarouselApi>()
    const [activeIndex, setActiveIndex] = React.useState(0)
    const [loadedImages, setLoadedImages] = React.useState<Record<number, boolean>>({})
    const [dir, setDir] = React.useState<'ltr' | 'rtl'>('ltr')

    React.useEffect(() => {
        const htmlDir = (document.documentElement.dir || document.body.dir || 'ltr') as 'ltr' | 'rtl'
        setDir(htmlDir)
    }, [])

    const allImages = React.useMemo(
        () => [{ id: mainImage.id ?? 0, media: mainImage.media, alt: mainImage.alt ?? null }, ...images],
        [mainImage, images]
    )

    const onThumbClick = React.useCallback(
        (index: number) => {
            if (!mainApi) return
            mainApi.scrollTo(index)
        },
        [mainApi]
    )

    const onSelect = React.useCallback(() => {
        if (!mainApi || !thumbApi) return
        const selected = mainApi.selectedScrollSnap()
        setActiveIndex(selected)
        thumbApi.scrollTo(selected)
    }, [mainApi, thumbApi])

    React.useEffect(() => {
        if (!mainApi) return
        onSelect()
        mainApi.on('select', onSelect)
        mainApi.on('reInit', onSelect)
        return () => {
            mainApi.off('select', onSelect)
            mainApi.off('reInit', onSelect)
        }
    }, [mainApi, onSelect])

    const handleImageLoad = (index: number) => {
        setLoadedImages((prev) => ({ ...prev, [index]: true }))
    }

    return (
        <div className={cn('flex gap-3 w-full h-full', dir === 'rtl' ? 'flex-row-reverse' : 'flex-row')}>

            {/* Main Image */}
            <Carousel
                setApi={setMainApi}
                opts={{ loop: true, direction: dir }}
                className="flex-1 h-full"
            >
                <CarouselContent className="ml-0">
                    {allImages.map((image, index) => (
                        <CarouselItem key={image.id} className="h-[650px]  pl-0">
                            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-200">
                                {!loadedImages[index] && (
                                    <div className="absolute inset-0 animate-pulse  bg-gray-200" />
                                )}
                                <Image
                                    src={image.media}
                                    alt={image.alt ?? ''}
                                    fill
                                    className={cn(
                                        'object-cover transition-opacity  duration-300',
                                        loadedImages[index] ? 'opacity-100' : 'opacity-0'
                                    )}
                                    onLoad={() => handleImageLoad(index)}
                                />
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                    {allImages.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => onThumbClick(i)}
                                            className={cn(
                                                'w-2 h-2 rounded-full transition-all duration-200',
                                                activeIndex === i
                                                    ? 'bg-black scale-125'
                                                    : 'bg-white/50 hover:bg-white/75'
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Thumbnails */}
            <Carousel
                setApi={setThumbApi}
                opts={{ align: 'start', dragFree: true }}
                orientation="vertical"
                className="h-[700px] w-[80px]"
            >
                <CarouselContent className="-mt-2 h-[750px]">
                    {allImages.map((image, index) => (
                        <CarouselItem
                            key={image.id}
                            className="basis-auto pt-2 cursor-pointer"
                            onClick={() => onThumbClick(index)}
                        >
                            <div
                                className={cn(
                                    'relative w-[80px] h-[128px] rounded-xl overflow-hidden border-2 transition-all duration-200 bg-gray-100',
                                    activeIndex === index
                                        ? 'border-primary opacity-100'
                                        : 'border-transparent opacity-50 hover:opacity-75'
                                )}
                            >
                                {!loadedImages[index] && (
                                    <div className="absolute inset-0 animate-pulse bg-gray-200" />
                                )}
                                <Image
                                    src={image.media}
                                    alt={image.alt ?? ''}
                                    fill
                                    className={cn(
                                        'object-cover transition-opacity duration-300',
                                        loadedImages[index] ? 'opacity-100' : 'opacity-0'
                                    )}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

        </div>
    )
}

export default ProductImageCarousel