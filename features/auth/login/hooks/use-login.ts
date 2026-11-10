import { useFormik } from "formik";
import { getLoginSchema } from "../schema/loginSchema";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorAlert } from "@/components/Alert/ErrorAlert";
import { SuccessAlert } from "@/components/Alert/SuccessAlert";
import { useTranslations } from "next-intl";
import { loginService } from "../services/login.api";
import { useAuthStore } from "@/store/useAuthStore";
import { toFormikValidationSchema } from "zod-formik-adapter";

export function useLogin() {
    const [showPassword, setShowPassword] = useState(false)
    const [open, setOpen] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)
    const t = useTranslations('LoginDialog')
    const router = useRouter()
    const setUser = useAuthStore((state) => state.setUser)
    const loginSchema = useMemo(() => getLoginSchema(t), [t]);
    const formik = useFormik({
        initialValues: {
            identifier: "",
            password: "",
        },
        validationSchema: toFormikValidationSchema(loginSchema), onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await loginService(values);
                const token = response.data?.token
                if (response?.status === "success") {
                    document.cookie = `token_luxary=${token}; path=/`
                    setOpen(false)
                    setSuccessOpen(true)
                    setOpen(false)
                    router.refresh()
                    setUser(response.data)
                    SuccessAlert(t('success'))
                }
                else {
                    ErrorAlert(response?.message ?? "حدثت مشكلة")
                }
            } catch {
                ErrorAlert("حدثت مشكلة في الاتصال بالسيرفر")
            }
        },
    })
    return { formik, setSubmitting: formik.setSubmitting, showPassword, setShowPassword, open, setOpen, successOpen, setSuccessOpen }
}