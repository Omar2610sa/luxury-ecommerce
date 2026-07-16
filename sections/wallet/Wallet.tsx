import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardTitle } from "@/components/ui/card";
import { wallet } from "@/interfaces/interfaces";
import { WalletIcon, ArrowDownCircleIcon, PlusCircleIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import AddBalance from "./AddBalance";






export default async function Wallet({ wallet }: { wallet: wallet }) {
    const t = await getTranslations('Wallet')

    const getTransactionLabel = (type: string, status: string) => {
        if (type === "withdrawal") {
            if (status === "pending") return t('withdrawalPending')
            if (status === "accepted") return t('withdrawalAccepted')
            if (status === "rejected") return t('withdrawalRejected')
        }
        if (type === "charge") {
            if (status === "pending") return t('chargePending')
            if (status === "accepted") return t('chargeAccepted')
            if (status === "rejected") return t('chargeRejected')
        }
        return t('unknown')
    }
    return (
        <div className="flex flex-col gap-6 bg-[#F6F7FC] min-h-screen p-6">
            <h3 className="text-2xl font-semibold">{t('title')}</h3>

            {/* Balance Card */}
            <Card className="flex flex-col items-center justify-center gap-5 max-w-sm mx-auto w-full h-52 bg-[#926D35] relative overflow-hidden rounded-none border-0 shadow-md">
                {/* Pattern */}
                <div className="absolute w-45 h-45 rounded-full right-0 -top-25 bg-white/20" />
                <div className="absolute w-30 h-30 rounded-full -right-10 -top-10 bg-white/40" />

                <CardTitle className="font-medium  text-white z-10 text-2xl">
                    {t('balance')}
                </CardTitle>
                <CardDescription className="text-3xl text-white font-bold z-10">
                    {wallet?.balance}
                </CardDescription>
                <CardAction className="flex gap-3 z-10 mt-1 mx-auto">
                    <AddBalance title={t('addBalance')} />
                    <Button
                        variant="outline"
                        className="px-10 py-5 rounded-none font-medium bg-transparent text-white border-white hover:bg-white/10 hover:text-white"
                    >
                        {t('withdraw')}

                    </Button>
                </CardAction>
            </Card>

            {/* Last Transactions */}
            <div className="flex flex-col gap-3">
                <h4 className="text-xl font-semibold">
                    {t('lastTransactions')}

                </h4>

                {
                    wallet?.wallet_transactions.map((ele, index) => {
                        const isWithdraw = ele?.type === "withdrawal"

                        return (
                            <div className="flex flex-col" key={index}>
                                <div
                                    className="flex items-center justify-between py-4 border-b last:border-0"
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Icon */}
                                        <div className={`p-3 rounded-full bg-[#F4F8FD]`}>
                                            {isWithdraw
                                                ? <ArrowDownCircleIcon className="size-5 text-red-400" />
                                                : <PlusCircleIcon className="size-5 text-amber-600" />
                                            }
                                        </div>
                                        {/* Info */}
                                        <div className="flex flex-col gap-1">
                                            <p className=" font-medium">
                                                {getTransactionLabel(ele.type, ele.status)}
                                            </p>
                                            <p className="text-xs text-gray-400 flex items-center tracking-[1px] gap-1">
                                                <WalletIcon className="size-3" />
                                                {ele.created_at}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Amount */}
                                    <p className={`text-sm font-semibold ${isWithdraw ? "text-red-500" : "text-gray-800"}`}>
                                        {isWithdraw ? `- ${ele.amount}` : `${ele.amount}`}
                                    </p>
                                </div>
                            </div>
                        )
                    })

                }

            </div>
        </div>
    )
}