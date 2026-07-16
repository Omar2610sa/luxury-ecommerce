"use client"

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
import { apiClient } from "@/services/useApiClient"
import { SuccessAlert } from "@/components/Alert/SuccessAlert"
import { ErrorAlert } from "@/components/Alert/ErrorAlert"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

export default function AddBalance({ title }: { title: string }) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const t = useTranslations('AddBalance')

    const schema = Yup.object({
        amount: Yup.number()
            .typeError(t('validation.amount_number'))
            .min(1, t('validation.amount_min'))
            .required(t('validation.amount_required')),
    })

    const formik = useFormik({
        initialValues: {
            amount: "",
        },
        validationSchema: schema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await apiClient("wallet/add_balance", {
                    method: "POST",
                    body: { amount: values.amount },
                })

                if (response?.status === "success") {
                    SuccessAlert(t('success'))
                    setOpen(false)
                    resetForm()
                    router.refresh()
                } else {
                    ErrorAlert(response?.message ?? t('error'))
                }
            } catch {
                ErrorAlert(t('error'))
            } finally {
                setSubmitting(false)
            }
        },
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="px-10 py-5 rounded-none font-medium bg-white text-[#926D35] border-white hover:bg-white/90 hover:text-[#926D35]"
                >
                    {title}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <form onSubmit={formik.handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-lg mb-3">
                            {title}
                        </DialogTitle>
                    </DialogHeader>

                    <FieldGroup>
                        <Field>
                            <Label htmlFor="amount">{t('amount.label')}</Label>
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                placeholder={t('amount.placeholder')}
                                value={formik.values.amount}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.amount && formik.errors.amount && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.amount}
                                </p>
                            )}
                        </Field>
                    </FieldGroup>

                    <DialogFooter className="mt-4">
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