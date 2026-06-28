import Swal from "sweetalert2";
import Cookies from "js-cookie";

export const CheckAlert = ({ title }: { title: string }) => {
    const locale = Cookies.get('NEXT_LOCALE') ?? 'ar'
    const isAr = locale === 'ar'

    return Swal.fire({
        title,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: isAr ? 'نعم' : 'Yes',
        cancelButtonText: isAr ? 'لا' : 'No',
        customClass: {
            popup: 'rounded-2xl shadow-2xl border border-slate-200',
            title: 'text-xl font-black text-slate-800 mb-4',
            confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 mx-2',
            cancelButton: 'bg-white hover:bg-primary/10 text-slate-800 font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 mx-2'
        },
        buttonsStyling: false,
    });
}