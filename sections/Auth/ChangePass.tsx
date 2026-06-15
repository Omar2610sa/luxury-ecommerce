"use client"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { SuccessAlert } from "@/components/Alert/SuccessAlert"
import { apiClient } from "@/services/useApiClient"

const passwordSchema = Yup.object({
    password: Yup.string()
        .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
        .required("كلمة المرور الجديدة مطلوبة"),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], "كلمتا المرور غير متطابقتين")
        .required("تأكيد كلمة المرور مطلوب"),
})

export default function ChangePasswordForm() {
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const formik = useFormik({
        initialValues: {
            password: "",
            password_confirmation: "",
        },
        validationSchema: passwordSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await apiClient<{ data?: unknown; message?: string }>("reset_password", {
                    method: "POST",
                    body: {
                        values,
                    }
                })

                if (response?.data) {
                    SuccessAlert("تم تغيير كلمة المرور بنجاح")
                    resetForm()
                }
            } catch (error) {
                console.error("Reset password error:", error)
            } finally {
                setSubmitting(false)
            }
        },
    })

    return (
        <form onSubmit={formik.handleSubmit} className="bg-[#F5F6FA] rounded-md p-6 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-primary">Change Password</h3>

            <FieldGroup>
                <div className="flex flex-col gap-5">


                    {/* New Password */}
                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showNew ? "text" : "password"}
                                placeholder="********"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew(prev => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                            >
                                {showNew ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm">{formik.errors.password}</p>
                        )}
                    </Field>

                    {/* Confirm Password */}
                    <Field>
                        <Label htmlFor="password_confirmation">Password</Label>
                        <div className="relative">
                            <Input
                                id="password_confirmation"
                                name="password_confirmation"
                                type={showConfirm ? "text" : "password"}
                                placeholder="********"
                                value={formik.values.password_confirmation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(prev => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                            >
                                {showConfirm ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                            </button>
                        </div>
                        {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                            <p className="text-red-500 text-sm">{formik.errors.password_confirmation}</p>
                        )}
                    </Field>
                </div>
            </FieldGroup>

            <div className="flex items-center gap-4">
                <Button
                    type="button"
                    variant="outline"
                    className="rounded-none flex-1 py-3"
                    onClick={() => formik.resetForm()}
                >
                    إلغاء
                </Button>
                <Button
                    type="submit"
                    variant="default"
                    className="rounded-none flex-1 py-3"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? "جاري الحفظ..." : "تغير"}
                </Button>

            </div>
        </form>
    )
}