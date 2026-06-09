import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb"
import CategoryFilter from "@/components/Filter/Filter"

type Props = {
    params: { id: string }
}

export default async function page({ params }: Props) {
    const { id } = await params
    const { data: category } = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/client/get_categories`).then(res => res.json())

    return (
        <div className="container flex flex-col gap-8" >

            <BreadCrumb secondLink="الأقسام" thirdLink={category?.title ?? ''} />
        </div>
    )
}