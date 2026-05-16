// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: '/login',
    error: '/auth-error',
  },

  // ── Session strategy: JWT is stateless, works across all clients ──
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // ── Cookie config: fixes desktop-mode switching on mobile browsers ──
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',   // 'lax' works for both mobile and desktop modes
        path: '/',
        secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',   // NOT 'strict' — strict breaks desktop-mode switching
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  callbacks: {
    // Persist provider info into the JWT token
    async jwt({ token, account, profile }) {
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },

    // Expose token data to the session object
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).provider = token.provider;
      }
      return session;
    },
  },

  // Required for production — must match NEXTAUTH_SECRET env var
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };