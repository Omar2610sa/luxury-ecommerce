
import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb";
import CategoryFilter from "@/features/categories/components/Filter/Filter";
import ProductsGridSkeleton from "@/features/categories/components/ProductsGridSkeleton/ProductsGridSkeleton";
import CategoryProducts from "@/features/categories/components/CategoryProducts/CategoryProducts";
import { Suspense } from "react";
import { getTranslations } from 'next-intl/server';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Settings2Icon } from "lucide-react";
import { cookies } from "next/headers";
import FadeIn from "@/Animations/Fadding";
import { Props } from "@/features/categories/types";
import { getCategoriesData } from "@/features/categories/services/categories.service";



export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Category' });

  return {
    title: `${t('title')} | Yumeii`,
  };
}

export default async function page({ params, searchParams }: Props) {
  const { lang, id } = await params;
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations({ locale: lang, namespace: 'Category' });
  const { data: categories } = await getCategoriesData()
  // get_categories
  const category = categories?.find((cat: { id: number }) => cat.id === Number(id));

  const cookieStore = await cookies()

  const isRtl = cookieStore.get("NEXT_LOCALE")?.value == 'ar'


  return (
    <div className="container flex flex-col gap-10">
      <BreadCrumb
        secondLink={t('shop_by_categories')}
        thirdLink={category?.title ?? ""}
      />
      <div className="grid md:grid-cols-[0.4fr_1fr] justify-s gap-5 items-center md:items-start">
        <div className="max-w-2xs">
          <FadeIn direction={isRtl ? "left" : "right"} delay={0.1} duration={0.3}>

            <div className="hidden md:block">
              <CategoryFilter subCategories={category?.sub_categories ?? []} />
            </div>
          </FadeIn>
          <div className="md:hidden">

            <Collapsible className="rounded-md space-y-3">
              <CollapsibleTrigger render={
                <div className="lg:hidden flex items-center gap-2 w-fit  text-black p-2 lg:p-6 rounded-full">
                  <Settings2Icon className=" group-data-panel-open/button:rotate-180" />
                  <span className="text-2xl">{t('filter')}</span>
                </div>} />
              <CollapsibleContent className="duration-300">
                <CategoryFilter subCategories={category?.sub_categories ?? []} />

              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
        <Suspense fallback={<ProductsGridSkeleton />} key={JSON.stringify(resolvedSearchParams)}>
          <CategoryProducts
            searchParams={resolvedSearchParams}
            categoryId={category?.id ?? 0}
          />
        </Suspense>
      </div>
    </div>
  );
}
