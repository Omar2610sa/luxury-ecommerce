"use client"
import MainButton from "@/components/Layout/MainButton"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import {  Dialog, DialogFooter,DialogTrigger} from "@/components/ui/dialog"
import {  FieldGroup } from "@/components/ui/field"
import {  User2 } from "lucide-react"
import { useLogin } from "../hooks/use-login"
import AuthDialog from "../../components/AuthDialog"
import AuthField from "../../components/AuthField"

export function LoginDialog() {
    const t = useTranslations('LoginDialog')
    const { formik, open, setOpen } = useLogin()

    return (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
            <DialogTrigger className="">
                <div className="hidden md:flex">
                    <MainButton text={t('trigger')} />
                </div>
                <div className="md:hidden flex justify-center items-center relative size-10 md:size-12 rounded-full bg-primary">
                    <User2 className="size-5 text-white" />
                </div>
            </DialogTrigger>
            <AuthDialog title={t('title')}>
                <form onSubmit={formik.handleSubmit}>
                    <FieldGroup>
                        <AuthField 
                        label={t('identifier.label')}
                        id="identifier"
                        name="identifier"
                        type="text"
                        placeholder={t('identifier.placeholder')}
                        value={formik.values.identifier}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        error={formik.touched.identifier ? formik.errors.identifier : undefined}
                        /> 
                        <AuthField 
                        label={t('password.label')}
                        id="password"
                        name="password"
                        type="password"
                        placeholder={t('password.placeholder')}
                        value={formik.values.password}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        error={formik.touched.password ? formik.errors.password : undefined}
                        />
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
            </AuthDialog>
        </Dialog>
    )
}


