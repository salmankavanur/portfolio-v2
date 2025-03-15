import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the Testimonial interface
export interface ITestimonial extends Document {
  name: string;
  role: string;
  company?: string;
  location: string;
  avatar?: string;
  text: string;
  rating: number;
  featured: boolean;
  date: Date;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Testimonial schema
const TestimonialSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: String,
  location: { type: String, required: true },
  avatar: String,
  text: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  featured: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

// Create and export the Testimonial model
const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
