

import FadeIn from "@/Animations/Fadding";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";


export async function BreadCrumb({ secondLink, thirdLink }: { secondLink?: string; thirdLink?: string }) {
  const t = await getTranslations('Breadcrumb');
  const cookieStore = await cookies()

  const isRtl = cookieStore.get("NEXT_LOCALE")?.value == 'ar'

  return (
    <FadeIn direction={isRtl ? "left" : "right"} delay={0.1} duration={0.3}>


      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-lg" href="/">
              {t('main')}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {
            secondLink && (
              <>
                <BreadcrumbSeparator className="text-xl">
                  /
                </BreadcrumbSeparator>

                <BreadcrumbItem>
                  <BreadcrumbLink href={`/categories/${secondLink}`} className="text-lg">
                    {secondLink}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          {
            thirdLink && (
              <>
                <BreadcrumbSeparator className="text-xl">
                  /
                </BreadcrumbSeparator>

                <BreadcrumbItem>
                  <BreadcrumbPage className="text-lg font-semibold">
                    {thirdLink}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
        </BreadcrumbList>
      </Breadcrumb>
    </FadeIn>

  )
}
