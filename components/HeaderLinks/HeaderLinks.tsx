import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "@/services/navigation";
import { getTranslations } from 'next-intl/server';


export default async function HeaderLinks() {
    const t = await getTranslations('HeaderLinks');

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink className="text-primary hover:text-primary/70 cursor-pointer">{t("faq")}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>|</BreadcrumbSeparator>

                <BreadcrumbItem>
                    <Link href="/privacy" className="text-primary hover:text-primary/70 cursor-pointer">{t("returnPolicy")}</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator>|</BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbLink className="text-primary hover:text-primary/70 cursor-pointer">{t("support")}</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
