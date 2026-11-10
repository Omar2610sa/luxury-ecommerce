import { Profile } from "@/types/type";

export type LoginPayload = {
    identifier: string;
    password: string;
};


export type LoginResponse = {
    status: string;
    message: string;
    data: Profile
}