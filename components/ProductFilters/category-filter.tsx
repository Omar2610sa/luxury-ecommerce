'use client'
import { useRouter, usePathname } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus, Minus, X, SlidersHorizontal, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { CurrencyIcon } from "@/components/shared/icons";
import { useDebounce } from "@/hooks/useDebounce";
import { useTranslations } from "next-intl";
import useFetch from "@/hooks/UseFetch";

interface CategoryFilterProps {
    category: string;
    currentFilters: { [key: string]: string | string[] | undefined };
    className?: string;
    variant?: "mobile" | "desktop" | "all";
    country_ads?: { id: number; name: string; ads: number }[];
}

interface FilterItem {
    label: string;
    value: string;
    count?: number;
    subItems?: FilterItem[];
}


interface ActiveFilter {
    key: string;
    value: string;
    label: string | React.ReactNode;
}

// Shared filter content component
interface FilterContentProps {
    categoryId: string;
    currentFilters: { [key: string]: string | string[] | undefined };
    onFilterChange?: () => void;
    country_ads?: { id: number; name: string; ads: number }[];
}

export function FilterContent({ categoryId, currentFilters, onFilterChange, country_ads }: FilterContentProps) {
    const t = useTranslations("CategoryFilter");
    const tAdd = useTranslations("AddAdvertise");
    const tSort = useTranslations("Category.sort");
    const router = useRouter();
    const pathname = usePathname();


    const selectedCountry = currentFilters['country_id'] as string || "1";
    const [showAllCities, setShowAllCities] = useState<boolean>(false);
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        'section-categories': true,
        'location': true,
        'price': true
    });
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
    const [priceRange, setPriceRange] = useState<number[]>([
        Number(currentFilters['from_price']) || 0,
        Number(currentFilters['to_price']) || 200000
    ]);
    const debouncedPriceRange = useDebounce(priceRange, 500);
    const { data: subCategoriesRes } = useFetch({ endpoint: `category?parent_id=${categoryId}`, queryKey: ['category', 'subCategory', categoryId], base: 'website', suspense: true });
    const subCategories = (subCategoriesRes as any)?.data || [];

    const { data: countries } = useFetch({
        endpoint: 'data/countries',
        queryKey: ['countries'], base: 'general',
        select: (res: any) => res.data.map((data: any) => ({ id: data.id, name: data.name }))
    });

    const currentCountry = countries?.find((c: any) => String(c.id) === selectedCountry);


    const updateFilter = (key: string, value: string, checked: boolean, parentId?: string): void => {
        const params = new URLSearchParams();
        Object.keys(currentFilters).forEach((k) => {
            const v = currentFilters[k];
            if (k !== key && v) {
                if (Array.isArray(v)) {
                    v.forEach(val => params.append(k, val));
                } else {
                    params.set(k, v);
                }
            }
        });

        if (checked) {
            params.set(key, value);
            // Special logic for categories
            if (key === 'sub_category') {
                params.delete('sub_sub_category');
            } else if (key === 'sub_sub_category' && parentId) {
                params.set('sub_category', parentId);
            }
        } else {
            params.delete(key);
            // If we remove sub_category, we should probably remove sub_sub_category too
            if (key === 'sub_category') {
                params.delete('sub_sub_category');
            }
        }

        // Reset page when filtering
        params.delete("page");

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
        onFilterChange?.();
    };

    const removeFilter = (key: string, value: string): void => {
        if (key === 'price') {
            const params = new URLSearchParams();
            Object.keys(currentFilters).forEach((k) => {
                const v = currentFilters[k];
                if (k !== 'from_price' && k !== 'to_price' && v) {
                    if (Array.isArray(v)) {
                        v.forEach(val => params.append(k, val));
                    } else {
                        params.set(k, v);
                    }
                }
            });
            params.delete("page");
            setPriceRange([0, 200000]);
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        } else {
            updateFilter(key, value, false);
        }
    };

    const clearAllFilters = (): void => {
        router.push(pathname, { scroll: false });
        setPriceRange([0, 200000]);
        onFilterChange?.();
    };


    const getActiveFilters = (): ActiveFilter[] => {
        const active: ActiveFilter[] = [];

        Object.keys(currentFilters).forEach((key) => {
            const values = currentFilters[key];
            if (key === 'from_price' || key === 'to_price' || key === 'page') return;

            if (values) {
                const vals = Array.isArray(values) ? values : [values];
                vals.forEach(value => {
                    let label = value;
                    if (key === 'sub_category' || key === 'sub_sub_category') {
                        const findLabel = (items: any[]): void => {
                            items.forEach(item => {
                                if (item.id.toString() === value.toString()) {
                                    label = item.title;
                                }
                                if (item.children) {
                                    findLabel(item.children);
                                }
                            });
                        };
                        findLabel(subCategories);
                    } else if (key === 'country_id') {
                        const country = countries?.find((c: any) => String(c.id) === value);
                        if (country) label = country.name;
                    } else if (key === 'city_id') {
                        countries.forEach((c: any) => {
                            c.cities?.forEach((city: any) => {
                                if (String(city.id) === value) label = city.name;
                            });
                        });
                    } else if (key === 'categorized_by') {
                        label = tSort(value as any);
                    }
                    active.push({ key, value: value.toString(), label });
                });
            }
        });

        const fromPrice = currentFilters['from_price'];
        const toPrice = currentFilters['to_price'];
        if (fromPrice && toPrice && !Array.isArray(fromPrice) && !Array.isArray(toPrice)) {
            active.push({
                key: 'price',
                value: 'range',
                label: (
                    <span className="flex items-center gap-1 px-2">
                        {fromPrice} <CurrencyIcon className="w-3 h-3 me-3" /> {"  "} {toPrice} <CurrencyIcon className="w-3 h-3" />
                    </span>
                )
            });
        }

        return active;
    };

    const activeFilters = getActiveFilters();

    const renderSubCategories = (items: any[], level: number = 0, parentId?: string): React.ReactNode => {
        const filterKey = level === 0 ? 'sub_category' : 'sub_sub_category';

        return (
            <RadioGroup value={currentFilters[filterKey] as string || ""} className="space-y-1">
                {items.map((item) => {
                    const itemKey = `sub_category-${item.id}`;
                    const hasSubItems = item.children && item.children.length > 0;

                    // Auto open if a child is active
                    const isAnyChildActive = (children: any[]): boolean => {
                        return children.some(child =>
                            currentFilters['sub_sub_category'] === child.id.toString() ||
                            (child.children && isAnyChildActive(child.children))
                        );
                    };

                    const shouldBeOpen = openItems[itemKey] || (hasSubItems && isAnyChildActive(item.children));

                    return (
                        <div key={item.id} className={level > 0 ? "ms-4 mt-1" : ""}>
                            <Collapsible open={shouldBeOpen} onOpenChange={(open) => setOpenItems(prev => ({ ...prev, [itemKey]: open }))}>
                                <div className="flex items-center justify-between py-1.5">
                                    <div className="flex items-center gap-2 flex-1">
                                        <RadioGroupItem
                                            value={item.id.toString()}
                                            id={itemKey}
                                            onClick={() => {
                                                const isActive = currentFilters[filterKey] === item.id.toString();
                                                updateFilter(filterKey, item.id.toString(), !isActive, parentId);
                                            }}
                                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                        />
                                        <Label
                                            htmlFor={itemKey}
                                            className={`text-sm cursor-pointer flex-1 ${currentFilters[filterKey] === item.id.toString() ? 'font-bold' : 'font-normal'}`}
                                        >
                                            {item.title}
                                        </Label>
                                    </div>
                                    {hasSubItems && (
                                        <CollapsibleTrigger>
                                            <button className="p-1 hover:bg-muted rounded">
                                                {shouldBeOpen ? (
                                                    <Minus className="w-4 h-4 text-muted-foreground" />
                                                ) : (
                                                    <Plus className="w-4 h-4 text-muted-foreground" />
                                                )}
                                            </button>
                                        </CollapsibleTrigger>
                                    )}
                                </div>

                                {hasSubItems && (
                                    <CollapsibleContent>
                                        {renderSubCategories(item.children, level + 1, item.id.toString())}
                                    </CollapsibleContent>
                                )}
                            </Collapsible>
                        </div>
                    );
                })}
            </RadioGroup>
        );
    };

    const handleCountryChange = (id: string | null): void => {
        if (!id) return;
        const params = new URLSearchParams();
        Object.keys(currentFilters).forEach((k) => {
            const v = currentFilters[k];
            if (k !== 'country_id' && k !== 'city_id' && k !== 'page' && v) {
                if (Array.isArray(v)) {
                    v.forEach(val => params.append(k, val));
                } else {
                    params.set(k, v);
                }
            }
        });
        params.set('country_id', id);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handlePriceChange = (value: number | readonly number[]): void => {
        if (Array.isArray(value)) {
            const newRange = value as number[];
            const params = new URLSearchParams();

            Object.keys(currentFilters).forEach((k) => {
                const v = currentFilters[k];
                if (k !== 'from_price' && k !== 'to_price' && k !== 'page' && v) {
                    if (Array.isArray(v)) {
                        v.forEach(val => params.append(k, val));
                    } else {
                        params.set(k, v);
                    }
                }
            });

            if (newRange[0] !== 0 || newRange[1] !== 200000) {
                params.set('from_price', newRange[0].toString());
                params.set('to_price', newRange[1].toString());
            }

            const currentSearch = new URLSearchParams(window.location.search);
            const newSearch = params.toString();

            // Only push if the search parameters have actually changed
            if (currentSearch.toString() !== newSearch) {
                const newUrl = newSearch ? `${pathname}?${newSearch}` : pathname;
                router.push(newUrl, { scroll: false });
            }
        }
    };

    useEffect(() => {
        handlePriceChange(debouncedPriceRange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedPriceRange]);

    return (
        <div className="space-y-4">
            {/* Header with Clear All */}
            <div className="flex flex-row items-center justify-between pb-3">
                <h3 className="text-lg font-semibold">{t("classification")}</h3>
                {activeFilters.length > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-primary hover:text-primary/80 h-auto p-2 text-base font-normal"
                    >
                        {t("clearAll")}
                    </Button>
                )}
            </div>

            {/* Active Filters as Badges */}
            {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 pb-4 border-b">
                    {activeFilters.map((filter, index) => (
                        <Badge
                            key={`${filter.key}-${filter.value}-${index}`}
                            variant="outline"
                            className="gap-1 h-9 rounded-sm"
                        >
                            {filter.label}
                            <button
                                onClick={() => removeFilter(filter.key, filter.value)}
                                className="hover:bg-muted rounded-full p-0.5"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}

            {/* Dynamic Subcategories */}
            {subCategories.length > 0 && (
                <Collapsible
                    open={openSections['section-categories']}
                    onOpenChange={(open) => setOpenSections(prev => ({ ...prev, 'section-categories': open }))}
                    className="border-b pb-4"
                >
                    <CollapsibleTrigger className={'w-full'}>
                        <div className="flex items-center justify-between w-full mb-3 text-left">
                            <Label className="text-sm font-semibold cursor-pointer">{t('subCategories')}</Label>
                            {openSections['section-categories'] ? (
                                <Minus className="w-4 h-4 text-muted-foreground" />
                            ) : (
                                <Plus className="w-4 h-4 text-muted-foreground" />
                            )}
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        {renderSubCategories(subCategories)}
                    </CollapsibleContent>
                </Collapsible>
            )}

            {/* Location Filter */}
            <div className="space-y-3 border-b pb-4">
                <Label className="text-sm font-semibold">{t("location")}</Label>

                {/* Country Select */}
                <Select
                    value={String(selectedCountry)}
                    onValueChange={(val) => handleCountryChange(val)}
                >
                    <SelectTrigger className="w-full border bg-transparent">
                        <SelectValue>
                            {countries?.find((c: any) => String(c.id) === selectedCountry)?.name || t("location")}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {countries?.map((country: any) => (
                            <SelectItem key={country.id} value={String(country.id)}>
                                <div className="flex items-center justify-between w-full min-w-[150px]">
                                    <span>{country.name}</span>
                                    <span className="text-muted-foreground text-xs">{country.ads}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Cities */}
                <RadioGroup
                    value={currentFilters['city_id'] as string || ""}
                    onValueChange={(value) => updateFilter('city_id', value as string, true)}
                    className="space-y-1"
                >
                    {country_ads?.map((city: any) => (
                        <div key={city.value || city.id} className="flex items-center justify-between py-1.5">
                            <div className="flex items-center gap-2 flex-1">
                                <RadioGroupItem
                                    value={String(city.value || city.id)}
                                    id={`city_id-${city.value || city.id}`}
                                    onClick={() => {
                                        const val = String(city.value || city.id);
                                        const isActive = currentFilters['city_id'] === val;
                                        updateFilter('city_id', val, !isActive);
                                    }}
                                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                                <Label
                                    htmlFor={`city_id-${city.value || city.id}`}
                                    className="text-sm font-normal cursor-pointer flex-1"
                                >
                                    {city.label || city.name}
                                </Label>
                            </div>
                            <div className="text-sm">({city.ads})</div>
                        </div>
                    ))}
                </RadioGroup>

                {/* Show More Cities */}
                {currentCountry && currentCountry.cities?.length > 5 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAllCities(!showAllCities)}
                        className="w-full text-primary hover:text-primary/80 text-sm"
                    >
                        {showAllCities ? t("showLess") : `+ ${t("showMore")}`}
                    </Button>
                )}
            </div>

            {/* Price Range Slider */}
            <div className="space-y-4 mb-4">
                <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold">{t("priceRange")}</Label>
                </div>

                <div className="px-2 mt-10">
                    <Slider
                        value={priceRange}
                        dir="ltr"
                        onValueChange={(val) => {
                            setPriceRange(val as number[]);
                        }}
                        formatLabel={(value) => (
                            <span className="flex items-center gap-1">
                                {value} <CurrencyIcon className="w-3 h-3" />
                            </span>
                        )}
                        max={200000}
                        step={1000}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
}

// Helper function to count active filters
function getActiveFilterCount(currentFilters: { [key: string]: string | string[] | undefined }): number {
    let count = 0;
    Object.keys(currentFilters).forEach((key) => {
        const values = currentFilters[key];
        if (key === 'from_price' || key === 'to_price' || key === 'page') return;
        if (values) {
            const vals = Array.isArray(values) ? values : [values];
            count += vals?.length;
        }
    });

    // Handle price range count separately if needed (already handled by key checks generally)
    // But ensure sub_category and sub_sub_category are both counted if present

    // Add 1 for price range if both exist
    if (currentFilters['from_price'] && currentFilters['to_price']) {
        count += 1;
    }
    return count;
}

export function CategoryFilter({ category, currentFilters, className = "", variant = "all", country_ads }: CategoryFilterProps) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const activeFilterCount = getActiveFilterCount(currentFilters);
    const t = useTranslations("CategoryFilter");

    return (
        <>
            {/* Mobile: Sheet Trigger Button */}
            {(variant === "all" || variant === "mobile") && (
                <div className="lg:hidden">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    className="relative gap-2 h-10 text-base p-3"
                                >
                                    <Filter className="w-3 h-3" />
                                    {activeFilterCount > 0 && (
                                        <Badge className="absolute -top-1 -right-0.5 h-4 min-w-4 flex items-center justify-center p-0 text-[10px] bg-primary text-white border-white">{activeFilterCount}</Badge>
                                    )}
                                </Button>
                            }
                        />
                        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
                            <SheetHeader className="border-b pb-4">
                                <SheetTitle className="text-xl">
                                    {t("filters")}
                                </SheetTitle>
                            </SheetHeader>
                            <div className="py-4">
                                <FilterContent
                                    categoryId={category}
                                    currentFilters={currentFilters}
                                    onFilterChange={() => setIsSheetOpen(false)}
                                />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            )}

            {/* Desktop: Sidebar Card */}
            {(variant === "all" || variant === "desktop") && (
                <div className="hidden lg:block">
                    <Card className="lg:sticky lg:top-40 p-4 rounded-md border-[1.5px] shadow-0! ring-0!">
                        <CardHeader className="p-0 pb-0">
                            {/* Empty header since FilterContent has its own header */}
                        </CardHeader>
                        <CardContent className="p-0">
                            <FilterContent
                                categoryId={category}
                                currentFilters={currentFilters}
                                country_ads={country_ads}
                            />
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}
