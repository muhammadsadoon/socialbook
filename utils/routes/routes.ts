export const protectedRoutes: string[] = [
    "/",
    "/dashboard",
    "/create-post",
    "/profile",

    // dynamic routes
    "/user-profile/:id",
    "/post/:postId",
    "/post/:postId/comments",
];

export const publicRoutes: string[] = [
    "/login",
    "/signup",
];