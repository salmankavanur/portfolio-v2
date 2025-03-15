import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the Message interface
export interface IMessage extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  isSpam: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Message schema
const MessageSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: String,
  subject: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  isSpam: { type: Boolean, default: false },
}, { timestamps: true });

// Create and export the Message model
const Message: Model<IMessage> = mongoose.models.Message ||
  mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
