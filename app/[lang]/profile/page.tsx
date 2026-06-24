import EditProfile from "@/sections/EditProfile/EditProfile";
import { getTranslations } from 'next-intl/server';

interface ProfilePageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Profile' });

  return {
    title: `${t('title')} | الفخامة`,
  };
}

export default async function page({
  params,
}: ProfilePageProps) {
  const { lang } = await params;

  return (
    <>
      <EditProfile />
    </>
  );
}
