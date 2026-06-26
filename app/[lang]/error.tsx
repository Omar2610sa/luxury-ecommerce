'use client';

import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "@/services/navigation";
import { useTranslations } from "next-intl";
import { AlertCircle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const t = useTranslations("serverError");

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="container flex flex-col items-center justify-center min-h-[60vh]  text-center">
            {/* Animated background circles */}
            <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
            </div>

            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="space-y-4 flex flex-col items-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 animate-bounce-slow">
                        <AlertCircle className="w-12 h-12" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                            {t("title")}
                        </h1>
                    </div>
                </div>

                <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto leading-relaxed px-4">
                    {t("description")}
                </p>

                <div className="pt-6 flex gap-4 justify-center">
                    <Button
                        size="lg"
                        onClick={() => reset()}
                        className="h-12 px-8 font-semibold cursor-pointer"
                    >
                        {t("retry")}
                    </Button>
                    <Link href="/">
                        <Button variant="outline" size="lg" className="h-12 px-8 font-semibold border-primary text-primary cursor-pointer">
                            {t("backHome")}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
