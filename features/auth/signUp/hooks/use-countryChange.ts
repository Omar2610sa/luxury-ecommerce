import { apiClientGeneral } from "@/services/useApiClientGeneral"
import { useEffect, useState } from "react"
import { City, Country, StateType } from "../types"
import { FormikProps } from "formik";
import { SignUpFormValues } from "../schema/signUpSchema";

type Props = {
    formik: FormikProps<SignUpFormValues>;
    open?: boolean
};

export function useCountryChange({ formik, open }: Props) {
    const [countries, setCountries] = useState<Country[]>([])
    const [cities, setCities] = useState<City[]>([])
    const [states, setStates] = useState<StateType[]>([])

    useEffect(() => {
        if (!open) return
        apiClientGeneral<{ data?: Country[] }>("countries", { method: "GET" })
            .then(res => setCountries(res?.data ?? []))

    }, [open])
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
    return { handleCountryChange, states, cities, setStates, setCities, countries }
}
