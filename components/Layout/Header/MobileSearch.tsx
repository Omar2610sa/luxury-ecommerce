// components/Layout/Header/MobileSearch.tsx
'use client'

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export default function MobileSearch() {
    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    className="flex justify-center items-center size-9 rounded-full bg-primary/30 cursor-pointer"
                >
                    <Search className="size-4  text-primary" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full">
                <div className="relative w-full">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        placeholder="البحث عن منتج"
                        className="pr-9 w-full text-right"
                        autoFocus
                    />
                </div>
            </PopoverContent>
        </Popover>
    )
}