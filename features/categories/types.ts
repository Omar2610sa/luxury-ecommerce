
export type Props = {
    params: Promise<{
        lang: string;
        id: number | undefined;
    }>;
    searchParams: Promise<{
        sub_cat?: string;
        sub_sub_cat?: string;
        min_price?: string;
        max_price?: string;
    }>;
};
export type PropsCategory = {
    categoryId: number
    searchParams: {
        sub_cat?: string
        sub_sub_cat?: string
        min_price?: string
        max_price?: string
    }
}
export interface Category {
    id: number;
    title: string;
    sub_categories: SubCategory[];
}

export interface SubCategory {
    id: number;
    title: string;
}
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