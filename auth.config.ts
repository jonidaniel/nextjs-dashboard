import type { NextAuthConfig } from "next-auth";

// Configuration options for NextAuth.js
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Used to verify if the request is authorized to access a page
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  // Different login options
  providers: [],
} satisfies NextAuthConfig;
