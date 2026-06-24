import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getTranslations } from 'next-intl/server';


export default async function HeaderLinks() {
    const t = await getTranslations('HeaderLinks');

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink className="text-black hover:text-black/70 cursor-pointer">{t("faq")}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>|</BreadcrumbSeparator>

                <BreadcrumbItem>
                    <BreadcrumbLink className="text-black hover:text-black/70 cursor-pointer">{t("returnPolicy")}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>|</BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbLink className="text-black hover:text-black/70 cursor-pointer">{t("support")}</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
