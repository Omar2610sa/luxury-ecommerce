
export type OtpPayload = {
    phone: string;
    phoneCode: string;
    otp: string;
    deviceToken: string;
}

export type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
}