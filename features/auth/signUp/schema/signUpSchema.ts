import { z } from "zod";

type TFn = (key: string) => string;

export const getSignUpSchema = (t: TFn) =>
    z.object({
        name: z
            .string()
            .min(1, t("validation.name.required"))
            .min(3, t("validation.name.min")),

        email: z
            .string()
            .min(1, t("validation.email.required"))
            .email(t("validation.email.invalid")),

        phone: z
            .string()
            .min(1, t("validation.phone.required"))
            .regex(/^[0-9]{7,15}$/, t("validation.phone.invalid")),

        country_id: z.string().min(1, t("validation.country.required")),
        state_id: z.string().min(1, t("validation.state.required")),
        city_id: z.string().min(1, t("validation.city.required")),
        gender: z.string().min(1, t("validation.gender.required")),
        date_of_birth: z.string().min(1, t("validation.dob_required")),
        phone_code: z.string().min(1, t("validation.phone_code.required")),
        password: z
            .string()
            .min(1, t("validation.password.required"))
            .min(6, t("validation.password.min")),
    });

export type SignUpFormValues = z.infer<ReturnType<typeof getSignUpSchema>>;