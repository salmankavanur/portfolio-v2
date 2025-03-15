import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { PageView, DailyStats } from '@/models/Analytics';

// GET - Get analytics data
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || 'week';

    // Get date range based on period
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);  // Set to end of day

    const startDate = new Date();
    if (period === 'day') {
      startDate.setHours(0, 0, 0, 0);  // Start of today
    } else if (period === 'week') {
      startDate.setDate(startDate.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
    } else if (period === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setHours(0, 0, 0, 0);
    } else if (period === 'year') {
      startDate.setFullYear(startDate.getFullYear() - 1);
      startDate.setHours(0, 0, 0, 0);
    } else if (period === 'all') {
      // Get all data, no start date filter
      startDate.setFullYear(2020, 0, 1);  // Set to distant past
    }

    // Get total page views for the period
    const totalPageViews = await PageView.countDocuments({
      timestamp: { $gte: startDate, $lte: endDate }
    });

    // Get unique visitors for the period (approximate by unique IPs)
    const uniqueVisitors = await PageView.distinct('ip', {
      timestamp: { $gte: startDate, $lte: endDate }
    }).then(ips => ips.filter(ip => ip !== 'Unknown').length);

    // Get page view stats grouped by day
    const dailyPageViews = await DailyStats.find({
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });

    // Get top pages
    const topPages = await PageView.aggregate([
      { $match: { timestamp: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: '$path', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Get traffic sources (referrers)
    const topReferrers = await PageView.aggregate([
      { $match: {
        timestamp: { $gte: startDate, $lte: endDate },
        referrer: { $ne: '' }
      } },
      { $group: { _id: '$referrer', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Get device info
    const deviceBreakdown = await PageView.aggregate([
      { $match: { timestamp: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: '$device', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get browser info
    const browserBreakdown = await PageView.aggregate([
      { $match: { timestamp: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: '$browser', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 }
    ]);

    // Get country info
    const countryBreakdown = await PageView.aggregate([
      { $match: {
        timestamp: { $gte: startDate, $lte: endDate },
        country: { $ne: 'Unknown' }
      } },
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Format daily page view data for charting
    const formattedDailyData = dailyPageViews.map(day => ({
      date: day.date.toISOString().split('T')[0],
      visits: day.totalVisits,
      uniqueVisitors: day.uniqueVisitors
    }));

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalPageViews,
          uniqueVisitors,
          bounceRate: 0, // This would require more complex tracking
          avgTimeOnPage: 0, // This would require more complex tracking
        },
        dailyData: formattedDailyData,
        topPages: topPages.map(page => ({
          path: page._id,
          views: page.count
        })),
        topReferrers: topReferrers.map(referrer => ({
          source: referrer._id,
          visits: referrer.count
        })),
        deviceBreakdown: deviceBreakdown.map(device => ({
          type: device._id || 'unknown',
          count: device.count
        })),
        browserBreakdown: browserBreakdown.map(browser => ({
          name: browser._id || 'unknown',
          count: browser.count
        })),
        countryBreakdown: countryBreakdown.map(country => ({
          code: country._id,
          count: country.count
        })),
        period,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
