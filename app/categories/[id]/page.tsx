import CategoryFilter from "@/components/Filter/Filter"

type Props = {
    params: { id: string }
}

export default async function page({ params }: Props) {
    const { id } = await params

    return (
        <div className="container max-w-xl">
            
            <CategoryFilter />
        </div>
    )
}