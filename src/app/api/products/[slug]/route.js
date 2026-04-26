import { NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

function removeApiSuffix(url = "") {
  return url.replace(/\/api\/v\d+\/?$/, "");
}

function makeFileUrl(filePath) {
  if (!filePath) return null;
  if (/^https?:\/\//i.test(filePath)) return filePath;

  const base = removeApiSuffix(BACKEND_API_URL || "");
  const cleanPath = String(filePath).replace(/^\/+/, "");

  return `${base}/${cleanPath}`;
}

function toNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isNaN(num) ? fallback : num;
}

function normalizeProduct(product) {
  const image =
    makeFileUrl(
      product?.images ||
        product?.image ||
        product?.thumbnail ||
        product?.featured_image ||
        product?.banner
    ) || "/images/fallback-product.png";

  const currentPrice = toNumber(
    product?.price || product?.sale_price || product?.regular_price,
    0
  );

  const oldPrice = toNumber(product?.old_price || product?.regular_price || 0, 0);

  return {
    id: toNumber(product?.id),
    name: product?.name || "",
    slug: product?.slug || "",
    images: image,
    image,
    price: currentPrice,
    oldPrice: oldPrice > currentPrice ? oldPrice : null,
    weight: product?.weight || product?.unit || "250gm",
    stock: toNumber(product?.stock ?? product?.qty ?? 1, 1),
    description: product?.description || "",
    shortDescription:
      product?.short_description || product?.excerpt || "",
    categoryId: toNumber(product?.category_id || product?.category?.id || 0),
    categoryName: product?.category?.name || "",
  };
}

export async function GET(_, { params }) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Product slug is required." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${BACKEND_API_URL}/products/${encodeURIComponent(slug)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const contentType = response.headers.get("content-type") || "";
    let payload = null;

    if (contentType.includes("application/json")) {
      payload = await response.json();
    } else {
      payload = { message: await response.text() };
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            payload?.message || payload?.error || "Failed to fetch product.",
        },
        { status: response.status }
      );
    }

    const rawProduct =
      payload?.data || payload?.product || payload;

    return NextResponse.json(
      {
        success: true,
        data: normalizeProduct(rawProduct),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Something went wrong while fetching product.",
      },
      { status: 500 }
    );
  }
}