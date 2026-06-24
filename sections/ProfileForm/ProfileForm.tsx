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
import { apiClient } from "@/services/useApiClient"
import Image from "next/image"
import { useTranslations } from "next-intl"

export default function ProfileForm({ profile }: { profile: Profile }) {
    const t = useTranslations("Edit Profile")

    const profileSchema = Yup.object({
        name: Yup.string()
            .min(3, t("validation.name_min"))
            .required(t("validation.name_required")),
        email: Yup.string()
            .email(t("validation.email_invalid"))
            .required(t("validation.email_required")),
        phone: Yup.string()
            .matches(/^[0-9]{7,15}$/, t("validation.phone_invalid"))
            .required(t("validation.phone_required")),
        phone_code: Yup.string().required(t("validation.phone_code_required")),
        country_id: Yup.string().required(t("validation.country_required")),
        date_of_birth: Yup.string().required(t("validation.dob_required")),
        gender: Yup.string().required(t("validation.gender_required")),
    })

    const [countries, setCountries] = useState<Country[]>([])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/general/countries`)
            .then((res) => res.json())
            .then((data) => setCountries(data.data ?? []))
    }, [])

    const formik = useFormik({
        initialValues: {
            name: profile?.name ?? "",
            email: profile?.email ?? "",
            phone: profile?.phone ?? "",
            phone_code: profile?.phone_code ?? "",
            country_id: profile?.country?.id ?? "",
            date_of_birth: profile?.date_of_birth ?? "",
            gender: profile?.gender ?? "",
        },
        validationSchema: profileSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await apiClient<{ data?: Profile }>(
                    "profile_edit",
                    {
                        method: "PUT",
                        body: {
                            name: values.name,
                            email: values.email,
                            phone: values.phone,
                            country_id: values.country_id,
                            phone_code: values.phone_code,
                            date_of_birth: values.date_of_birth,
                            gender: values.gender,
                        },
                    }
                )

                if (response.data) {
                    SuccessAlert(t("success"))
                }
            } catch (error) {
                console.error("Profile edit error:", error)
            } finally {
                setSubmitting(false)
            }
        },
    })

    const selectedCountry = countries.find(
        (c) => c.id.toString() === formik.values.country_id
    )

    return (
        <form onSubmit={formik.handleSubmit}>
            <FieldGroup>
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <Field>
                        <Label htmlFor="name">{t("fields.name")}</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder={t("placeholders.name")}
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
                        <Label>{t("fields.country")}</Label>
                        <Select
                            defaultValue={profile?.country?.name}
                            onValueChange={(value) => {
                                const country = countries.find(
                                    (c) => c.id.toString() === value
                                )
                                formik.setFieldValue("country_id", value)
                                formik.setFieldValue(
                                    "phone_code",
                                    country?.phone_code ?? ""
                                )
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={t("placeholders.country")}>
                                    {selectedCountry && (
                                        <span className="flex items-center gap-2">
                                            <span>{selectedCountry.name}</span>
                                        </span>
                                    )}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {countries.map((country) => (
                                    <SelectItem
                                        key={country.id}
                                        value={country.id.toString()}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span>{country.name}</span>
                                        </span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {formik.touched.country_id && formik.errors.country_id && (
                            <p className="text-red-500 text-sm">
                                {formik.errors.country_id}
                            </p>
                        )}
                    </Field>

                    {/* Email */}
                    <Field>
                        <Label htmlFor="email">{t("fields.email")}</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder={t("placeholders.email")}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm">{formik.errors.email}</p>
                        )}
                    </Field>

                    {/* DOB */}
                    <Field>
                        <Label htmlFor="date_of_birth">{t("fields.dob")}</Label>
                        <Input
                            id="date_of_birth"
                            name="date_of_birth"
                            type="date"
                            value={formik.values.date_of_birth}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.date_of_birth && formik.errors.date_of_birth && (
                            <p className="text-red-500 text-sm">
                                {formik.errors.date_of_birth}
                            </p>
                        )}
                    </Field>

                    {/* Phone */}
                    <Field>
                        <Label htmlFor="phone">{t("fields.phone")}</Label>
                        <div className="flex  border-primary border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-ring">
                            <Select
                                defaultValue={
                                    countries.find(
                                        (c) =>
                                            c.phone_code === formik.values.phone_code
                                    )?.flag
                                }
                                onValueChange={(value) => {
                                    const country = countries.find(
                                        (c) => c.flag === value
                                    )
                                    formik.setFieldValue(
                                        "phone_code",
                                        country?.phone_code ?? ""
                                    )
                                    formik.setFieldValue(
                                        "country_id",
                                        country?.id.toString() ?? ""
                                    )
                                }}
                            >
                                <SelectContent>
                                    {countries.map((country) => (
                                        <SelectItem
                                            key={country.id}
                                            value={country.flag}
                                        >
                                            <span className="flex items-center gap-2">
                                                <Image
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
                                placeholder={t("placeholders.phone")}
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

                    {/* Gender */}
                    <Field>
                        <Label>{t("fields.gender")}</Label>
                        <Select
                            defaultValue={formik.values.gender}
                            onValueChange={(value) =>
                                formik.setFieldValue("gender", value)
                            }
                        >
                            <SelectTrigger className="border border-primary">
                                <SelectValue placeholder={t("placeholders.gender")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">{t("options.gender.male")}</SelectItem>
                                <SelectItem value="female">{t("options.gender.female")}</SelectItem>
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
                className="rounded-none mx-auto w-fit my-5 md:my-3 py-3 px-4 gap-4 text-lg flex items-center cursor-pointer"
                disabled={formik.isSubmitting}
            >
                {formik.isSubmitting ? t("submitting") : t("submit")}
            </Button>
        </form>
    )
}

