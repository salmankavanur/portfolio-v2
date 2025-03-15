import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PortfolioItem from '@/models/PortfolioItem';

// GET - Get a single portfolio item by slug
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const slug = params.slug;

    // Find the portfolio item
    const item = await PortfolioItem.findOne({ slug }).select('-__v');

    if (!item) {
      return NextResponse.json(
        { success: false, message: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch portfolio item' },
      { status: 500 }
    );
  }
}

// PUT - Update a portfolio item
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const slug = params.slug;
    const body = await req.json();

    // Find and update the portfolio item
    const item = await PortfolioItem.findOneAndUpdate(
      { slug },
      body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return NextResponse.json(
        { success: false, message: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch (error: any) {
    console.error('Error updating portfolio item:', error);

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
      { success: false, message: 'Failed to update portfolio item' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a portfolio item
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const slug = params.slug;

    // Find and delete the portfolio item
    const item = await PortfolioItem.findOneAndDelete({ slug });

    if (!item) {
      return NextResponse.json(
        { success: false, message: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Portfolio item deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete portfolio item' },
      { status: 500 }
    );
  }
}
