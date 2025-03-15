import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Testimonial from '@/models/Testimonial';

// GET - Get all testimonials or filter by query params
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured');
    const published = searchParams.get('published');
    const limit = parseInt(searchParams.get('limit') || '100');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Build query
    let query: any = {};
    if (featured) query.featured = featured === 'true';
    if (published) query.published = published === 'true';
    else query.published = true; // By default, only return published testimonials

    // Count total matching documents for pagination
    const total = await Testimonial.countDocuments(query);

    // Fetch testimonials with pagination
    const testimonials = await Testimonial.find(query)
      .sort({ order: 1, date: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    return NextResponse.json({
      success: true,
      count: testimonials.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: testimonials,
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// POST - Create a new testimonial
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Parse request body
    const body = await req.json();

    // Create new testimonial
    const testimonial = await Testimonial.create(body);

    return NextResponse.json({
      success: true,
      data: testimonial,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating testimonial:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: validationErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
