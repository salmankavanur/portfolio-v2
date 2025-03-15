/**
 * This script creates an initial admin user in the database.
 * It can be run manually using:
 * bun run src/scripts/seed-admin.ts
 */

import dbConnect from '../lib/db';
import User from '../models/User';
import { createUser } from '../lib/data/users';

// Admin user details
const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'adminpassword123', // In production, use a strong password
  role: 'admin' as const,
};

async function seedAdmin() {
  console.log('Connecting to database...');

  try {
    await dbConnect();
    console.log('Database connected.');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({
      email: adminUser.email
    });

    if (existingAdmin) {
      console.log('Admin user already exists. Skipping creation.');
      process.exit(0);
    }

    // Create admin user
    console.log('Creating admin user...');
    await createUser(adminUser);

    console.log('Admin user created successfully with email:', adminUser.email);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
}

// Run the seed function
seedAdmin();
