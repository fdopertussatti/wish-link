import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

// Validação de variáveis de ambiente apenas em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  if (!process.env.GOOGLE_CLIENT_ID) throw new Error('GOOGLE_CLIENT_ID is not set');
  if (!process.env.GOOGLE_CLIENT_SECRET) throw new Error('GOOGLE_CLIENT_SECRET is not set');
  if (!process.env.FACEBOOK_CLIENT_ID) throw new Error('FACEBOOK_CLIENT_ID is not set');
  if (!process.env.FACEBOOK_CLIENT_SECRET) throw new Error('FACEBOOK_CLIENT_SECRET is not set');
  if (!process.env.APPLE_CLIENT_ID) throw new Error('APPLE_CLIENT_ID is not set');
  if (!process.env.APPLE_CLIENT_SECRET) throw new Error('APPLE_CLIENT_SECRET is not set');
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID || '',
      clientSecret: process.env.APPLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      try {
        await prisma.userPreferences.create({
          data: {
            userId: user.id,
          },
        });
      } catch (error) {
        console.error('Error creating user preferences:', error);
      }
    },
  },
}; 