import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the PageView interface
export interface IPageView extends Document {
  path: string;
  referrer?: string;
  userAgent?: string;
  ip?: string;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
  os?: string;
  timestamp: Date;
}

// Define the PageView schema
const PageViewSchema = new Schema({
  path: { type: String, required: true },
  referrer: String,
  userAgent: String,
  ip: String,
  country: String,
  city: String,
  device: String,
  browser: String,
  os: String,
  timestamp: { type: Date, default: Date.now },
});

// Define the daily visit stats interface
export interface IDailyStats extends Document {
  date: Date;
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: Map<string, number>;
  referrers: Map<string, number>;
  countries: Map<string, number>;
  devices: Map<string, number>;
  browsers: Map<string, number>;
  operatingSystems: Map<string, number>;
}

// Define the DailyStats schema
const DailyStatsSchema = new Schema({
  date: { type: Date, required: true, unique: true },
  totalVisits: { type: Number, default: 0 },
  uniqueVisitors: { type: Number, default: 0 },
  pageViews: { type: Map, of: Number, default: new Map() },
  referrers: { type: Map, of: Number, default: new Map() },
  countries: { type: Map, of: Number, default: new Map() },
  devices: { type: Map, of: Number, default: new Map() },
  browsers: { type: Map, of: Number, default: new Map() },
  operatingSystems: { type: Map, of: Number, default: new Map() },
});

// Create and export the models
export const PageView: Model<IPageView> = mongoose.models.PageView ||
  mongoose.model<IPageView>('PageView', PageViewSchema);

export const DailyStats: Model<IDailyStats> = mongoose.models.DailyStats ||
  mongoose.model<IDailyStats>('DailyStats', DailyStatsSchema);
