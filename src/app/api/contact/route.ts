import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';

// GET - Get all messages (admin only route)
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const isRead = searchParams.get('isRead');
    const isArchived = searchParams.get('isArchived');
    const isSpam = searchParams.get('isSpam');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Build query
    let query: any = {};
    if (isRead) query.isRead = isRead === 'true';
    if (isArchived) query.isArchived = isArchived === 'true';
    if (isSpam) query.isSpam = isSpam === 'true';

    // Count total matching documents for pagination
    const total = await Message.countDocuments(query);

    // Fetch messages with pagination
    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    return NextResponse.json({
      success: true,
      count: messages.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: messages,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// POST - Submit a contact form
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Parse request body
    const body = await req.json();

    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide name, email, and message',
        },
        { status: 400 }
      );
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Create new message
    const message = await Message.create({
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      subject: body.subject || 'Contact Form Submission',
      message: body.message,
      isRead: false,
      isArchived: false,
      isSpam: false,
    });

    // Here you would typically send an email notification
    // This would require setting up an email service like Sendgrid, Mailgun, etc.
    // For now, we'll just save to the database

    return NextResponse.json({
      success: true,
      message: 'Your message has been received. We will get back to you soon!',
      data: {
        id: message._id,
        timestamp: message.createdAt,
      }
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error submitting contact form:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: validationErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to submit your message. Please try again later.' },
      { status: 500 }
    );
  }
}
