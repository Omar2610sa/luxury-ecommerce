

export interface Slider {
    id: number
    name: string
    desc: string
    image: string
}
export interface secondSlider {
    id: number
    title: string
    gender: string
    sub_categories: [
        {
            id: number
            title: string
            image: string
        }
    ]
    country: {
        name: string
    }
    image: string
    main_category_id: number
}

export interface HomeData {
    slider: Slider[];
    secondSlider: secondSlider[];
    main_categories: []
    best_seller: []
    middle_slider: { image: string, id: number }
    for_you: []
    footer_slider: { image: string, id: number }
}
export interface ProductData {
    title: string
    product: Product[]
    recommended: []
    also_may_like: []
}
export interface CartData {
    title: string
    data: Cart

}



export interface HomeResponse {
    status: boolean;
    message: string;
    data: HomeData;
}

export interface ForYou {
    id: number
    title: string
    short_desc: string
    long_desc: string
    is_trendy: boolean
    best_seller: boolean
    is_new_arrival: boolean
    detail: {
        id: number
        product_id: number
        is_fave: boolean
        color: {
            id: number
            title: string
            hex: string
        }
        size: {
            id: number
            title: string
            title_ar: string
            title_en: string
            tag: string
            ordering: number
        }
        rate_avg: number
        quantity: number
        sold: number
        sku: string
        is_default: boolean
        price: number
        currency: string
        in_stock: boolean
        standard_shipping_price: number
        express_shipping_price: number
        images: {
            id: number
            media: string
            alt: string | null
        }[]
        // videos: any[]
        discount_coupon: number
        coupon_value: number
        price_after_coupon: number
        discount_coupon_type: string | null
        price_after_offer: number
        discount_offer: number
        seller: string | null
    }
    is_fave: boolean
    main_image: {
        id: number
        media: string
        alt: string | null
    }
    in_stock: boolean
    discount_offer: number
}

// في interfaces.ts
export interface SubSubCategory {
    id: number
    title: string
    image: string
}

export interface SubCategory {
    id: number
    title: string
    image: string
    sub_sub_categories: SubSubCategory[]
}

export interface ActiveFilter {
    key: string;
    value: string;
    label: string;
}

export interface CategoryFilterProps {
    subCategories: SubCategory[]
}


export interface ProductDetail {
    id: number
    product_id: number
    is_fave: boolean
    color: {
        id: number
        title: string
        hex: string
    }
    size: {
        id: number
        title: string
        title_ar: string
        title_en: string
        tag: string
        ordering: number
    }
    rate_avg: number
    quantity: number
    sold: number
    sku: string
    is_default: boolean
    price: number
    currency: string
    in_stock: boolean
    standard_shipping_price: number
    express_shipping_price: number
    images: {
        id: number
        media: string
        alt: string | null
    }[]
    // videos: any[]
    discount_coupon: number
    coupon_value: number
    price_after_coupon: number
    discount_coupon_type: string | null
    price_after_offer: number
    discount_offer: number
    seller: string | null
}

export interface Product {
    id: number
    title: string
    short_desc: string
    long_desc: string
    is_trendy: boolean
    best_seller: boolean
    is_new_arrival: boolean
    detail: ProductDetail
    details: ProductDetail[]
    brand: {
        image: {
            media: string
        }
        title: string
    }
    complete_outfit: []
    offer_price: number
    is_fave: boolean
    main_image: {
        id: number
        media: string
        alt: string | null
    }
    in_stock: boolean
    discount_offer: number

}


export interface Cart {
    items: [
        {
            id: number
            title: string
            color: string
            price: number
            images: [{
                media: string
                alt: string
            }]
            product_cart_id: number
            quantity: number
            total: number
            offer_price: number
            express_shipping_price: number
            currency: string
        }
    ]
}

export interface Favorite {
    product: Product
}
export interface Slider {
    product: Product
    product_details: ProductDetail[]
    name: string
}