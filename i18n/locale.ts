import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "../i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export const localeMiddleware = async (request: NextRequest) => {
  try {
    const pathname = request.nextUrl.pathname;
    // 1. Manual Arabic redirect pattern
    if (pathname.startsWith(`/ar`)) {
      const segments = pathname.split("/").filter(Boolean);
      const [, ...rest] = segments;
      const cleanedPath = "/" + rest.join("/");
      const url = new URL(cleanedPath, request.url);
      return NextResponse.redirect(url);
    }

    // 2. Invoke i18n middleware
    const response = await handleI18nRouting(request);

    // 3. Set custom headers (formerly in redirectMiddleware)
    response.headers.set("x-current-path", pathname);

    // 4. Custom Cookie Logic
    const isEnglish = pathname.startsWith("/en/") || pathname === "/en";
    const localeLang = isEnglish ? "en" : "ar";

    // Set Locale Cookie only if it differs
    if (request.cookies.get("NEXT_LOCALE")?.value !== localeLang) {
      response.cookies.set("NEXT_LOCALE", localeLang, { path: '/' });
    }

    return response;
  } catch (error) {
    console.error("localeMiddleware error:", error);
    return NextResponse.next();
  }
};

export default localeMiddleware;