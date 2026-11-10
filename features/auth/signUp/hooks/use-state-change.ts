import { apiClientGeneral } from "@/services/useApiClientGeneral"
import { City } from "../types"
import { FormikProps } from "formik";
import { SignUpFormValues } from "../schema/signUpSchema";

type Props = {
    formik: any
    setCities: React.Dispatch<React.SetStateAction<City[]>>;
};

export function useStateChange({ formik, setCities }: Props) {
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

    return { handleStateChange }
}