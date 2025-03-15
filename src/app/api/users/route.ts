import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { createUser, getAllUsers } from '@/lib/data/users';
import { getServerSession } from 'next-auth';
import { canAccess } from '@/lib/auth';

// GET - Get all users (admin only)
export async function GET(req: NextRequest) {
  try {
    // Check authentication and authorization
    const session = await getServerSession();
    if (!canAccess(session, 'admin')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 403 }
      );
    }

    await dbConnect();

    // Get users
    const users = await getAllUsers();

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST - Create a new user (admin only)
export async function POST(req: NextRequest) {
  try {
    // Check authentication and authorization
    const session = await getServerSession();
    if (!canAccess(session, 'admin')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 403 }
      );
    }

    await dbConnect();

    // Parse request body
    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Create new user
    const user = await createUser({
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role || 'editor',
      avatar: body.avatar,
    });

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: user,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating user:', error);

    // Handle specific errors
    if (error.message === 'User with this email already exists') {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to create user' },
      { status: 500 }
    );
  }
}
