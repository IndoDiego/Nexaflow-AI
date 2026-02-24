import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /images, /fonts, /favicon.ico (static files)
    // - files with extensions (.jpg, .png, .svg, etc.)
    "/((?!api|_next|images|fonts|favicon\\.ico|.*\\..*).*)",
  ],
};
