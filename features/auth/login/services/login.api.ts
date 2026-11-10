import { apiClient } from "@/services/useApiClient";
import { LoginPayload, LoginResponse } from "../types";
import Cookies from "js-cookie"


export async function loginService(payload: LoginPayload) {
    const getCookie = (name: string) => Cookies.get(name)
    const guestToken = getCookie("guest_token")
    return apiClient<LoginResponse>("login", {
        method: "POST",
        body: {
            credential: payload.identifier, password: payload.password, type: "ios",
            device_token: guestToken,
        }
    })
}