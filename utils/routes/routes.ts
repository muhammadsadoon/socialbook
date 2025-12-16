export const protectedRoutes: string[] = [
    "/",
    "/dashboard",
    "/create-post",
    "/profile",

    // dynamic routes
    "/user/:id",
    "/post/:postId",
    "/post/:postId/comments",

    // testing routes
    "/testing"
];

export const publicRoutes: string[] = [
    "/login",
    "/signup",
    
];