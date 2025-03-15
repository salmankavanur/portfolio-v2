import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextAuthConfig } from "next-auth";
import { NextRequest } from "next/server";
import crypto from "crypto";

// Configuration for NextAuth
const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await dbConnect();

          // Find user by email
          const user = await User.findOne({ email: credentials.email.toLowerCase() });

          if (!user) {
            return null;
          }

          // Verify password
          const passwordHash = crypto
            .pbkdf2Sync(credentials.password, user.salt, 1000, 64, 'sha512')
            .toString('hex');

          const isValidPassword = user.passwordHash === passwordHash;

          if (!isValidPassword) {
            return null;
          }

          // Update last login time
          user.lastLogin = new Date();
          await user.save();

          // Return only the data needed by NextAuth
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.avatar || null
          };
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add additional information to the token
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add additional information to the session
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET || "supersecret",
};

// Handler function for API route
async function handler(req: NextRequest, context: { params: { nextauth: string[] } }) {
  return NextAuth(req, context, authConfig);
}

export { handler as GET, handler as POST };
