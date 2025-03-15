import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { mkdir, existsSync } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getToken } from 'next-auth/jwt';

// Define allowed file types
const allowedFileTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
];

// Define maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Define upload directory
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Create the upload directory if it doesn't exist
if (!existsSync(UPLOAD_DIR)) {
  mkdir(UPLOAD_DIR, { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating upload directory:', err);
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    // Check if user is authenticated
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Handle multipart form data
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    // Check if the file type is allowed
    if (!allowedFileTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid file type. Allowed types: JPEG, PNG, GIF, WebP, SVG'
        },
        { status: 400 }
      );
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: 'File is too large. Maximum size is 5MB'
        },
        { status: 400 }
      );
    }

    // Generate a unique filename
    const fileExtension = file.name.split('.').pop();
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, uniqueFilename);

    // Convert the file to ArrayBuffer and save it
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filePath, buffer);

    // Generate the URL path to the uploaded file
    const fileUrl = `/uploads/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        url: fileUrl,
        filename: uniqueFilename,
        originalFilename: file.name,
        type: file.type,
        size: file.size,
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
