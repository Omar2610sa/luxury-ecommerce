"use client"
import MainButton from "@/components/Layout/MainButton"
import { Button } from "@/components/ui/button"
import { Dialog, DialogFooter, DialogHeader, DialogTrigger, } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, } from "react"
import { OtpDialog } from "../../otp/components/SignOtp"
import { useTranslations } from "next-intl"
import { useSignUp } from "../hooks/use-signUp"
import AuthDialog from "../../components/AuthDialog"
import AuthField from "../../components/AuthField"
import { useCountryChange } from "../hooks/use-countryChange"
import { UserPlus2Icon } from "lucide-react"
import { useStateChange } from "../hooks/use-state-change"

export function SignUp() {
    const [selectedPhoneCode, setSelectedPhoneCode] = useState("")
    const t = useTranslations('SignUp')
    const { formik, open, setOpen, otpOpen, setOtpOpen } = useSignUp()
    const { handleCountryChange, states, cities, setCities, countries } = useCountryChange({ formik, open })
    const { handleStateChange } = useStateChange({ formik, setCities })

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen} modal={false}>
                <DialogTrigger>
                    <div className="hidden md:flex">
                        <MainButton text={t('trigger')} />
                    </div>
                    <div className="md:hidden flex justify-center items-center relative size-10 md:size-12 rounded-full bg-primary">
                        <UserPlus2Icon className="size-5 text-white" />
                    </div>
                </DialogTrigger>
                <AuthDialog title={t('title')} className="sm:max-w-lg scrollbar-thumb-primary overflow-y-scroll max-h-[80vh]">
                    <form onSubmit={formik.handleSubmit}>
                        <DialogHeader className="mb-3">
                            <p className="text-2xl my-3 mx-auto">{t('subtitle')}</p>
                        </DialogHeader>
                        <FieldGroup>
                            <AuthField
                                label={t('fields.name.label')}
                                id="name"
                                name="name"
                                type="text"
                                placeholder={t('fields.name.placeholder')}
                                value={formik.values.name}
                                handleChange={formik.handleChange}
                                handleBlur={formik.handleBlur}
                                error={formik.touched.name ? formik.errors.name : undefined}
                            />
                            <AuthField
                                label={t('fields.email.label')}
                                id="email"
                                name="email"
                                type="email"
                                placeholder={t('fields.email.placeholder')}
                                value={formik.values.email}
                                handleChange={formik.handleChange}
                                handleBlur={formik.handleBlur}
                                error={formik.touched.email ? formik.errors.email : undefined}
                            />

                            {/* Phone */}
                            <Field>
                                <Label htmlFor="phone">{t('fields.phone.label')}</Label>
                                <div className="flex border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-ring">
                                    <Select onValueChange={(value) => {
                                        const country = countries.find(c => c.flag === value)
                                        setSelectedPhoneCode(country?.phone_code ?? "")
                                        formik.setFieldValue("phone_code", country?.phone_code ?? "")
                                    }}
                                    >
                                        <SelectTrigger className="w-[60px] border-none shadow-none rounded-none focus:ring-0 bg-muted px-2">
                                            <SelectValue>
                                                {selectedPhoneCode ? (
                                                    <img src={countries.find(c => c.phone_code === selectedPhoneCode)?.flag} alt="" className="w-6 h-4 object-cover rounded-sm" />
                                                ) : (
                                                    <span>🌍</span>
                                                )}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countries.map(country => (
                                                <SelectItem key={country.id} value={country.flag}>
                                                    <span className="flex items-center gap-2">
                                                        <img src={country.flag} alt={country.name} className="w-5 h-4 object-cover rounded-sm" />
                                                        <span>{country.phone_code}</span>
                                                    </span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <div className="w-px bg-border self-stretch" />
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder={t('fields.phone.placeholder')}
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="border-none shadow-none rounded-none focus-visible:ring-0 flex-1"
                                    />
                                </div>
                                {formik.touched.phone && formik.errors.phone && (
                                    <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                                )}
                                {formik.touched.country_id && formik.errors.country_id && (
                                    <p className="text-red-500 text-sm">{formik.errors.country_id}</p>
                                )}
                            </Field>
                            {/* Country */}
                            <Field>
                                <Label>{t('fields.country.label')}</Label>
                                <Select value={countries.find(c => c.id.toString() === formik.values.country_id)?.name} onValueChange={handleCountryChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('fields.country.placeholder')}>
                                            {countries.find(c => c.id.toString() === formik.values.country_id)?.name}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map(country => (
                                            <SelectItem key={country.id} value={country.id.toString()}  >
                                                {country.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {formik.touched.country_id && formik.errors.country_id && (
                                    <p className="text-red-500 text-sm">{formik.errors.country_id}</p>
                                )}
                            </Field>
                            {/* state */}
                            <Field>
                                <Label>{t('fields.state.label')}</Label>
                                <Select
                                    value={states.find(c => c.id.toString() === formik.values.state_id)?.name}
                                    onValueChange={handleStateChange}
                                    disabled={!formik.values.country_id}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('fields.state.placeholder')} >
                                            {states.find(c => c.id.toString() === formik.values.state_id)?.name}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {states.map(state => (
                                            <SelectItem key={state.id} value={state.id.toString()}>
                                                {state.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {formik.touched.state_id && formik.errors.state_id && (
                                    <p className="text-red-500 text-sm">{formik.errors.state_id}</p>
                                )}
                            </Field>
                            {/* city */}
                            <Field>
                                <Label>{t('fields.city.label')}</Label>
                                <Select
                                    value={formik.values.city_id}
                                    onValueChange={(value) => formik.setFieldValue("city_id", value)}
                                    disabled={!formik.values.state_id}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('fields.city.placeholder')} >
                                            {cities.find(c => c.id.toString() === formik.values.city_id)?.name}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cities.map(city => (
                                            <SelectItem key={city.id} value={city.id.toString()}>
                                                {city.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {formik.touched.city_id && formik.errors.city_id && (
                                    <p className="text-red-500 text-sm">{formik.errors.city_id}</p>
                                )}
                            </Field>

                            {/* Gender */}
                            <Field>
                                <Label>{t('fields.gender.label')}</Label>
                                <Select onValueChange={(value) => formik.setFieldValue("gender", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('fields.gender.placeholder')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">{t('fields.gender.male')}</SelectItem>
                                        <SelectItem value="female">{t('fields.gender.female')}</SelectItem>
                                    </SelectContent>
                                </Select>
                                {formik.touched.gender && formik.errors.gender && (
                                    <p className="text-red-500 text-sm">{formik.errors.gender}</p>
                                )}
                            </Field>
                            <AuthField
                                label={t('fields.dob.label')}
                                id="date_of_birth"
                                name="date_of_birth"
                                type="date"
                                value={formik.values.date_of_birth}
                                placeholder={t('fields.dob.placeholder')}
                                handleChange={formik.handleChange}
                                handleBlur={formik.handleBlur}
                                error={formik.touched.date_of_birth ? formik.errors.date_of_birth : undefined}
                            />
                            <AuthField
                                label={t('fields.password.label')}
                                id="password"
                                name="password"
                                type={"password"}
                                placeholder={t('fields.password.placeholder')}
                                value={formik.values.password}
                                handleChange={formik.handleChange}
                                handleBlur={formik.handleBlur}
                                error={formik.touched.password ? formik.errors.password : undefined}
                            />
                        </FieldGroup>
                        <DialogFooter className="mt-4">
                            <Button className="w-full cursor-pointer" type="submit" >
                                {formik.isSubmitting ? t('submitting') : t('submit')}
                            </Button>
                        </DialogFooter>
                    </form>
                </AuthDialog>
            </Dialog>
            <OtpDialog open={otpOpen} onOpenChange={setOtpOpen} />
        </>
    )
}
