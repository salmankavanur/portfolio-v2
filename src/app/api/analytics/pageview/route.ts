import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { PageView, DailyStats } from '@/models/Analytics';
import UAParser from 'ua-parser-js';

// POST - Record a page view
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Parse request body
    const body = await req.json();

    // Get path from the request or body
    const path = body.path || '/';

    // Get user agent and parse device info
    const userAgent = req.headers.get('user-agent') || '';
    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser().name || 'Unknown';
    const os = parser.getOS().name || 'Unknown';
    const device = parser.getDevice().type || 'desktop';

    // Get IP address from headers (this would be more accurate with a proper IP detection library)
    // In a production environment, you might use a geolocation service to get country/city
    const ip = req.headers.get('x-forwarded-for') ||
               req.headers.get('x-real-ip') ||
               'Unknown';

    // Get country from headers if using a CDN like Cloudflare
    // In a production environment, you'd use a geolocation service
    const country = req.headers.get('cf-ipcountry') || 'Unknown';

    // Record page view
    const pageView = await PageView.create({
      path,
      referrer: body.referrer || '',
      userAgent,
      ip,
      country,
      device,
      browser,
      os,
      timestamp: new Date(),
    });

    // Update daily stats
    await updateDailyStats({
      path,
      referrer: body.referrer || '',
      country,
      device,
      browser,
      os,
    });

    return NextResponse.json({
      success: true,
      message: 'Page view recorded',
    });
  } catch (error) {
    console.error('Error recording page view:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to record page view' },
      { status: 500 }
    );
  }
}

async function updateDailyStats({
  path,
  referrer,
  country,
  device,
  browser,
  os,
}: {
  path: string;
  referrer: string;
  country: string;
  device: string;
  browser: string;
  os: string;
}) {
  // Get today's date with time set to 00:00:00
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find or create daily stats document
  let dailyStats = await DailyStats.findOne({ date: today });

  if (!dailyStats) {
    dailyStats = await DailyStats.create({
      date: today,
      totalVisits: 0,
      uniqueVisitors: 0,
      pageViews: new Map(),
      referrers: new Map(),
      countries: new Map(),
      devices: new Map(),
      browsers: new Map(),
      operatingSystems: new Map(),
    });
  }

  // Increment total visits
  dailyStats.totalVisits += 1;

  // Update page views
  const currentPageViews = dailyStats.pageViews.get(path) || 0;
  dailyStats.pageViews.set(path, currentPageViews + 1);

  // Update referrers if not empty
  if (referrer) {
    const currentReferrerCount = dailyStats.referrers.get(referrer) || 0;
    dailyStats.referrers.set(referrer, currentReferrerCount + 1);
  }

  // Update countries
  const currentCountryCount = dailyStats.countries.get(country) || 0;
  dailyStats.countries.set(country, currentCountryCount + 1);

  // Update devices
  const currentDeviceCount = dailyStats.devices.get(device) || 0;
  dailyStats.devices.set(device, currentDeviceCount + 1);

  // Update browsers
  const currentBrowserCount = dailyStats.browsers.get(browser) || 0;
  dailyStats.browsers.set(browser, currentBrowserCount + 1);

  // Update operating systems
  const currentOsCount = dailyStats.operatingSystems.get(os) || 0;
  dailyStats.operatingSystems.set(os, currentOsCount + 1);

  // Save the updated document
  await dailyStats.save();
}
