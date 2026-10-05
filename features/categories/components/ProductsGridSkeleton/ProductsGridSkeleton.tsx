export default function ProductsGridSkeleton() {
    return (
        <div className="grid lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl bg-gray-100 animate-pulse h-[300px]" />
            ))}
        </div>
    )
}