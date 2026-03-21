import { NextRequest, NextResponse } from "next/server";
import {
  getCampaignReport,
  getLandingPageReport,
  getFunnelReport,
  getGeoDeviceReport,
} from "@/lib/ga4";

/**
 * GA4 Analytics API
 *
 * Protected by API key. Returns campaign performance, landing page metrics,
 * conversion funnels, and geographic/device breakdowns.
 *
 * Query Parameters:
 *   type     - "campaign" | "landing" | "funnel" | "geodevice" (required)
 *   campaign - UTM campaign name, e.g. "bpmpro-2026-q1" (required for campaign/funnel/geodevice)
 *   path     - Page path, e.g. "/campaign/bpmpro-demo" (required for landing)
 *   days     - Lookback period in days (default: 28)
 *
 * Headers:
 *   X-API-Key - Must match ANALYTICS_API_KEY env var
 *
 * Examples:
 *   GET /api/analytics?type=campaign&campaign=bpmpro-2026-q1
 *   GET /api/analytics?type=landing&path=/campaign/bpmpro-demo
 *   GET /api/analytics?type=funnel&campaign=bpmpro-2026-q1
 *   GET /api/analytics?type=geodevice&campaign=bpmpro-2026-q1&days=7
 */
export async function GET(request: NextRequest) {
  // Auth check
  const apiKey = request.headers.get("x-api-key");
  const expectedKey = process.env.ANALYTICS_API_KEY;

  if (!expectedKey || apiKey !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const type = params.get("type");
  const campaign = params.get("campaign");
  const path = params.get("path");
  const days = parseInt(params.get("days") || "28") || 28;

  try {
    switch (type) {
      case "campaign": {
        if (!campaign) {
          return NextResponse.json({ error: "campaign parameter is required" }, { status: 400 });
        }
        const data = await getCampaignReport(campaign, days);
        return NextResponse.json(data);
      }

      case "landing": {
        if (!path) {
          return NextResponse.json({ error: "path parameter is required" }, { status: 400 });
        }
        const data = await getLandingPageReport(path, days);
        return NextResponse.json(data);
      }

      case "funnel": {
        if (!campaign) {
          return NextResponse.json({ error: "campaign parameter is required" }, { status: 400 });
        }
        const data = await getFunnelReport(campaign, days);
        return NextResponse.json(data);
      }

      case "geodevice": {
        if (!campaign) {
          return NextResponse.json({ error: "campaign parameter is required" }, { status: 400 });
        }
        const data = await getGeoDeviceReport(campaign, days);
        return NextResponse.json(data);
      }

      default:
        return NextResponse.json(
          { error: "type parameter is required. Valid values: campaign, landing, funnel, geodevice" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
