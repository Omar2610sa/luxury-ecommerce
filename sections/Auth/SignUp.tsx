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
import { SuccessAlert } from "@/components/Alert/SuccessAlert"
import { OtpDialog } from "./SignOtp"

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

const signUpSchema = Yup.object({
    name: Yup.string()
        .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
        .required("الاسم مطلوب"),
    email: Yup.string()
        .email("البريد الإلكتروني غير صحيح")
        .required("البريد الإلكتروني مطلوب"),
    phone: Yup.string()
        .matches(/^[0-9]{7,15}$/, "رقم الهاتف غير صحيح")
        .required("رقم الهاتف مطلوب"),
    country_id: Yup.string().required("الدولة مطلوبة"),
    city_id: Yup.string().required("المدينة مطلوبة"),
    gender: Yup.string().required("النوع مطلوب"),
    password: Yup.string()
        .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
        .required("كلمة المرور مطلوبة"),
})

export function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [open, setOpen] = useState(false)
    const [countries, setCountries] = useState<Country[]>([])
    const [cities, setCities] = useState<City[]>([])
    const [selectedPhoneCode, setSelectedPhoneCode] = useState("")
    const [otpOpen, setOtpOpen] = useState(false)

    useEffect(() => {
        if (!open) return
        fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/general/countries`)
            .then(res => res.json())
            .then(data => setCountries(data.data ?? []))

        fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/general/cities`)
            .then(res => res.json())
            .then(data => setCities(data.data ?? []))
    }, [open])

    const getGuestToken = () => {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith('guest_token='))
            ?.split('=')[1] ?? ''
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            country_id: "",
            phone_code: "",
            city_id: "",
            gender: "",
            password: "",
        },
        validationSchema: signUpSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE}/api/client/register`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            name: values.name,
                            email: values.email,
                            phone_code: `${selectedPhoneCode}`,
                            phone: `${values.phone}`,
                            country_id: values.country_id,
                            city_id: values.city_id,
                            date_of_birth: "2020-05-01",
                            gender: values.gender,
                            password: values.password,
                            type: "ios",
                            device_token: getGuestToken(),
                        }),
                    }
                ).then(res => res.json())

                if (response) {
                    setOpen(false)
                    document.cookie = `user_phone=${values.phone}; path=/`
                    document.cookie = `user_phone_code=${selectedPhoneCode}; path=/`
                    setOpen(false)
                    setOtpOpen(true)
                }
            } catch (error) {
                console.error("Register error:", error)
            } finally {
                setSubmitting(false)
            }
        },
    })

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <MainButton text="انشاء حساب جديد" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg scrollbar-thumb-primary overflow-y-auto max-h-[90vh]">
                    <form onSubmit={formik.handleSubmit}>
                        <DialogHeader className="mb-3">
                            <DialogTitle className="text-lg">قم بإنشاء حسابك</DialogTitle>
                            <p className="text-2xl my-3 mx-auto">إنشاء حساب جديد</p>
                        </DialogHeader>

                        <FieldGroup>
                            {/* Name */}
                            <Field>
                                <Label htmlFor="name">الاسم كامل</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="أدخل الاسم كامل"
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
                                <Label htmlFor="email">البريد الإلكتروني</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="أدخل البريد الإلكتروني"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                                )}
                            </Field>

                            {/* Phone with country code */}
                            <Field>
                                <Label htmlFor="phone">رقم الهاتف</Label>
                                <div className="flex border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-ring">
                                    <Select
                                        onValueChange={(value) => {
                                            const country = countries.find(c => c.flag === value)
                                            setSelectedPhoneCode(country?.phone_code ?? "")
                                            formik.setFieldValue("country_id", country?.id.toString() ?? "")
                                        }}
                                    >
                                        <SelectTrigger className="w-[60px] border-none shadow-none rounded-none focus:ring-0 bg-muted px-2">
                                            <SelectValue>
                                                {selectedPhoneCode ? (
                                                    <img
                                                        src={countries.find(c => c.phone_code === selectedPhoneCode)?.flag}
                                                        alt=""
                                                        className="w-6 h-4 object-cover rounded-sm"
                                                    />
                                                ) : (
                                                    <span>🌍</span>
                                                )}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countries.map(country => (
                                                <SelectItem key={country.id} value={country.flag}>
                                                    <span className="flex items-center gap-2">
                                                        <img
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
                                {formik.touched.country_id && formik.errors.country_id && (
                                    <p className="text-red-500 text-sm">{formik.errors.country_id}</p>
                                )}
                            </Field>

                            {/* City */}
                            <Field>
                                <Label>المدينة</Label>
                                <Select
                                    onValueChange={(value) => formik.setFieldValue("city_id", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="اختر المدينة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cities.map(city => (
                                            <SelectItem key={city.id} value={city.name}>
                                                {city.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {formik.touched.city_id && formik.errors.city_id && (
                                    <p className="text-red-500 text-sm">{formik.errors.city_id}</p>
                                )}
                            </Field>

                            {/* Gender  */}
                            <Field>
                                <Label>النوع</Label>
                                <Select
                                    onValueChange={(value) => formik.setFieldValue("gender", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="اختر النوع" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">ذكر</SelectItem>
                                        <SelectItem value="female">أنثى</SelectItem>
                                    </SelectContent>
                                </Select>
                                {formik.touched.gender && formik.errors.gender && (
                                    <p className="text-red-500 text-sm">{formik.errors.gender}</p>
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
                            <Button
                                className="w-full cursor-pointer"
                                type="submit"
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? "جاري التسجيل..." : "إنشاء الحساب"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <OtpDialog open={otpOpen} onOpenChange={setOtpOpen} />

        </>

    )
}