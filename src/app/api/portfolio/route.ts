import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PortfolioItem from '@/models/PortfolioItem';

// GET - Get all portfolio items or filter by query params
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const featured = searchParams.get('featured');
    const published = searchParams.get('published');
    const limit = parseInt(searchParams.get('limit') || '100');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Build query
    let query: any = {};
    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] };
    if (featured) query.featured = featured === 'true';
    if (published) query.published = published === 'true';
    else query.published = true; // By default, only return published items

    // Count total matching documents for pagination
    const total = await PortfolioItem.countDocuments(query);

    // Fetch portfolio items with pagination
    const items = await PortfolioItem.find(query)
      .sort({ order: 1, completionDate: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    return NextResponse.json({
      success: true,
      count: items.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: items,
    });
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch portfolio items' },
      { status: 500 }
    );
  }
}

// POST - Create a new portfolio item
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Parse request body
    const body = await req.json();

    // Create new portfolio item
    const portfolioItem = await PortfolioItem.create(body);

    return NextResponse.json({
      success: true,
      data: portfolioItem,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating portfolio item:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: validationErrors },
        { status: 400 }
      );
    }

    // Handle duplicate key error (e.g., duplicate slug)
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'Duplicate entry. A portfolio item with this slug already exists.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to create portfolio item' },
      { status: 500 }
    );
  }
}
