import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import BlogPost from '@/models/BlogPost';

// GET - Get a single blog post by slug
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const slug = params.slug;

    // Find the blog post
    const post = await BlogPost.findOne({ slug }).select('-__v');

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await BlogPost.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } }
    );

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT - Update a blog post
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const slug = params.slug;
    const body = await req.json();

    // Find and update the blog post
    const post = await BlogPost.findOneAndUpdate(
      { slug },
      body,
      { new: true, runValidators: true }
    );

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error: any) {
    console.error('Error updating blog post:', error);

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
      { success: false, message: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a blog post
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const slug = params.slug;

    // Find and delete the blog post
    const post = await BlogPost.findOneAndDelete({ slug });

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
