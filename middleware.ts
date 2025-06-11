import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        //allow related paths
        if (
          pathname.startsWith("/api/auth") ||
          pathname.startsWith("/login") ||
          pathname.startsWith("/register")
        ) {
          return true;
        } 

        // public pages
        if(pathname === "/" || pathname.startsWith("/api/videos")) {
          return true
        }

        return !!token; // Ensure the user is authenticated
      },
    },
  }
);


export const config = {
    matcher: [
      /*
       * Match all request paths except:
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       * - public folder
       */
      "/((?!_next/static|_next/image|favicon.ico|public/).*)",
    ],
  };