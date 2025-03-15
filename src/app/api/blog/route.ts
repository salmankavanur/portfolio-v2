import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import BlogPost from '@/models/BlogPost';

// GET - Get all blog posts or filter by query params
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const featured = searchParams.get('featured');
    const published = searchParams.get('published');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Build query
    let query: any = {};
    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] };
    if (featured) query.featured = featured === 'true';
    if (published) query.published = published === 'true';
    else query.published = true; // By default, only return published posts

    // Count total matching documents for pagination
    const total = await BlogPost.countDocuments(query);

    // Fetch blog posts with pagination
    const posts = await BlogPost.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');  // Exclude the version field

    return NextResponse.json({
      success: true,
      count: posts.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: posts,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST - Create a new blog post
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Parse request body
    const body = await req.json();

    // Create new blog post
    const blogPost = await BlogPost.create(body);

    return NextResponse.json({
      success: true,
      data: blogPost,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog post:', error);

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
        { success: false, message: 'Duplicate entry. A blog post with this slug already exists.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
