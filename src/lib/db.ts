import mongoose, { Mongoose } from 'mongoose';

// Define an interface for the cached object
interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the global namespace to include our mongoose property
declare global {
  // eslint-disable-next-line no-var
  var mongoose: Cached | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/salman-portfolio';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Initialize cached with proper typing
let cached: Cached = global.mongoose ?? { conn: null, promise: null };

// Assign to global.mongoose if it doesn't exist
if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection error:', error);
      process.exit(1); // Exiting if the connection fails
      throw error; // Add this to satisfy TypeScript's promise typing
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;