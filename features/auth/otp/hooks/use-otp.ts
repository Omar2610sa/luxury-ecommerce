import { useState } from "react"
import { otpService } from "../services/otp.api"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { SuccessAlert } from "@/components/Alert/SuccessAlert"
import { ErrorAlert } from "@/components/Alert/ErrorAlert"
import { Props } from "../types"

export function useOTP({ open, onOpenChange }: Props){
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
                const response = await otpService({
                    phone: phone ?? "",
                    phoneCode: phoneCode ?? "",
                    otp,
                    deviceToken: deviceToken ?? "",
                });


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
    return { otp, setOtp, loading, setLoading, error, setError, handleSubmit, open, onOpenChange }
}