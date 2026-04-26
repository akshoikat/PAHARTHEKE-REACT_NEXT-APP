import https from "https";
import axios from "axios";

// Simple in-memory cache
let cache = null; // { data, timestamp }
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const agent = new https.Agent({ rejectUnauthorized: false, family: 4 });

export async function GET() {
  try {
    const now = Date.now();

    // Return cached response if valid
    if (cache && now - cache.timestamp < CACHE_TTL) {
      return new Response(JSON.stringify(cache.data), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch fresh data
    const { data } = await axios.get("https://pahartheke.com/api/v6/products", {
      httpsAgent: agent,
      timeout: 30000, // 30 sec
      headers: { "User-Agent": "Mozilla/5.0 (Node.js Axios)" },
    });

    // Optional: validate / normalize here
    const validatedData = Array.isArray(data?.data)
      ? data.data.filter((p) => p && p.id && p.name)
      : [];

    const response = { data: validatedData };

    // Update cache
    cache = {
      data: response,
      timestamp: now,
    };

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("AXIOS ERROR:", err.message || err);
    return new Response(JSON.stringify({ data: [] }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}