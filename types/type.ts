type searchParams  = {
  searchParams: {
    main_category_id?: string
    sub_category_id?: string
    sub_sub_category_id?: string
    price_from?: string
    price_to?: string
    color_id?: string
    type?: string
    brand_id?: string
  }
}

type Detail = {
    id: number
    color: {
        id: number
        title: string
        hex: string
    }
}

type Props = {
    details: Detail[]
}

