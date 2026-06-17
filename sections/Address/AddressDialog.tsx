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
import { ErrorAlert } from "@/components/Alert/ErrorAlert"
import Image from "next/image"
import { apiClient } from "@/services/useApiClient"
import { apiClientGeneral } from "@/services/useApiClientGeneral"
import GoogleMap from "@/components/GoogleMap/GoogleMap"
import SimpleMap from "@/components/GoogleMap/GoogleMap"
import { useRouter } from "next/navigation"

type Country = {
    id: number
    name: string
    flag: string
    phone_code: string
}

type StateType = {
    id: number
    name: string
}

type City = {
    id: number
    name: string
}

const addressSchema = Yup.object({
    first_name: Yup.string().min(2, "الاسم الأول يجب أن يكون حرفين على الأقل").required("الاسم الأول مطلوب"),
    last_name: Yup.string().min(2, "اسم العائلة يجب أن يكون حرفين على الأقل").required("اسم العائلة مطلوب"),
    country_id: Yup.string().required("الدولة مطلوبة"),
    state_id: Yup.string().required("المنطقة مطلوبة"),
    city_id: Yup.string().required("المدينة مطلوبة"),
    street_address: Yup.string().min(5, "العنوان يجب أن يكون 5 أحرف على الأقل").required("العنوان مطلوب"),
    phone: Yup.string()
        .matches(/^[0-9]{7,15}$/, "رقم الهاتف غير صحيح")
        .required("رقم الهاتف مطلوب"),
    zip_code: Yup.string().required("الرمز البريدي مطلوب"),
    is_default: Yup.boolean(),
})

