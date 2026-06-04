

export interface Slider {
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
