"use client"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'



const Tablist = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const activeTab = searchParams.get('type') ?? 'all'
    const t = useTranslations('Tablist')

    const tabs = [
        { name: t('all'), value: 'all' },
        { name: t('confirmed'), value: 'confirmed' },
        { name: t('processing'), value: 'processing' },
        { name: t('in_the_way'), value: 'in_the_way' },
        { name: t('delivered'), value: 'delivered' },
        { name: t('cancelled'), value: 'cancelled' },
    ]   
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
        <div className="w-full max-w-3xl">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="gap-6">
                <TabsList className="w-full  p-6 bg-white gap-4">
                    {tabs.map(({ name, value: tabValue }) => (
                        <TabsTrigger
                            key={tabValue}
                            value={tabValue}
                            className="bg-gray-100 text-md gap-3 hover:bg-slate-200 cursor-pointer py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white sm:px-3 text-black"
                        >
                            {name}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    )
}

export default Tablist