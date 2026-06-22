'use client'
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useTransition } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Plus, Minus, X } from "lucide-react"
import { useState } from "react"
import { ActiveFilter, CategoryFilterProps } from "@/interfaces/interfaces"

export default function CategoryFilter({ subCategories }: CategoryFilterProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    const selectedSubCat = searchParams.get("sub_cat") ?? ""
    const selectedSubSubCat = searchParams.get("sub_sub_cat") ?? ""
    const minPrice = Number(searchParams.get("min_price") ?? 0)
    const maxPrice = Number(searchParams.get("max_price") ?? 200000)

    const [openSections, setOpenSections] = useState({ categories: true, price: true })
    const [openSubItems, setOpenSubItems] = useState<Record<number, boolean>>({})
    const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice])

    const updateParams = useCallback((updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString())
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === "") {
                params.delete(key)
            } else {
                params.set(key, value)
            }
        })
        startTransition(() => {
            router.push(`?${params.toString()}`)
        })
    }, [searchParams, router])

    const handleSubCatChange = (id: string) => {
        const isActive = selectedSubCat === id
        if (isActive) {
            updateParams({ sub_cat: null, sub_sub_cat: null })
        } else {
            updateParams({ sub_cat: id, sub_sub_cat: null })
        }
    }

    const handleSubSubCatChange = (id: string) => {
        const isActive = selectedSubSubCat === id
        updateParams({ sub_sub_cat: isActive ? null : id })
    }

    const handlePriceChange = (values: number[]) => {
        setPriceRange(values)
    }

    const handlePriceCommit = (values: number[]) => {
        updateParams({
            min_price: values[0] === 0 ? null : values[0].toString(),
            max_price: values[1] === 200000 ? null : values[1].toString(),
        })
    }

    // Active Filters
    const activeFilters: ActiveFilter[] = []
    if (selectedSubCat) {
        const found = subCategories.find(c => c.id.toString() === selectedSubCat)
        if (found) activeFilters.push({ key: "sub_cat", value: selectedSubCat, label: found.title })
    }
    if (selectedSubSubCat) {
        let label = selectedSubSubCat
        subCategories.forEach(c => c.sub_sub_categories.forEach(ch => {
            if (ch.id.toString() === selectedSubSubCat) label = ch.title
        }))
        activeFilters.push({ key: "sub_sub_cat", value: selectedSubSubCat, label })
    }
    if (minPrice !== 0 || maxPrice !== 200000) {
        activeFilters.push({ key: "price", value: "range", label: `${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()} ج` })
    }

    const removeFilter = (key: string) => {
        if (key === "sub_cat") updateParams({ sub_cat: null, sub_sub_cat: null })
        else if (key === "sub_sub_cat") updateParams({ sub_sub_cat: null })
        else if (key === "price") {
            setPriceRange([0, 200000])
            updateParams({ min_price: null, max_price: null })
        }
    }

    const clearAll = () => {
        setPriceRange([0, 200000])
        updateParams({ sub_cat: null, sub_sub_cat: null, min_price: null, max_price: null })
    }

    const toggleSection = (key: keyof typeof openSections) =>
        setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))

    return (
        <Card className={`p-4 rounded-lg bg-[rgba(246,247,252,1)] sticky top-40 
            ${isPending ? "opacity-60 pointer-events-none" : ""}`}>
            <CardContent className="p-0 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-2">
                    <h3 className="text-primary text-lg font-semibold">التصنيف</h3>
                    {activeFilters.length > 0 && (
                        <Button variant="ghost" size="icon-lg" onClick={clearAll} className="text-primary h-auto p-1 text-sm">
                            مسح الكل
                        </Button>
                    )}
                </div>

                {/* Active Badges */}
                {activeFilters.length > 0 && (
                    <div className="flex flex-wrap gap-2 pb-2 border-b">
                        {activeFilters.map(f => (
                            <Badge key={f.key} variant="default" className="gap-1 h-8 rounded-md text-xs">
                                {f.label}
                                <button onClick={() => removeFilter(f.key)} className="hover:bg-white/30 duration-200 rounded-full p-0.5">
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Sub Categories */}
                <Collapsible open={openSections.categories} onOpenChange={() => toggleSection("categories")}>
                    <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between py-2 border-b">
                            <span className="text-sm font-medium">الفئات الفرعية</span>
                            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openSections.categories ? "rotate-180" : ""}`} />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2">
                        <RadioGroup value={selectedSubCat} className="space-y-1">
                            {subCategories.map(item => {
                                const hasChildren = item.sub_sub_categories.length > 0
                                const isOpen = openSubItems[item.id]
                                return (
                                    <div key={item.id}>
                                        <div className="flex items-center justify-between py-1.5">
                                            <div className="flex items-center gap-2 flex-1">
                                                <RadioGroupItem
                                                    value={item.id.toString()}
                                                    className="border-primary"
                                                    id={`cat-${item.id}`}
                                                    onClick={() => handleSubCatChange(item.id.toString())}
                                                />
                                                <Label htmlFor={`cat-${item.id}`} className="text-sm cursor-pointer">
                                                    {item.title}
                                                </Label>
                                            </div>
                                            {hasChildren && (
                                                <button
                                                    className="p-1 hover:bg-muted rounded"
                                                    onClick={() => setOpenSubItems(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                                                >
                                                    {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                                </button>
                                            )}
                                        </div>
                                        {hasChildren && isOpen && (
                                            <RadioGroup value={selectedSubSubCat} className="space-y-1 ms-5">
                                                {item.sub_sub_categories.map(child => (
                                                    <div key={child.id} className="flex items-center justify-between py-1.5">
                                                        <div className="flex items-center gap-2">
                                                            <RadioGroupItem
                                                                value={child.id.toString()}
                                                                id={`sub-${child.id}`}
                                                                onClick={() => handleSubSubCatChange(child.id.toString())}
                                                            />
                                                            <Label htmlFor={`sub-${child.id}`} className="text-sm cursor-pointer">
                                                                {child.title}
                                                            </Label>
                                                        </div>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        )}
                                    </div>
                                )
                            })}
                        </RadioGroup>
                    </CollapsibleContent>
                </Collapsible>

                {/* Price Range */}
                <Collapsible open={openSections.price} onOpenChange={() => toggleSection("price")} dir="ltr">
                    <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between py-2 border-b">
                            <span className="text-sm font-medium">نطاق السعر</span>
                            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openSections.price ? "rotate-180" : ""}`} />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 pb-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-3">
                            <span>{priceRange[0].toLocaleString()} ج</span>
                            <span>{priceRange[1].toLocaleString()} ج</span>
                        </div>
                        <Slider
                            value={priceRange}
                            // onValueChange={handlePriceChange}
                            // onValueCommit={handlePriceCommit}
                            min={0}
                            max={200000}
                            step={1000}
                            className="w-full"
                        />
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    )
}