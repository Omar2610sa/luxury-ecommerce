import { apiClient } from "@/services/useApiClient";
import Cookies from "js-cookie"
import { LoginResponse } from "../../login/types";
import { OtpPayload } from "../types";


export async function otpService({ phone, phoneCode, otp, deviceToken }: OtpPayload) {
    return apiClient<LoginResponse>("verify_Phone", {
        method: "POST",
                body: {
                    phone: phone,
                    phone_code: phoneCode,
                    code: otp,
                    type: "ios",
                    device_token: deviceToken
                },
    })  
}