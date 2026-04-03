import https from "https";

const agent = new https.Agent({ rejectUnauthorized: false, family: 4 }); // force IPv4

export async function GET() {
  try {
    const { data } = await axios.get("https://pahartheke.com/api/v6/products", {
      httpsAgent: agent,
      timeout: 50000, // increase timeout to 50 seconds
      headers: { "User-Agent": "Mozilla/5.0 (Node.js Axios)" },
    });
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("AXIOS ERROR:", err.message);
    return new Response(JSON.stringify({ data: [] }));
  }
}