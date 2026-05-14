// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';

const handler = NextAuth({
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
    error: '/login',   // ← redirect auth errors back to login, not /api/auth/error
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };