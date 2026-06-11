import AccountSettings from '@/components/AccountSettings/AccountSettings'
import { BreadCrumb } from '@/components/Breadcrumb/BreadCrumb'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="container  flex flex-col gap-8">
            <BreadCrumb thirdLink="ملفي الشخصي" />
            <div className="grid grid-cols-[0.4fr_1fr] gap-10 items-start ">
                <AccountSettings />
                {
                    children
                }
            </div>
        </div>
    )
}
