import Image from "next/image";
import logo from '@/assets/logo.svg'
export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="animate-pulse">
                <Image
                    src={logo.src}
                    alt="Logo"
                    width={150}
                    height={100}
                    priority
                    className="drop-shadow-2xl"
                />
            </div>
        </div>
    );
}
