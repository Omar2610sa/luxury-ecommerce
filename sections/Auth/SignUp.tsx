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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useState, useEffect } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { OtpDialog } from "./SignOtp"
import { ErrorAlert } from "@/components/Alert/ErrorAlert"
import { apiClient } from "@/services/useApiClient"
import { useTranslations } from "next-intl"
import { apiClientGeneral } from "@/services/useApiClientGeneral"
import Cookies from "js-cookie"



type Country = {
    id: number
    name: string
    flag: string
    phone_code: string
}

type City = {
    id: number
    name: string
}

type StateType = {
    id: number
    name: string
}


export function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [open, setOpen] = useState(false)
    const [countries, setCountries] = useState<Country[]>([])
    const [states, setStates] = useState<StateType[]>([])
    const [cities, setCities] = useState<City[]>([])
    const [selectedPhoneCode, setSelectedPhoneCode] = useState("")
    const [otpOpen, setOtpOpen] = useState(false)
    const t = useTranslations('SignUp')

    const signUpSchema = Yup.object({
        name: Yup.string()
            .min(3, t('validation.name.min'))
            .required(t('validation.name.required')),
        email: Yup.string()
            .email(t('validation.email.invalid'))
            .required(t('validation.email.required')),
        phone: Yup.string()
            .matches(/^[0-9]{7,15}$/, t('validation.phone.invalid'))
            .required(t('validation.phone.required')),
        country_id: Yup.string().required(t('validation.country.required')),
        state_id: Yup.string().required(t('validation.state.required')),
        city_id: Yup.string().required(t('validation.city.required')),
        gender: Yup.string().required(t('validation.gender.required')),
        date_of_birth: Yup.string().required(t("validation.dob_required")),

        password: Yup.string()
            .min(6, t('validation.password.min'))
            .required(t('validation.password.required')),
    });

    useEffect(() => {
        if (!open) return
        apiClientGeneral<{ data?: Country[] }>("countries", { method: "GET" })
            .then(res => setCountries(res?.data ?? []))

    }, [open])

    const guestToken = Cookies.get('guest_token')


    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            country_id: "",
            phone_code: "",
            date_of_birth: "",
            city_id: "",
            state_id: "",
            gender: "",
            password: "",
        },
        validationSchema: signUpSchema,
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
    })


    const handleCountryChange = (value: string | null) => {
        const countryId = value ?? ""
        const country = countries.find(c => c.id.toString() === countryId)

        formik.setFieldValue("country_id", countryId)
        formik.setFieldValue("phone_code", country?.phone_code ?? "")
        formik.setFieldValue("state_id", "")
        formik.setFieldValue("city_id", "")
        setCities([])

        if (!countryId) return

            ; (async () => {
                const res = await apiClientGeneral<{ data?: StateType[] }>(`get_country_states/${countryId}`, { method: "GET" })
                setStates(res?.data ?? [])
            })()
    }


    const handleStateChange = (value: string | null) => {
        const stateId = value ?? ""
        formik.setFieldValue("state_id", stateId)
        formik.setFieldValue("city_id", "")
        setCities([])

        if (!stateId) return

            ; (async () => {
                const res = await apiClientGeneral<{ data?: City[] }>(`get_state_cities/${stateId}`, { method: "GET" })
                setCities(res?.data ?? [])
            })()
    }


    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <MainButton text={t('trigger')} />
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg scrollbar-thumb-primary overflow-y-scroll max-h-[80vh]">
                    <form onSubmit={formik.handleSubmit}>
                        <DialogHeader className="mb-3">
                            <DialogTitle className="text-lg">{t('title')}</DialogTitle>
                            <p className="text-2xl my-3 mx-auto">{t('subtitle')}</p>
                        </DialogHeader>

                        <FieldGroup>
                            {/* Name */}
                            <Field>
                                <Label htmlFor="name">{t('fields.name.label')}</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder={t('fields.name.placeholder')}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <p className="text-red-500 text-sm">{formik.errors.name}</p>
                                )}
                            </Field>

                            {/* Email */}
                            <Field>
                                <Label htmlFor="email">{t('fields.email.label')}</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder={t('fields.email.placeholder')}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                                )}
                            </Field>

                            {/* Phone */}
                            <Field>
                                <Label htmlFor="phone">{t('fields.phone.label')}</Label>
                                <div className="flex border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-ring">
                                    <Select onValueChange={(value) => {
                                        const country = countries.find(c => c.flag === value)
                                        setSelectedPhoneCode(country?.phone_code ?? "")
                                        formik.setFieldValue("phone_code", country?.phone_code ?? "") // ✅ بس phone_code
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

                            {/* DOB */}
                            <Field>
                                <Label htmlFor="date_of_birth">{t('fields.dob.label')}</Label>
                                <Input
                                    id="date_of_birth"
                                    name="date_of_birth"
                                    type="date"
                                    value={formik.values.date_of_birth}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.date_of_birth && formik.errors.date_of_birth && (
                                    <p className="text-red-500 text-sm">{formik.errors.date_of_birth}</p>
                                )}
                            </Field>

                            {/* Password */}
                            <Field>
                                <Label htmlFor="password">{t('fields.password.label')}</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder={t('fields.password.placeholder')}
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="pl-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(p => !p)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    >
                                        {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                                    </button>
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <p className="text-red-500 text-sm">{formik.errors.password}</p>
                                )}
                            </Field>
                        </FieldGroup>

                        <DialogFooter className="mt-4">
                            <Button className="w-full cursor-pointer" type="submit" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? t('submitting') : t('submit')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <OtpDialog open={otpOpen} onOpenChange={setOtpOpen} />

        </>

    )
}