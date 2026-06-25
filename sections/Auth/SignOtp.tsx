"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field } from "@/components/ui/field"
import { SuccessAlert } from "@/components/Alert/SuccessAlert"
import { useRouter } from "next/navigation"
import { apiClient } from "@/services/useApiClient"
import { ErrorAlert } from "@/components/Alert/ErrorAlert"
import Cookies from "js-cookie"
import { useTranslations } from 'next-intl';

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
}


export function OtpDialog({ open, onOpenChange }: Props) {
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()
    const phone = Cookies.get('user_phone')
    const phoneCode = Cookies.get('user_phone_code')
    const deviceToken = Cookies.get('guest_token')





    const handleSubmit = async () => {
        if (otp.length < 4) {
            setError("أدخل كود التحقق كامل")
            return
        }
        setLoading(true)
        setError("")

        try {
            const response = await apiClient<{data?: Profile , status?: string; message?: string ,  }>("verify_Phone", {
                method: "POST",
                body: {
                    phone: phone,
                    phone_code: phoneCode,
                    code: otp,
                    type: "ios",
                    device_token: deviceToken
                },
            })

            // verify_Phone
            if (response?.status === "success") {
                if (response?.data) {
                    const token = response.data?.token
                    Cookies.set("token_luxary", token ?? '')
                }
                onOpenChange(false)
                SuccessAlert("تم التحقق من رقم الهاتف بنجاح")
                setTimeout(() => router.refresh(), 2000)
            } else {
                ErrorAlert(response?.message ?? "حدثت مشكلة")
                setLoading(false)

            }
        } catch {
            ErrorAlert("حدثت مشكلة في الاتصال بالسيرفر")
            setLoading(false)

        }
    }

    const t = useTranslations('Otp');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-lg">{t('title')}</DialogTitle>
                    <p className="text-sm text-gray-500">
                        {t('description', { phone: phone ?? '' })}
                    </p>
                </DialogHeader>

                <Field>
                    <Label htmlFor="otp">{t('label')}</Label>
                    <Input
                        id="otp"
                        type="text"
                        placeholder={t('placeholder')}
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        className="text-center text-2xl tracking-widest"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </Field>

                <Button className="w-full cursor-pointer" onClick={handleSubmit} disabled={loading}>
                    {loading ? t('loading') : t('submit')}
                </Button>
            </DialogContent>
        </Dialog>
    )
}