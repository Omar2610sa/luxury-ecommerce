import Banner from "@/components/Banner/Banner";
import ForYouSection from "@/sections/ForYou/ForYou";
import Hero from "@/sections/Hero/Hero";
import NewEditions from "@/sections/NewEditions/NewEditions";
import SecondSlider from "@/sections/SecondSlider/SecondSlider";
import { Metadata } from "next";
import FlashOffers from "@/sections/Flash_offers/FlashOffers";
import { serverApi } from "@/services/serverApi";
import { HomeData } from "@/interfaces/interfaces";
import { getTranslations } from 'next-intl/server';

interface HomePageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
const t = await getTranslations({ locale: lang, namespace: 'Home' })
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function Home({
  params,
}: HomePageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Home' });
  const { data: home_website } = await serverApi<{ data: HomeData }>("home_website");

  return (
    <div>
      <Hero slider={home_website?.slider ?? []} shopNowText={t('hero_button')} />
      <SecondSlider secondSlider={home_website?.main_categories ?? []} />
      <NewEditions
        products={home_website?.best_seller ?? []}
        title={t('new_arrivals')}
      />
      <FlashOffers />
      <Banner banner={home_website?.middle_slider ?? ''} />
      <ForYouSection
        title={t('featured_products')}
        products={home_website?.for_you ?? []}
      />
      <Banner banner={home_website?.footer_slider ?? ''} />
    </div>
  );
}
