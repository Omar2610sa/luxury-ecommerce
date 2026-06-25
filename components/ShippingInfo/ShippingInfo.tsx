import { TruckIcon, RotateCcwIcon, InfoIcon, ChevronLeft } from "lucide-react"
import { useTranslations } from "next-intl" 
export default function ShippingInfo() {
  const t = useTranslations('ShippingInfo')

  return (
    <div className="flex flex-col gap-4 w-full">

      {/* Shipping */}
      <div className="flex gap-4 pb-4 border-b">
        <TruckIcon className="size-8 shrink-0 mt-1" />
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold">{t("shipping.title")}</p>
          <p className="text-lg text-gray-500">{t("shipping.freeShipping")}</p>
          <p className="text-lg text-gray-500">
            {t("shipping.estimatedDelivery")}
            <span className="font-medium"> {t("shipping.deliveryDate")}</span>
          </p>
        </div>
      </div>

      {/* Return Policy */}
      <button className="flex items-center justify-between gap-4 pb-4 border-b">
        <div className="flex items-center gap-4">
          <RotateCcwIcon className="size-7" />
          <span className="text-xl font-semibold">{t("returnPolicy.title")}</span>
        </div>
        <ChevronLeft className="size-5 text-gray-400" />
      </button>

      {/* Description */}
      <button className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <InfoIcon className="size-7" />
          <span className="text-xl font-semibold">{t("description.title")}</span>
        </div>
        <ChevronLeft className="size-5 text-gray-400" />
      </button>

    </div>
  )
}