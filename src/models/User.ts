import mongoose, { Schema, Document, Model } from 'mongoose';
import crypto from 'crypto';

// Define the User interface
export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: 'admin' | 'editor';
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  setPassword: (password: string) => void;
  validatePassword: (password: string) => boolean;
}

// Define the User schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  salt: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor'], default: 'editor' },
  avatar: String,
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
}, { timestamps: true });

// Method to set password
UserSchema.methods.setPassword = function(password: string) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

// Method to validate password
UserSchema.methods.validatePassword = function(password: string): boolean {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.passwordHash === hash;
};

// Create and export the User model
const User: Model<IUser> = mongoose.models.User ||
  mongoose.model<IUser>('User', UserSchema);

export default User;
