"use client"
import MainButton from "@/components/Layout/MainButton"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { SuccessAlert } from "@/components/Alert/SuccessAlert"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { apiClient } from "@/services/useApiClient"





export function LoginDialog() {
    const t = useTranslations('LoginDialog')
    const [showPassword, setShowPassword] = useState(false)
    const [open, setOpen] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)

    const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    const getCookie = (name: string) => Cookies.get(name)
    const guestToken = getCookie("guest_token")
    const router = useRouter()


    const loginSchema = Yup.object({
    identifier: Yup.string()
        .required(t('validation.identifier_required'))
        .test("email-or-phone", t('validation.identifier_invalid'), (value) => {
            if (!value) return false
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            const isPhone = /^[1-9]/.test(value)
            return isEmail || isPhone
        }),
    password: Yup.string()
        .min(6, t('validation.password_min'))
        .required(t('validation.password_required')),
})
    const setUser = useAuthStore((state) => state.setUser)


    const formik = useFormik({
        initialValues: {
            identifier: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await apiClient<{ data?: Profile & { token?: string } }>("login", {
                    method: "POST",
                    body: {
                        credential: values.identifier, password: values.password, type: "ios",
                        device_token: guestToken,
                    }
                })

                const token = response.data?.token
                if (token && response.data) {
                    document.cookie = `token_luxary=${token}; path=/`
                    setOpen(false)
                    setSuccessOpen(true)
                    setOpen(false)
                    router.refresh()
                    setUser(response.data)
                    SuccessAlert(t('success'))
                }
            } catch (error) {
                console.error("Login error:", error)
            } finally {
                setSubmitting(false)
            }
        },
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="">
                <MainButton text={t('trigger')} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={formik.handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-lg mb-3 ">
                            {t('title')}
                        </DialogTitle>
                    </DialogHeader>

                    <FieldGroup>
                        {/* Email or Phone */}
                        <Field>
                            <Label htmlFor="identifier">
                                {t('identifier.label')}
                            </Label>
                            <Input
                                id="identifier"
                                name="identifier"
                                type="text"
                                placeholder={t('identifier.placeholder')}
                                value={formik.values.identifier}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.identifier && formik.errors.identifier && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.identifier}
                                </p>
                            )}
                        </Field>

                        {/* Password */}
                        <Field>
                            <Label htmlFor="password">كلمة المرور</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder={t('password.placeholder')}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="pl-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((p) => !p)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="size-4" />
                                    ) : (
                                        <EyeIcon className="size-4" />
                                    )}
                                </button>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.password}
                                </p>
                            )}
                        </Field>
                    </FieldGroup>

                    <DialogFooter className="mt-4 flex flex-col items-center gap-2">
                        <Button
                            className="w-full cursor-pointer"
                            type="submit"
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting ? t('submitting') : t('submit')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}