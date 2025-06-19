import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { GA4Config, getDateRange } from "@/lib/ga4config";

// Initialize the GA4 client
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: GA4Config.credentials.client_email,
    private_key: GA4Config.credentials.private_key?.replace(/\\n/g, "\n"),
  },
});

export async function GET() {
  try {
    if (!GA4Config.propertyId) {
      return NextResponse.json(
        { error: "Google Analytics not configured" },
        { status: 503 }
      );
    }

    const { startDate, endDate } = getDateRange(30); // Last 30 days

    // Run multiple reports in parallel
    const [
      activeUsersResponse,
      pageViewsResponse,
      sessionDurationResponse,
      locationResponse,
      deviceResponse,
      trafficSourceResponse,
    ] = await Promise.all([
      // Active Users
      analyticsDataClient.runReport({
        property: `properties/${GA4Config.propertyId}`,
        dateRanges: [{ startDate, endDate }],
        metrics: [{ name: "activeUsers" }],
      }),

      // Page Views
      analyticsDataClient.runReport({
        property: `properties/${GA4Config.propertyId}`,
        dateRanges: [{ startDate, endDate }],
        metrics: [{ name: "screenPageViews" }],
      }),

      // Average Session Duration
      analyticsDataClient.runReport({
        property: `properties/${GA4Config.propertyId}`,
        dateRanges: [{ startDate, endDate }],
        metrics: [{ name: "averageSessionDuration" }],
      }),

      // Top Locations
      analyticsDataClient.runReport({
        property: `properties/${GA4Config.propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "country" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
        limit: 5,
      }),

      // Device Usage
      analyticsDataClient.runReport({
        property: `properties/${GA4Config.propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "activeUsers" }],
      }),

      // Traffic Sources
      analyticsDataClient.runReport({
        property: `properties/${GA4Config.propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "sessionSource" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 4,
      }),
    ]);

    // Process and format the data
    const analyticsData = {
      activeUsers: activeUsersResponse.rows[0].metricValues[0].value,
      pageViews: pageViewsResponse.rows[0].metricValues[0].value,
      avgSessionDuration: Math.floor(
        sessionDurationResponse.rows[0].metricValues[0].value / 60
      ), // Convert to minutes
      topLocations: locationResponse.rows.map((row) => ({
        name: row.dimensionValues[0].value,
        value: parseInt(row.metricValues[0].value),
      })),
      deviceUsage: deviceResponse.rows.map((row) => ({
        name: row.dimensionValues[0].value,
        value: parseInt(row.metricValues[0].value),
      })),
      trafficSources: trafficSourceResponse.rows.map((row) => ({
        name: row.dimensionValues[0].value,
        value: parseInt(row.metricValues[0].value),
      })),
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
