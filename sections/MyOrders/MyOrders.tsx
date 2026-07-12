import NoInfo from "@/components/NoInfo/NoInfo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Order } from "@/interfaces/interfaces"
import { serverApi } from "@/services/serverApi"
import Image from "next/image"
import { Link } from "@/services/navigation"
import Tablist from "@/components/Tablist/Tablist"
import { Suspense } from "react"
import { getTranslations } from "next-intl/server"



type Props = {
    status?: string
}

export default async function MyOrders({ status }: Props) {
    const t = await getTranslations('MyOrders')
    const tStatus = await getTranslations('OrderStatus')
    const endpoint = status && status !== 'all'
        ? `orders?type=${status}`
        : `orders`

    const statusConfig: Record<string, { label: string; className: string }> = {
        pending: { label: tStatus('pending'), className: "bg-yellow-100/60 text-yellow-700" },
        confirmed: { label: tStatus('confirmed'), className: "bg-green-100/60  text-green-700" },
        shipped: { label: tStatus('shipped'), className: "bg-blue-100/60  text-blue-700" },
        delivered: { label: tStatus('delivered'), className: "bg-purple-100/60  text-purple-700" },
        cancelled: { label: tStatus('cancelled'), className: "bg-red-100/60  text-red-700" },
    }
    const { data: order } = await serverApi<{ data: Order[] }>(endpoint)
    return (
        <div className="container flex flex-col gap-5 bg-[#F6F7FC]">
            <h3 className="text-2xl font-semibold text-primary">{t('MyOrders')}</h3>

            <Suspense fallback={null}>
                <Tablist />
            </Suspense>
            <div key={status ?? 'all'}>
                {order?.length ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {order.map((ele, index) => {
                            const statusInfo = statusConfig[ele.status] ?? { label: ele.status, className: "bg-gray-100 text-gray-700" }
                            const visibleImages = ele.images.slice(0, 3)
                            const extraCount = ele.images.length - 3

                            return (
                                <Card key={index} className="p-4 rounded-none ring-0 flex flex-col gap-3">
                                    <CardContent className="p-0 flex flex-col gap-4">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold">{t('order')}: {ele.order_no}</p>
                                            <span className={`text-md px-3 py-1.5 font-medium ${statusInfo.className}`}>
                                                {statusInfo.label}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center text-sm">
                                            <p className="text-gray-400">{t('count')} : {ele?.count}</p>
                                            <p className="text-primary font-bold">{ele.total} EGP</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {visibleImages.map((img) => (
                                                <div key={img.id} className="relative w-20 h-20 rounded overflow-hidden border">
                                                    <Image src={img.media} alt={img.alt ?? "product"} fill className="object-cover" />
                                                </div>
                                            ))}
                                            {extraCount > 0 && (
                                                <span className="text-sm text-gray-500 font-medium">{extraCount}+</span>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mt-2">
                                            <Link href={`/order/${ele.id}`}>
                                                <Button className="w-full bg-primary text-white rounded-none">{t('detail')}</Button>
                                            </Link>
                                            <Button
                                                variant="destructive"
                                                className="rounded-none bg-white border border-red-500 text-red-500 hover:bg-red-50"
                                                disabled={ele.status !== 'pending'}
                                            >
                                                {t('cancel')}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                ) : (
                    <NoInfo title={t('noOrders')} decs={t('noOrdersDesc')}  />
                )}
            </div>
        </div>
    )
}