import { NextAuthConfig } from 'next-auth';
import { getUserById } from '@/lib/data/users';
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// Extend the next-auth module's types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
  }
}

// Extend the JWT type for next-auth
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}

// Middleware to check if user is authenticated
export const isAuthenticated = async (session: any) => {
  return !!session?.user;
};

// Middleware to check if user is admin
export const isAdmin = async (session: any) => {
  return session?.user?.role === 'admin';
};

// Get the authenticated user with full details from database
export const getAuthenticatedUser = async (session: any) => {
  if (!session?.user?.id) {
    return null;
  }

  try {
    const user = await getUserById(session.user.id);
    return user;
  } catch (error) {
    console.error('Error getting authenticated user:', error);
    return null;
  }
};

// Helper to check if a user can access a specific resource
export const canAccess = (
  session: any,
  requiredRole: 'admin' | 'editor' = 'admin'
) => {
  if (!session?.user) return false;

  if (requiredRole === 'admin') {
    return session.user.role === 'admin';
  }

  return ['admin', 'editor'].includes(session.user.role);
};
