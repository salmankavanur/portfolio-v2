import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the PortfolioItem interface
export interface IPortfolioItem extends Document {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  images: string[];
  mainImage: string;
  demoLink?: string;
  codeLink?: string;
  behanceLink?: string;
  featured: boolean;
  completionDate: Date;
  client?: string;
  technologies: string[];
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the PortfolioItem schema
const PortfolioItemSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  images: [String],
  mainImage: { type: String, required: true },
  demoLink: String,
  codeLink: String,
  behanceLink: String,
  featured: { type: Boolean, default: false },
  completionDate: { type: Date, default: Date.now },
  client: String,
  technologies: [String],
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

// Create and export the PortfolioItem model
const PortfolioItem: Model<IPortfolioItem> = mongoose.models.PortfolioItem ||
  mongoose.model<IPortfolioItem>('PortfolioItem', PortfolioItemSchema);

export default PortfolioItem;
