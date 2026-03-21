import { BetaAnalyticsDataClient } from "@google-analytics/data";

// Lazy-init GA4 client (same pattern as InvoiceTicket)
let ga4Client: BetaAnalyticsDataClient | null = null;

function getGA4Client(): BetaAnalyticsDataClient {
  if (!ga4Client) {
    const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!credentialsJson) {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set");
    }
    const credentials = JSON.parse(credentialsJson);
    ga4Client = new BetaAnalyticsDataClient({ credentials });
  }
  return ga4Client;
}

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID || "";

// --- In-memory cache (15-minute TTL) ---

interface CacheEntry {
  data: unknown;
  expiry: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 15 * 60 * 1000;

function getCached(key: string): unknown | null {
  const entry = cache.get(key);
  if (entry && Date.now() < entry.expiry) return entry.data;
  cache.delete(key);
  return null;
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, expiry: Date.now() + CACHE_TTL_MS });
}

// --- GA4 Query Runner ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function runGA4Report(request: Record<string, unknown>): Promise<any> {
  try {
    const client = getGA4Client();
    const property = `properties/${GA4_PROPERTY_ID}`;
    const [response] = await client.runReport({ property, ...request });
    return response;
  } catch (err: unknown) {
    const error = err as Error;
    console.error("GA4 report error:", error.message);
    return null;
  }
}

// --- Response Parsers ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseSimpleRows(response: any, dimNames: string[], metricNames: string[]) {
  if (!response || !response.rows) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return response.rows.map((row: any) => {
    const obj: Record<string, string | number> = {};
    dimNames.forEach((name, i) => {
      obj[name] = row.dimensionValues[i].value;
    });
    metricNames.forEach((name, i) => {
      obj[name] = parseInt(row.metricValues[i].value) || 0;
    });
    return obj;
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseAggregateRow(response: any, metricNames: string[]) {
  if (!response || !response.rows || response.rows.length === 0) {
    const empty: Record<string, number> = {};
    metricNames.forEach((name) => (empty[name] = 0));
    return empty;
  }
  const row = response.rows[0];
  const obj: Record<string, number> = {};
  metricNames.forEach((name, i) => {
    obj[name] = parseInt(row.metricValues[i].value) || 0;
  });
  return obj;
}

// --- Public Report Functions ---

/**
 * Campaign traffic report — filters by UTM campaign name.
 * Returns aggregate metrics + daily breakdown.
 */
export async function getCampaignReport(campaign: string, days: number = 28) {
  const cacheKey = `campaign:${campaign}:${days}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const startDate = `${days}daysAgo`;
  const endDate = "today";
  const campaignFilter = {
    filter: { fieldName: "sessionCampaignName", stringFilter: { value: campaign } },
  };

  const [aggregateResult, dailyResult, contentResult] = await Promise.all([
    // Aggregate totals
    runGA4Report({
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: "sessions" },
        { name: "activeUsers" },
        { name: "newUsers" },
        { name: "screenPageViews" },
        { name: "averageSessionDuration" },
        { name: "bounceRate" },
      ],
      dimensionFilter: campaignFilter,
    }),

    // Daily breakdown
    runGA4Report({
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "date" }],
      metrics: [
        { name: "sessions" },
        { name: "activeUsers" },
        { name: "screenPageViews" },
      ],
      dimensionFilter: campaignFilter,
      orderBys: [{ dimension: { dimensionName: "date" }, desc: false }],
    }),

    // UTM content breakdown (which links were clicked)
    runGA4Report({
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "sessionManualAdContent" }],
      metrics: [
        { name: "sessions" },
        { name: "activeUsers" },
      ],
      dimensionFilter: campaignFilter,
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    }),
  ]);

  const result = {
    campaign,
    days,
    aggregate: parseAggregateRow(aggregateResult, [
      "sessions", "activeUsers", "newUsers", "pageViews",
      "avgSessionDuration", "bounceRate",
    ]),
    daily: parseSimpleRows(dailyResult, ["date"], ["sessions", "activeUsers", "pageViews"]),
    content: parseSimpleRows(contentResult, ["utmContent"], ["sessions", "users"]),
  };

  setCache(cacheKey, result);
  return result;
}

/**
 * Landing page performance — metrics for a specific page path.
 */
export async function getLandingPageReport(pagePath: string, days: number = 28) {
  const cacheKey = `landing:${pagePath}:${days}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const startDate = `${days}daysAgo`;
  const endDate = "today";
  const pageFilter = {
    filter: { fieldName: "pagePath", stringFilter: { matchType: "CONTAINS", value: pagePath } },
  };

  const [aggregateResult, dailyResult] = await Promise.all([
    runGA4Report({
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: "screenPageViews" },
        { name: "activeUsers" },
        { name: "averageSessionDuration" },
        { name: "bounceRate" },
      ],
      dimensionFilter: pageFilter,
    }),

    runGA4Report({
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "date" }],
      metrics: [
        { name: "screenPageViews" },
        { name: "activeUsers" },
      ],
      dimensionFilter: pageFilter,
      orderBys: [{ dimension: { dimensionName: "date" }, desc: false }],
    }),
  ]);

  const result = {
    pagePath,
    days,
    aggregate: parseAggregateRow(aggregateResult, [
      "pageViews", "activeUsers", "avgSessionDuration", "bounceRate",
    ]),
    daily: parseSimpleRows(dailyResult, ["date"], ["pageViews", "users"]),
  };

  setCache(cacheKey, result);
  return result;
}

