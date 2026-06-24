import AccountSettings from "@/components/AccountSettings/AccountSettings";
import { BreadCrumb } from "@/components/Breadcrumb/BreadCrumb";
import type { ReactNode } from "react";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="container flex flex-col gap-8">
      <BreadCrumb thirdLink="ملفي الشخصي" />
      <div className="grid md:grid-cols-[0.4fr_1fr] gap-10 items-start ">
        <AccountSettings />
        <div className='order-1 md:order-2"'>{children}</div>
      </div>
    </div>
  );
}
