// export async function GET() {
//   try {
//     const res = await fetch("https://pahartheke.com/api/v6/products");

//     const data = await res.json();

//     return Response.json(data);
//   } catch (error) {
//     console.error("API ERROR:", error);

//     return Response.json(
//       { success: false, data: [] },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     // Optional: fetch from live API
//     const res = await fetch("https://pahartheke.com/api/v6/products", { timeout: 5000 });
//     const data = await res.json();
//     return new Response(JSON.stringify(data));
//   } catch (err) {
//     console.error("API ERROR:", err);

//     // Fallback mock data
//     const mockProducts = [
//       { id: 1, title: "Fresh Fish", price: 150 },
//       { id: 2, title: "Organic Eggs", price: 80 },
//       { id: 3, title: "Mountain Honey", price: 200 },
//     ];

//     return new Response(JSON.stringify({ data: mockProducts }));
//   }
// }

import axios from "axios";
import https from "https";

const agent = new https.Agent({ rejectUnauthorized: false, family: 4 }); // force IPv4

export async function GET() {
  try {
    const { data } = await axios.get("https://pahartheke.com/api/v6/products", {
      httpsAgent: agent,
      timeout: 20000, // 20s timeout
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