/**
 * Conversion funnel — campaign visitors who reached target pages.
 */
export async function getFunnelReport(campaign: string, days: number = 28) {
  const cacheKey = `funnel:${campaign}:${days}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const startDate = `${days}daysAgo`;
  const endDate = "today";

  const result_data = await runGA4Report({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "pagePath" }],
    metrics: [
      { name: "screenPageViews" },
      { name: "activeUsers" },
    ],
    dimensionFilter: {
      andGroup: {
        expressions: [
          { filter: { fieldName: "sessionCampaignName", stringFilter: { value: campaign } } },
          {
            orGroup: {
              expressions: [
                { filter: { fieldName: "pagePath", stringFilter: { matchType: "CONTAINS", value: "/campaign/" } } },
                { filter: { fieldName: "pagePath", stringFilter: { matchType: "CONTAINS", value: "/book-a-demo" } } },
                { filter: { fieldName: "pagePath", stringFilter: { matchType: "CONTAINS", value: "/savings" } } },
                { filter: { fieldName: "pagePath", stringFilter: { matchType: "CONTAINS", value: "/contact" } } },
              ],
            },
          },
        ],
      },
    },
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
  });

  const result = {
    campaign,
    days,
    pages: parseSimpleRows(result_data, ["pagePath"], ["pageViews", "users"]),
  };

  setCache(cacheKey, result);
  return result;
}

/**
 * Geographic and device breakdown for a campaign.
 */
export async function getGeoDeviceReport(campaign: string, days: number = 28) {
  const cacheKey = `geodevice:${campaign}:${days}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const startDate = `${days}daysAgo`;
  const endDate = "today";
  const campaignFilter = {
    filter: { fieldName: "sessionCampaignName", stringFilter: { value: campaign } },
  };

  const [geoResult, deviceResult] = await Promise.all([
    runGA4Report({
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "country" }, { name: "city" }],
      metrics: [{ name: "activeUsers" }, { name: "sessions" }],
      dimensionFilter: campaignFilter,
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 30,
    }),

    runGA4Report({
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "activeUsers" }, { name: "sessions" }],
      dimensionFilter: campaignFilter,
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
    }),
  ]);

  const result = {
    campaign,
    days,
    geography: parseSimpleRows(geoResult, ["country", "city"], ["users", "sessions"]),
    devices: parseSimpleRows(deviceResult, ["device"], ["users", "sessions"]),
  };

  setCache(cacheKey, result);
  return result;
}
