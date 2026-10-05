import { Link } from "@/services/navigation";
import { useTranslations } from "next-intl";
import { PackageSearch } from "lucide-react";
import MainButton from "@/components/Layout/MainButton";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      {/* Animated background circles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary animate-bounce-slow">
            <PackageSearch className="h-12 w-12" />
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {t("title")}
            </h1>
          </div>
        </div>

        <p className="mx-auto max-w-md px-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
          {t("description")}
        </p>

        <div className="flex justify-center gap-4 pt-6">
          <Link href="/">
            <MainButton   text={t("backHome")} />
          </Link>
        </div>
      </div>
    </div>
  );
}
