import { CheckAlert } from "@/components/Alert/CheckAlert";
import { ErrorAlert } from "@/components/Alert/ErrorAlert";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function useLogout({title}: {title: string}) {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const result = await CheckAlert({ title: title })
            if (result.isConfirmed) {
                Cookies.remove("token_luxary")
                router.push("/")
                router.refresh()
            }
        } catch {
            ErrorAlert("حدثت مشكلة في الاتصال بالسيرفر")
        }
    }
    return { handleLogout }
}