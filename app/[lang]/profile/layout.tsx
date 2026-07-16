import FadeIn from "@/Animations/Fadding";
import AccountSettings from "@/components/AccountSettings/AccountSettings";
import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Menu } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { cookies } from "next/headers";


export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getTranslations('Profile');


  const cookieStore = await cookies()
  const isRtl = cookieStore.get("NEXT_LOCALE")?.value == 'ar'
  return (
    <div className="container flex flex-col gap-8">
      <BreadCrumb thirdLink={t('title')} />
      <div className="grid md:grid-cols-[0.4fr_1fr] gap-10 items-start ">
        <div className="hidden md:block">
          <FadeIn direction={isRtl ? "left" : "right"} delay={0.1} duration={0.3}>
            <AccountSettings />
          </FadeIn>
        </div>
        <div className="md:hidden">

          <Collapsible className="rounded-md space-y-3">
            <CollapsibleTrigger >
              <div className="lg:hidden flex items-center gap-2 w-fit text-black p-2 lg:p-6 rounded-full">
                <Menu className="group-data-panel-open/button:rotate-180" />
                <span className="text-2xl">الحساب</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="duration-300">
              <AccountSettings />
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div className='order-1 md:order-2"'>{children}</div>
      </div>
    </div>
  );
}
