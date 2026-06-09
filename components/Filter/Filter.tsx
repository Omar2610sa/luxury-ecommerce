'use client'

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Plus, Minus, X } from "lucide-react";
import { ActiveFilter, CategoryFilterProps, SubCategory } from "@/interfaces/interfaces";





export default function CategoryFilter({ subCategories }: CategoryFilterProps) {
    const [openSections, setOpenSections] = useState({
        categories: true,
        price: true,
    });
    const [openSubItems, setOpenSubItems] = useState<Record<number, boolean>>({});
    const [selectedSubCat, setSelectedSubCat] = useState<string>("");
    const [selectedSubSubCat, setSelectedSubSubCat] = useState<string>("");
    const [priceRange, setPriceRange] = useState<number[]>([0, 200000]);

    const activeFilters: ActiveFilter[] = [];

    if (selectedSubCat) {
        const found = subCategories.find(c => c.id.toString() === selectedSubCat);
        if (found) activeFilters.push({ key: 'sub_cat', value: selectedSubCat, label: found.title });
    }
    if (selectedSubSubCat) {
        let label = selectedSubSubCat;
        subCategories.forEach(c => c.sub_sub_categories.forEach(ch => {
            if (ch.id.toString() === selectedSubSubCat) label = ch.title;
        }));
        activeFilters.push({ key: 'sub_sub_cat', value: selectedSubSubCat, label });
    }

    if (priceRange[0] !== 0 || priceRange[1] !== 200000) {
        activeFilters.push({ key: 'price', value: 'range', label: `${priceRange[0]} - ${priceRange[1]} ج` });
    }

    const removeFilter = (key: string) => {
        if (key === 'sub_cat') { setSelectedSubCat(""); setSelectedSubSubCat(""); }
        else if (key === 'sub_sub_cat') setSelectedSubSubCat("");
        else if (key === 'price') setPriceRange([0, 200000]);
    };

    const clearAll = () => {
        setSelectedSubCat("");
        setSelectedSubSubCat("");
        setPriceRange([0, 200000]);
    };


    const toggleSection = (key: keyof typeof openSections) =>
        setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <Card className="p-4 rounded-lg bg-[rgba(246,247,252,1)] sticky top-40">
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
                                <button onClick={() => removeFilter(f.key)} className="hover:bg-muted rounded-full p-0.5">
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Sub Categories */}
                <Collapsible open={openSections.categories} onOpenChange={() => toggleSection('categories')}>
                    <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between py-2 border-b">
                            <span className="text-sm font-medium">الفئات الفرعية</span>
                            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openSections.categories ? 'rotate-180' : ''}`} />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2">
                        <RadioGroup value={selectedSubCat} className="space-y-1">
                            {subCategories.map(item => {
                                const hasChildren = item.sub_sub_categories.length > 0;
                                const isOpen = openSubItems[item.id];

                                return (
                                    <div key={item.id}>
                                        <div className="flex items-center justify-between py-1.5">
                                            <div className="flex items-center gap-2 flex-1">
                                                <RadioGroupItem
                                                    value={item.id.toString()}
                                                    className="border-primary"
                                                    id={`cat-${item.id}`}
                                                    onClick={() => {
                                                        const isActive = selectedSubCat === item.id.toString();
                                                        setSelectedSubCat(isActive ? "" : item.id.toString());
                                                        setSelectedSubSubCat("");
                                                    }}
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

                                        {/* Sub Sub Categories */}
                                        {hasChildren && isOpen && (
                                            <RadioGroup value={selectedSubSubCat} className="space-y-1 ms-5">
                                                {item.sub_sub_categories.map(child => (
                                                    <div key={child.id} className="flex items-center justify-between py-1.5">
                                                        <div className="flex items-center gap-2">
                                                            <RadioGroupItem
                                                                value={child.id.toString()}
                                                                id={`sub-${child.id}`}
                                                                onClick={() => {
                                                                    const isActive = selectedSubSubCat === child.id.toString();
                                                                    setSelectedSubSubCat(isActive ? "" : child.id.toString());
                                                                }}
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
                                );
                            })}
                        </RadioGroup>
                    </CollapsibleContent>
                </Collapsible>


                {/* Price Range */}
                <Collapsible open={openSections.price} onOpenChange={() => toggleSection('price')} dir="ltr">
                    <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between py-2 border-b">
                            <span className="text-sm font-medium">نطاق السعر</span>
                            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openSections.price ? 'rotate-180' : ''}`} />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 pb-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-3">
                            <span>{priceRange[0].toLocaleString()} ج</span>
                            <span>{priceRange[1].toLocaleString()} ج</span>
                        </div>
                        <Slider
                            value={priceRange}
                            onValueChange={setPriceRange}
                            min={0}
                            max={200000}
                            step={1000}
                            className="w-full"
                        />
                    </CollapsibleContent>
                </Collapsible>

            </CardContent>
        </Card>
    );
}