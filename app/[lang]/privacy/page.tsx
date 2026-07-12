import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb";
import { serverApiGeneral } from "@/services/serverApiGeneral";
import { } from "@/services/useApiClientGeneral";
import { getTranslations } from "next-intl/server";

interface Props {
    desc: string
}

export default async function page() {
    const { data: privacy } = await serverApiGeneral<{ data: Props }>("privacy");
        const t = await getTranslations('HeaderLinks');

    return (
        <section className="container flex flex-col gap-5 py-10">
            <BreadCrumb thirdLink={t("returnPolicy")} />
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: privacy?.desc ?? '' }}
            />
        </section>
    )
}
