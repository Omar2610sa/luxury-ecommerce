// components/CategoryFilter.tsx
'use client'

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Plus, Minus, X } from "lucide-react";

// ======= STATIC DATA (هتتشال لما تربط الـ API) =======
const STATIC_SUB_CATEGORIES = [
    {
        id: 1, title: "ملابس رجالية", count: 124,
        children: []
    },
    {
        id: 2, title: "ملابس نسائية", count: 89,
        children: [
            { id: 21, title: "فساتين", count: 34, children: [] },
            { id: 22, title: "بلوزات", count: 22, children: [] },
        ]
    },
    { id: 3, title: "أطفال", count: 56, children: [] },
];

const STATIC_COUNTRIES = [
    { id: 1, name: "مصر" },
    { id: 2, name: "السعودية" },
    { id: 3, name: "الإمارات" },
];

const STATIC_CITIES = [
    { id: 11, name: "القاهرة", ads: 210 },
    { id: 12, name: "الإسكندرية", ads: 87 },
    { id: 13, name: "المنصورة", ads: 43 },
    { id: 14, name: "الجيزة", ads: 65 },
    { id: 15, name: "أسيوط", ads: 31 },
];
// =====================================================

interface ActiveFilter {
    key: string;
    value: string;
    label: string;
}

export default function CategoryFilter() {
    const [openSections, setOpenSections] = useState({
        categories: true,
        location: true,
        price: true,
    });
    const [openSubItems, setOpenSubItems] = useState<Record<number, boolean>>({});
    const [selectedSubCat, setSelectedSubCat] = useState<string>("");
    const [selectedSubSubCat, setSelectedSubSubCat] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<string>("1");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [priceRange, setPriceRange] = useState<number[]>([0, 200000]);
    const [showAllCities, setShowAllCities] = useState(false);

    // حساب الـ active filters
    const activeFilters: ActiveFilter[] = [];

    if (selectedSubCat) {
        const found = STATIC_SUB_CATEGORIES.find(c => c.id.toString() === selectedSubCat);
        if (found) activeFilters.push({ key: 'sub_cat', value: selectedSubCat, label: found.title });
    }
    if (selectedSubSubCat) {
        let label = selectedSubSubCat;
        STATIC_SUB_CATEGORIES.forEach(c => c.children.forEach(ch => {
            if (ch.id.toString() === selectedSubSubCat) label = ch.title;
        }));
        activeFilters.push({ key: 'sub_sub_cat', value: selectedSubSubCat, label });
    }
    if (selectedCity) {
        const found = STATIC_CITIES.find(c => c.id.toString() === selectedCity);
        if (found) activeFilters.push({ key: 'city', value: selectedCity, label: found.name });
    }
    if (priceRange[0] !== 0 || priceRange[1] !== 200000) {
        activeFilters.push({ key: 'price', value: 'range', label: `${priceRange[0]} - ${priceRange[1]} ج` });
    }

    const removeFilter = (key: string) => {
        if (key === 'sub_cat') { setSelectedSubCat(""); setSelectedSubSubCat(""); }
        else if (key === 'sub_sub_cat') setSelectedSubSubCat("");
        else if (key === 'city') setSelectedCity("");
        else if (key === 'price') setPriceRange([0, 200000]);
    };

    const clearAll = () => {
        setSelectedSubCat("");
        setSelectedSubSubCat("");
        setSelectedCity("");
        setPriceRange([0, 200000]);
    };

    const visibleCities = showAllCities ? STATIC_CITIES : STATIC_CITIES.slice(0, 3);

    const renderSubCategories = (items: typeof STATIC_SUB_CATEGORIES, level = 0) => (
        <RadioGroup value={level === 0 ? selectedSubCat : selectedSubSubCat} className="space-y-1">
            {items.map(item => {
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = openSubItems[item.id];
                const filterKey = level === 0 ? 'sub_cat' : 'sub_sub_cat';
                const currentVal = level === 0 ? selectedSubCat : selectedSubSubCat;

                return (
                    <div key={item.id} className={level > 0 ? "ms-5" : ""}>
                        <div className="flex items-center justify-between py-1.5">
                            <div className="flex items-center gap-2 flex-1">
                                <RadioGroupItem
                                    value={item.id.toString()}
                                    id={`cat-${item.id}`}
                                    onClick={() => {
                                        const isActive = currentVal === item.id.toString();
                                        if (filterKey === 'sub_cat') {
                                            setSelectedSubCat(isActive ? "" : item.id.toString());
                                            setSelectedSubSubCat("");
                                        } else {
                                            setSelectedSubSubCat(isActive ? "" : item.id.toString());
                                        }
                                    }}
                                />
                                <Label htmlFor={`cat-${item.id}`} className="text-sm cursor-pointer">
                                    {item.title}
                                </Label>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-muted-foreground">({item.count})</span>
                                {hasChildren && (
                                    <button
                                        className="p-1 hover:bg-muted rounded"
                                        onClick={() => setOpenSubItems(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                                    >
                                        {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                    </button>
                                )}
                            </div>
                        </div>
                        {hasChildren && isOpen && renderSubCategories(item.children as any, level + 1)}
                    </div>
                );
            })}
        </RadioGroup>
    );

    const toggleSection = (key: keyof typeof openSections) =>
        setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <Card className="p-4 rounded-lg bg-[rgba(246, 247, 252, 1)] sticky top-40">
            <CardContent className="p-0 space-y-4">

                {/* Header */}
                <div className="flex items-center justify-between pb-2">
                    <h3 className="text-base font-semibold">التصنيف</h3>
                    {activeFilters.length > 0 && (
                        <Button variant="ghost" size="sm" onClick={clearAll} className="text-primary h-auto p-1 text-sm">
                            مسح الكل
                        </Button>
                    )}
                </div>

                {/* Active Badges */}
                {activeFilters.length > 0 && (
                    <div className="flex flex-wrap gap-2 pb-2 border-b">
                        {activeFilters.map(f => (
                            <Badge key={f.key} variant="outline" className="gap-1 h-8 rounded-md text-xs">
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
                        {renderSubCategories(STATIC_SUB_CATEGORIES)}
                    </CollapsibleContent>
                </Collapsible>

                {/* Location */}
                <Collapsible open={openSections.location} onOpenChange={() => toggleSection('location')}>
                    <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between py-2 border-b">
                            <span className="text-sm font-medium">الموقع</span>
                            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openSections.location ? 'rotate-180' : ''}`} />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-3 space-y-2">
                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                            <SelectTrigger className="w-full h-9 text-sm">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {STATIC_COUNTRIES.map(c => (
                                    <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <RadioGroup value={selectedCity} className="space-y-1">
                            {visibleCities.map(city => (
                                <div key={city.id} className="flex items-center justify-between py-1.5">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem
                                            value={city.id.toString()}
                                            id={`city-${city.id}`}
                                            onClick={() => setSelectedCity(
                                                selectedCity === city.id.toString() ? "" : city.id.toString()
                                            )}
                                        />
                                        <Label htmlFor={`city-${city.id}`} className="text-sm cursor-pointer">{city.name}</Label>
                                    </div>
                                    <span className="text-xs text-muted-foreground">({city.ads})</span>
                                </div>
                            ))}
                        </RadioGroup>

                        <Button variant="ghost" size="sm" onClick={() => setShowAllCities(!showAllCities)}
                            className="w-full text-primary text-xs">
                            {showAllCities ? "عرض أقل" : `+ عرض المزيد (${STATIC_CITIES.length - 3})`}
                        </Button>
                    </CollapsibleContent>
                </Collapsible>

                {/* Price Range */}
                <Collapsible open={openSections.price} onOpenChange={() => toggleSection('price')}>
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