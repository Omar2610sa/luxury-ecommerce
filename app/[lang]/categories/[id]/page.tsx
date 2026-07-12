
import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb";
import CategoryFilter from "@/components/Filter/Filter";
import ProductsGridSkeleton from "@/components/ProductsGridSkeleton/ProductsGridSkeleton";
import CategoryProducts from "@/sections/CategoryProducts/CategoryProducts";
import { Suspense } from "react";
import { getTranslations } from 'next-intl/server';
import { serverApi } from "@/services/serverApi";
import { Category } from "@/interfaces/interfaces";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {  Settings2Icon } from "lucide-react";

type Props = {
  params: Promise<{
    lang: string;
    id: number | undefined;
  }>;
  searchParams: Promise<{
    sub_cat?: string;
    sub_sub_cat?: string;
    min_price?: string;
    max_price?: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Category' });

  return {
    title: `${t('title')} | الفخامة`,
  };
}

export default async function page({ params, searchParams }: Props) {
  const { lang, id } = await params;
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations({ locale: lang, namespace: 'Category' });

  // const { data: categories } = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE}/api/client/get_categories`
  // ).then((res) => res.json());
  const { data: categories } = await serverApi<{ data: Category[] }>(`get_categories`);

  // get_categories

  const category = categories?.find((cat: { id: number }) => cat.id === Number(id));

  return (
    <div className="container flex flex-col gap-10">
      <BreadCrumb
        secondLink={t('shop_by_categories')}
        thirdLink={category?.title ?? ""}
      />
      <div className="grid md:grid-cols-[0.4fr_1fr] justify-s gap-5 items-center md:items-start">
        <div className="max-w-2xs">
          <div className="hidden md:block">
            <CategoryFilter subCategories={category?.sub_categories ?? []} />
          </div>
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
