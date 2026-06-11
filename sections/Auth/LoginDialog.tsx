"use client"
import MainButton from "@/components/Layout/MainButton"
import { Button } from "@/components/ui/button"
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

const loginSchema = Yup.object({
    identifier: Yup.string()
        .required("البريد الإلكتروني أو رقم الهاتف مطلوب")
        .test("email-or-phone", "أدخل بريد إلكتروني أو رقم هاتف صحيح", (value) => {
            if (!value) return false
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            const isPhone = /^[1-9]/.test(value)
            return isEmail || isPhone
        }),
    password: Yup.string()
        .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
        .required("كلمة المرور مطلوبة"),
})

export function LoginDialog() {
    const [showPassword, setShowPassword] = useState(false)
    const [open, setOpen] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)

    const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    const getGuestToken = () => {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith('guest_token='))
            ?.split('=')[1] ?? ''
    }
    const formik = useFormik({
        initialValues: {
            identifier: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const body = isEmail(values.identifier)
                    ? {
                        credential: values.identifier, password: values.password, type: "ios",
                        device_token: "125487986562323157"
                    }
                    : {
                        credential: values.identifier, password: values.password, type: "ios",
                        device_token: "125487986562323157",
                    }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE}/api/client/login`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                    }
                ).then((res) => res.json())

                const token = response.data?.token
                if (token) {
                    document.cookie = `token_luxary=${token}; path=/`
                    setOpen(false)
                    setSuccessOpen(true)
                    setOpen(false)
                    setInterval(()=>{
                        window.location.reload()
                    },4000)
                    SuccessAlert("تم تسجيل الدخول إلى حسابك بنجاح")
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
            <DialogTrigger>
                <MainButton text="تسجيل دخول" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={formik.handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-lg mb-3 ">
                            قم بتسجيل الدخول الي حسابك
                        </DialogTitle>
                    </DialogHeader>

                    <FieldGroup>
                        {/* Email or Phone */}
                        <Field>
                            <Label htmlFor="identifier">
                                البريد الإلكتروني أو رقم الهاتف
                            </Label>
                            <Input
                                id="identifier"
                                name="identifier"
                                type="text"
                                placeholder="أدخل البريد الإلكتروني أو رقم الهاتف"
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
                                    placeholder="إدخل كلمة السر"
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
                            {formik.isSubmitting ? "جاري التسجيل..." : "تسجيل الدخول"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}