

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
    image: string
    main_category_id: number
}

export interface HomeData {
    sliders: Slider[];
    secondSlider: secondSlider[];
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
        videos: any[]
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
    id: number;
    price: number;
    currency: string;

    color: {
        id: number;
        title: string;
        hex: string;
    };

    size: {
        id: number;
        title: string;
    };
    images: []
quantity : number
}

export interface Product {
    id: number;
    title: string;
    short_desc: string
    long_desc: string
    main_image: {
        media: string
    }
    images: {
        media: string
    }
    details: ProductDetail[];
    brand: {
        title: string
        image: {
            media: string
        }
    }
} 