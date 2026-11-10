import { useMemo, useState } from "react";
import { getSignUpSchema } from "../schema/signUpSchema";
import { useFormik } from "formik";
import { ErrorAlert } from "@/components/Alert/ErrorAlert";
import Cookies from "js-cookie"
import { apiClient } from "@/services/useApiClient";
import { useTranslations } from "next-intl";


export function useSignUp() {
    const t = useTranslations('SignUp')
    const signUpSchema = useMemo(() => getSignUpSchema(t), [t]);
    const [open, setOpen] = useState(false)
    const [otpOpen, setOtpOpen] = useState(false)
    const guestToken = Cookies.get('guest_token')

    const formik = useFormik({
        initialValues: {
            name: "", email: "", phone: "",
            country_id: "", state_id: "", city_id: "",
            gender: "", date_of_birth: "", password: "",
        },
        validate: (values) => {
            const result = signUpSchema.safeParse(values);
            if (result.success) return {};
            const errors: Record<string, string> = {};
            for (const issue of result.error.issues) {
                const key = issue.path[0] as string;
                if (!errors[key]) errors[key] = issue.message;
            }
            return errors;
        },
        onSubmit: async (values, { setSubmitting }) => {
            const form = new FormData()
            form.append("name", values.name)
            form.append("email", values.email)
            form.append("phone_code", values.phone_code)
            form.append("phone", values.phone)
            form.append("country_id", values.country_id)
            form.append("state_id", values.state_id)
            form.append("city_id", values.city_id)
            form.append("gender", values.gender)
            form.append("date_of_birth", values.date_of_birth)
            form.append("password", values.password)
            form.append("type", 'ios')
            form.append("device_token", guestToken ?? '')

            try {
                const response = await apiClient<{ status?: string; message?: string }>("register", {
                    method: "POST",
                    body: form as unknown as Record<string, unknown>,
                })

                if (response?.status === "success") {
                    Cookies.set("user_phone", values.phone)
                    Cookies.set("user_phone_code", values.phone_code)
                    setOpen(false)
                    setOtpOpen(true)
                } else {
                    ErrorAlert(response?.message ?? "حدثت مشكلة")
                }
            } catch {
                ErrorAlert("حدثت مشكلة في الاتصال بالسيرفر")
            }
        },
    });
    return { formik, open, setOpen, otpOpen, setOtpOpen }
}