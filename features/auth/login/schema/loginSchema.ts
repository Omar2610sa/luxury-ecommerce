import { z } from "zod";

type TFn = (key: string) => string;

export const getLoginSchema = (t: TFn) =>
    z.object({
        identifier: z.email(t("validation.identifier_required")),
        password: z.string().min(7, t("validation.password_required")),
    });

export type LoginFormValues = z.infer<ReturnType<typeof getLoginSchema>>;