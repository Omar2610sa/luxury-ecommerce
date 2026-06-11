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

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const getPhone = () => {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('user_phone='))
        ?.split('=')[1] ?? ''
}
const getPhoneCode = () => {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('user_phone_code='))
        ?.split('=')[1] ?? ''
}

const getToken = () => {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('token_luxary='))
        ?.split('=')[1] ?? ''
}

export function OtpDialog({ open, onOpenChange }: Props) {
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async () => {
        if (otp.length < 4) {
            setError("أدخل كود التحقق كامل")
            return
        }

        setLoading(true)
        setError("")

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE}/api/client/verify_Phone`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getToken()}`,
                    },
                    body: JSON.stringify({
                        phone: getPhone(),
                        phone_code: getPhoneCode(),
                        code:otp,
                        device_token: 125487986562323157,
                        type: "ios",
                    }),
                }
            ).then(res => res.json())

            if (response.data) {
                const token = response.data?.token
                document.cookie = `token_luxary=${token}; path=/`
                onOpenChange(false)
                SuccessAlert("تم التحقق من رقم الهاتف بنجاح")
                setTimeout(() => window.location.reload(), 2000)
            } else {
                setError(response.message ?? "كود التحقق غير صحيح")
            }
        } catch (error) {
            console.error("OTP error:", error)
            setError("حدث خطأ، حاول مرة أخرى")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-lg">تحقق من رقم الهاتف</DialogTitle>
                    <p className="text-sm text-gray-500">
                        تم إرسال كود التحقق على رقم {getPhone()}
                    </p>
                </DialogHeader>

                <Field>
                    <Label htmlFor="otp">كود التحقق</Label>
                    <Input
                        id="otp"
                        type="text"
                        placeholder="أدخل الكود"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        className="text-center text-2xl tracking-widest"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </Field>

                <Button
                    className="w-full cursor-pointer"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "جاري التحقق..." : "تأكيد"}
                </Button>
            </DialogContent>
        </Dialog>
    )
}