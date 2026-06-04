import { ChevronDownIcon, DotIcon, Flag } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function HeaderLinks() {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink className="text-black hover:text-black/70 cursor-pointer">الدعم الفني</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>|</BreadcrumbSeparator>

                <BreadcrumbItem>
                    <BreadcrumbLink className="text-black hover:text-black/70 cursor-pointer">الأسئلة الشائعة</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>|</BreadcrumbSeparator>

                <BreadcrumbItem>
                    <BreadcrumbLink className="text-black hover:text-black/70 cursor-pointer">سياسة الإسترجاع والخصوصية</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>|</BreadcrumbSeparator>

                <BreadcrumbItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 cursor-pointer">
                            <ChevronDownIcon className="size-3.5" />
                            العربية
                            <Flag className="size-3" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuGroup>
                                <DropdownMenuItem>العربية</DropdownMenuItem>
                                <DropdownMenuItem>الإنجليزية</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
