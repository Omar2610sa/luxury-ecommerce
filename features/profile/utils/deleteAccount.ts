import { CheckAlert } from "@/components/Alert/CheckAlert";
import { ErrorAlert } from "@/components/Alert/ErrorAlert";
import { SuccessAlert } from "@/components/Alert/SuccessAlert";
import { apiClient } from "@/services/useApiClient";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function useDeleteAccount({ title }: { title: string }) {
    const router = useRouter();

    const handleDeleteAccount = async () => {
        try {
            const result = await CheckAlert({ title: title })
            if (result.isConfirmed) {
                const response = await apiClient<{ status?: string; message?: string }>("delete_account", {
                    method: "DELETE",
                })
                if (response?.status === "success") {
                    SuccessAlert("تم حذف الحساب بنجاح")
                    Cookies.remove("token_luxary")
                    router.push("/")
                    router.refresh()
                } else {
                    ErrorAlert(response?.message ?? "حدثت مشكلة")
                }
            }
        } catch {
            ErrorAlert("حدثت مشكلة في الاتصال بالسيرفر")
        }
    }
    return { handleDeleteAccount }
}