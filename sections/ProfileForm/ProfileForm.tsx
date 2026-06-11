"use client"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SuccessAlert } from "@/components/Alert/SuccessAlert"



const profileSchema = Yup.object({
    name: Yup.string()
        .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
        .required("الاسم مطلوب"),
    email: Yup.string()
        .email("البريد الإلكتروني غير صحيح")
        .required("البريد الإلكتروني مطلوب"),
    phone: Yup.string()
        .matches(/^[0-9]{7,15}$/, "رقم الهاتف غير صحيح")
        .required("رقم الهاتف مطلوب"),
    phone_code: Yup.string().required("كود الدولة مطلوب"),
    country_id: Yup.string().required("الدولة مطلوبة"),
    date_of_birth: Yup.string().required("تاريخ الميلاد مطلوب"),
    gender: Yup.string().required("النوع مطلوب"),
})

export default function ProfileForm({ profile, token }: PropsProfile) {
    const [countries, setCountries] = useState<Country[]>([])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/general/countries`)
            .then(res => res.json())
            .then(data => setCountries(data.data ?? []))
    }, [])

    const formik = useFormik({
        initialValues: {
            name: profile?.name ?? "",
            email: profile?.email ?? "",
            phone: profile?.phone ?? "",
            phone_code: profile?.phone_code ?? "",
            country_id: profile?.country_id ?? "",
            date_of_birth: profile?.date_of_birth ?? "",
            gender: profile?.gender ?? "",
        },
        validationSchema: profileSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE}/api/client/profile_edit`,
                    {
                        method: "Put",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(values),
                    }
                ).then(res => res.json())

                if (response.data) {
                    SuccessAlert("تم تعديل البيانات بنجاح")
                }
            } catch (error) {
                console.error("Profile edit error:", error)
            } finally {
                setSubmitting(false)
            }
        },
    })

    const selectedCountry = countries.find(
        c => c.id.toString() === formik.values.country_id
    )

    return (
        <form onSubmit={formik.handleSubmit}>
            <FieldGroup>
                <div className="grid grid-cols-2 gap-4">

                    {/* Full Name */}
                    <Field>
                        <Label htmlFor="name">الاسم كامل</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="أدخل الاسم كامل"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-sm">{formik.errors.name}</p>
                        )}
                    </Field>

                    {/* Country */}
                    <Field>
                        <Label>الدولة</Label>
                        <Select
                            defaultValue={ profile?.country?.name}
                            onValueChange={(value) => {
                                const country = countries.find(c => c.id.toString() === value)
                                formik.setFieldValue("country_id", value)
                                formik.setFieldValue("phone_code", country?.phone_code ?? "")
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="اختر الدولة">
                                    {selectedCountry && (
                                        <span className="flex items-center gap-2">

                                            <span>{selectedCountry.name}</span>
                                        </span>
                                    )}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {countries.map(country => (
                                    <SelectItem key={country.id} value={country.id.toString()}>
                                        <span className="flex items-center gap-2">

                                            <span>{country.name}</span>
                                        </span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {formik.touched.country_id && formik.errors.country_id && (
                            <p className="text-red-500 text-sm">{formik.errors.country_id}</p>
                        )}
                    </Field>

                    {/* Email */}
                    <Field>
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="أدخل البريد الإلكتروني"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm">{formik.errors.email}</p>
                        )}
                    </Field>

                    {/* date_of_birth */}
                    <Field>
                        <Label htmlFor="date_of_birth">تاريخ الميلاد</Label>
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

                    {/* Phone with country code */}
                    <Field>
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <div className="flex border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-ring">
                            <Select
                                defaultValue={
                                    countries.find(c => c.phone_code === formik.values.phone_code)?.flag
                                }
                                onValueChange={(value) => {
                                    const country = countries.find(c => c.flag === value)
                                    formik.setFieldValue("phone_code", country?.phone_code ?? "")
                                    formik.setFieldValue("country_id", country?.id.toString() ?? "")
                                }}
                            >

                                <SelectContent>
                                    {countries.map(country => (
                                        <SelectItem key={country.id} value={country.flag}>
                                            <span className="flex items-center gap-2">
                                                <img
                                                width={20}
                                                height={20}
                                                    src={country.flag}
                                                    alt={country.name}
                                                    className="w-5 h-4 object-cover rounded-sm"
                                                />
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
                                placeholder="Phone Number"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="border-none shadow-none rounded-none focus-visible:ring-0 flex-1"
                            />
                        </div>
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                        )}
                        {formik.touched.phone_code && formik.errors.phone_code && (
                            <p className="text-red-500 text-sm">{formik.errors.phone_code}</p>
                        )}
                    </Field>

                    {/* Gender */}
                    <Field>
                        <Label>النوع</Label>
                        <Select
                            defaultValue={formik.values.gender}
                            onValueChange={(value) => formik.setFieldValue("gender", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="اختر النوع" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">ذكر</SelectItem>
                                <SelectItem value="female">انثى</SelectItem>
                            </SelectContent>
                        </Select>
                        {formik.touched.gender && formik.errors.gender && (
                            <p className="text-red-500 text-sm">{formik.errors.gender}</p>
                        )}
                    </Field>

                </div>
            </FieldGroup>

            <Button
                type="submit"
                className="rounded-none w-fit my-3 py-3 px-4 gap-4 text-lg flex items-center cursor-pointer"
                disabled={formik.isSubmitting}
            >
                {formik.isSubmitting ? "جاري الحفظ..." : "Edit Profile"}
            </Button>
        </form>
    )
}