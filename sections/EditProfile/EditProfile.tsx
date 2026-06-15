"use client"
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import SecondButton from "@/components/Layout/SecondButton";
import { EditIcon } from "lucide-react";
import ProfileForm from "@/sections/ProfileForm/ProfileForm";
import { useAuthStore } from "@/store/useAuthStore";

export default function EditProfile() {
    const user = useAuthStore((state) => state.user)

    return (
        <Card className="container bg-[rgba(246,247,252,1)] rounded-lg">
            <CardContent className="p-0 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">تعديل معلوماتك</h3>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
                    <div className="flex flex-col md:flex-row items-center gap-3">
                        <Image
                            src={user?.image}
                            width={120}
                            height={120}
                            alt="User Profile"
                            className="size-32 rounded-full object-cover"
                        />
                        <div className="flex flex-col gap-2 text-center">
                            <p className="text-xl font-medium">{user?.name}</p>
                            <p className="text-lg text-gray-500">+{user?.phone_code}{user?.phone}</p>
                        </div>
                    </div>
                    <SecondButton text="تغيير كلمة السر" icon={EditIcon} />
                </div>
                {/* Form */}
                <ProfileForm profile={user}  />
            </CardContent>
        </Card>
    )
}
