import { NextRequest, NextResponse } from "next/server";
import { publicRoutes, protectedRoutes } from "./utils/routes/routes";
const middlewareResponse = async (req: NextRequest) => {
    const isToken = req?.cookies?.get("token")?.value;
    console.log(isToken)
    // check pathname 
    const { pathname } = req?.nextUrl;
    console.log(pathname)
    const isPrivateRoutes = protectedRoutes.includes(pathname);
    const isPublicRoutes = !isPrivateRoutes;
    console.log("Private routes: ", isPrivateRoutes);

    if (!isToken && isPrivateRoutes) {
        console.log("redirecting to login page");
        return NextResponse.redirect(new URL("/login", req.url));
    };
    if (isToken && isPublicRoutes) {
        console.log("redirecting to main home page");
        return NextResponse.redirect(new URL("/", req.url));
    };
    // sif (!(isPrivateRoutes && !isPublicRoutes) || !(!isPrivateRoutes && isPublicRoutes)) return NextResponse.redirect(new URL("/not-found", req.url));
    return NextResponse.next();
}

export default middlewareResponse;

export const config = {
    matcher: [
        "/((?!_next|favicon.ico|api|.well-known).*)"
    ]
};