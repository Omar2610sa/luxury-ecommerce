"use client"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { tabs } from '../utils/orders-tabs'

const Tablist = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const activeTab = searchParams.get('type') ?? 'all'
    const t = useTranslations('Tablist')

    const handleTabChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === 'all') {
            params.delete('type')
        } else {
            params.set('type', value)
        }
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
<div className="w-full max-w-sm md:max-w-3xl min-w-0">
    <Tabs value={activeTab} onValueChange={handleTabChange} className="gap-6 min-w-0 w-full">
        <div className="w-full max-w-full overflow-x-auto no-scrollbar">
            <TabsList className="w-max min-w-full justify-start  p-6 bg-white gap-4">
                {tabs.map(({ name, value: tabValue }) => (
                    <TabsTrigger
                        key={tabValue}
                        value={tabValue}
                        className="shrink-0 whitespace-nowrap bg-gray-100 text-md gap-3 hover:bg-slate-200 cursor-pointer py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white sm:px-3 text-black"
                    >
                        {t(name)}
                    </TabsTrigger>
                ))}
            </TabsList>
        </div>
    </Tabs>
</div>
    )
}

export default Tablist