export function AddressDialog() {
    const [open, setOpen] = useState(false)
    const [countries, setCountries] = useState<Country[]>([])
    const [states, setStates] = useState<StateType[]>([])
    const [cities, setCities] = useState<City[]>([])
    const router = useRouter()
    useEffect(() => {
        if (!open) return
        apiClientGeneral<{ data?: Country[] }>("countries", { method: "GET" })
            .then(res => setCountries(res?.data ?? []))
    }, [open])

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            country_id: "",
            state_id: "",
            city_id: "",
            phone_code: "",
            phone: "",
            street_address: "",
            zip_code: "",
            lat: "",
            lng: "",
            is_default: false,
        },
        validationSchema: addressSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await apiClient<{ status?: string; message?: string }>("address", {
                    method: "POST",
                    body: {
                        street_address: values.street_address,
                        country_id: values.country_id,
                        state_id: values.state_id,
                        city_id: values.city_id,
                        first_name: values.first_name,
                        last_name: values.last_name,
                        phone_code: values.phone_code,
                        phone: values.phone,
                        zip_code: values.zip_code,
                        lat: values.lat,
                        lng: values.lng,
                        is_default: values.is_default,
                    },
                })

                if (response?.status === "success") {
                    resetForm()
                    setStates([])
                    setCities([])
                    setOpen(false)
                    router.refresh()
                } else {
                    ErrorAlert(response?.message ?? "حدثت مشكلة")
                }
            } catch {
                ErrorAlert("حدثت مشكلة في الاتصال بالسيرفر")
            } finally {
                setSubmitting(false)
            }
        },
    })

    const selectedCountry = countries.find(c => c.id.toString() === (formik.values.country_id))

    const handleCountryChange = async (countryId: string) => {
        const country = countries.find(c => c.id.toString() === countryId)

        formik.setFieldValue("country_id", countryId)
        formik.setFieldValue("phone_code", country?.phone_code ?? "")
        formik.setFieldValue("state_id", "")
        formik.setFieldValue("city_id", "")
        setStates([])
        setCities([])

        const res = await apiClientGeneral<{ data?: StateType[] }>(`get_country_states/${countryId}`, { method: "GET" })
        setStates(res?.data ?? [])
    }

    const handleStateChange = async (stateId: string) => {
        formik.setFieldValue("state_id", stateId)
        formik.setFieldValue("city_id", "")
        setCities([])

        const res = await apiClientGeneral<{ data?: City[] }>(`get_state_cities/${stateId}`, { method: "GET" })
        setCities(res?.data ?? [])
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-primary text-primary-foreground text-xl  p-3 hover:bg-primary/40 hover:text-white cursor-pointer w-full">
                إضافه عنوان جديد
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl scrollbar-thumb-primary overflow-y-scroll h-[90vh]">
                <form onSubmit={formik.handleSubmit}>
                    <DialogHeader className="mb-5">
                        <DialogTitle className="text-2xl my-3 mx-auto">إضافه عنوان جديد</DialogTitle>
                    </DialogHeader>

                    <FieldGroup className="grid grid-cols-2 gap-4">
                        {/* الدولة */}
                        <Field>
                            <Label>الدولة</Label>
                            <Select value={countries.find(c => c.id.toString() === formik.values.country_id)?.name} onValueChange={handleCountryChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر الدولة" >
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

                        {/* المنطقة */}
                        <Field>
                            <Label>المنطقة</Label>
                            <Select
                                value={states.find(c => c.id.toString() === formik.values.state_id)?.name}
                                onValueChange={handleStateChange}
                                disabled={!formik.values.country_id}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر المنطقة" >
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

                    </FieldGroup>

                    {/* المدينة */}
                    <Field>
                        <Label>المدينة</Label>

                        <Select
                            value={formik.values.city_id}
                            onValueChange={(value) => formik.setFieldValue("city_id", value)}
                            disabled={!formik.values.state_id}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="اختر المدينة" >
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
                    <FieldGroup className="grid grid-cols-2 gap-4 mt-5">
                        <Field>
                            <Label htmlFor="first_name">الاسم الأول</Label>
                            <Input
                                id="first_name"
                                name="first_name"
                                placeholder="أدخل الاسم الأول"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.first_name && formik.errors.first_name && (
                                <p className="text-red-500 text-sm">{formik.errors.first_name}</p>
                            )}
                        </Field>

                        <Field>
                            <Label htmlFor="last_name">اسم العائلة</Label>
                            <Input
                                id="last_name"
                                name="last_name"
                                placeholder="أدخل اسم العائلة"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.last_name && formik.errors.last_name && (
                                <p className="text-red-500 text-sm">{formik.errors.last_name}</p>
                            )}
                        </Field>
                    </FieldGroup>

                    {/* الهاتف */}
                    <Field className="mt-5">
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <div className="flex border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-ring">
                            <div className="flex items-center gap-2 px-3 bg-muted text-sm whitespace-nowrap">
                                {selectedCountry ? (
                                    <>
                                        <Image
                                            width={20}
                                            height={14}
                                            src={selectedCountry.flag}
                                            alt={selectedCountry.name}
                                            className="w-5 h-3.5 object-cover rounded-sm"
                                        />
                                        <span>{selectedCountry.phone_code}</span>
                                    </>
                                ) : (
                                    <span className="text-muted-foreground">🌍</span>
                                )}
                            </div>
                            <div className="w-px bg-border self-stretch" />
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="أدخل رقم الهاتف"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="border-none shadow-none rounded-none focus-visible:ring-0 flex-1"
                            />
                        </div>
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                        )}
                    </Field>

                    <FieldGroup className="grid grid-cols-2 gap-4 mt-5">
                        <Field>
                            <Label htmlFor="street_address">العنوان</Label>
                            <Input
                                id="street_address"
                                name="street_address"
                                placeholder="أدخل العنوان بالتفصيل"
                                value={formik.values.street_address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.street_address && formik.errors.street_address && (
                                <p className="text-red-500 text-sm">{formik.errors.street_address}</p>
                            )}
                        </Field>

                        <Field>
                            <Label htmlFor="zip_code">الرمز البريدي</Label>
                            <Input
                                id="zip_code"
                                name="zip_code"
                                placeholder="أدخل الرمز البريدي"
                                value={formik.values.zip_code}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.zip_code && formik.errors.zip_code && (
                                <p className="text-red-500 text-sm">{formik.errors.zip_code}</p>
                            )}
                        </Field>
                    </FieldGroup>
                    <Field className="my-8">
                        <SimpleMap
                            onLocationSelect={(lat, lng) => {
                                formik.setFieldValue("lat", lat);
                                formik.setFieldValue("lng", lng);
                            }}
                        />

                    </Field>
                    <Field className="mt-5 flex flex-row justify-start">
                        <Input
                            id="is_default"
                            name="is_default"
                            type="checkbox"
                            checked={formik.values.is_default}
                            onChange={formik.handleChange}
                            className="h-4 w-4"
                        />
                        <Label htmlFor="is_default">تعيين كعنوان افتراضي</Label>
                    </Field>

                    <DialogFooter className="mt-6">
                        <Button
                            className="w-full cursor-pointer"
                            type="submit"
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting ? "جاري الإضافة..." : "إضافة عنوان"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}