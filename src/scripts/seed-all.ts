/**
 * This script runs all seeding operations in sequence:
 * 1. Seed admin user
 * 2. Seed sample data
 *
 * Run with: bun run src/scripts/seed-all.ts
 */

import { execSync } from 'child_process';

console.log('🌱 Running database seeding operations...');

try {
  // Seed admin user
  console.log('\n📊 Seeding admin user...');
  execSync('bun run src/scripts/seed-admin.ts', { stdio: 'inherit' });

  // Seed sample data
  console.log('\n📊 Seeding sample data...');
  execSync('bun run src/scripts/seed-data.ts', { stdio: 'inherit' });

  console.log('\n✅ All seeding operations completed successfully');
} catch (error) {
  console.error('\n❌ Error during seeding:', error);
  process.exit(1);
}
