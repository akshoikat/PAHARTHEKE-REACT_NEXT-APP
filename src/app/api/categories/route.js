import { NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

function removeApiSuffix(url = "") {
  return url.replace(/\/api\/v\d+\/?$/, "");
}

function makeFileUrl(filePath) {
  if (!filePath) return null;

  if (/^https?:\/\//i.test(filePath)) {
    return filePath;
  }

  const base = "https://pahartheke.com";
  const cleanPath = String(filePath).replace(/^\/+/, "");

  if (cleanPath.startsWith("uploads/")) {
    return `${base}/${cleanPath}`;
  }

  if (cleanPath.startsWith("all/")) {
    return `${base}/uploads/${cleanPath}`;
  }

  return `${base}/uploads/all/${cleanPath}`;
}

function normalizeCategory(category) {
  const parentId =
    category?.parent_id === null || category?.parent_id === undefined
      ? null
      : Number(category.parent_id);

  const icon = makeFileUrl(category?.icon || category?.banner || category?.image);
  const image = makeFileUrl(category?.banner || category?.icon || category?.image);

  return {
    id: Number(category?.id),
    name: category?.name?.trim() || "",
    slug: category?.slug?.trim() || "",
    icon,
    image,
    parentId,
    level: parentId ? 2 : 1,
  };
}

function extractCategories(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.categories)) return payload.categories;
  if (Array.isArray(payload?.data?.categories)) return payload.data.categories;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
}

export async function GET() {
  try {
    if (!BACKEND_API_URL) {
      return NextResponse.json(
        { success: false, message: "BACKEND_API_URL is not configured." },
        { status: 500 }
      );
    }

    const response = await fetch(`${BACKEND_API_URL}/categories`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

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
            payload?.message ||
            payload?.error ||
            "Failed to fetch categories.",
        },
        { status: response.status }
      );
    }

    const categories = extractCategories(payload)
      .map(normalizeCategory)
      .filter((item) => item.id || item.name);
    return NextResponse.json(
      {
        success: true,
        data: categories,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Something went wrong while fetching categories.",
      },
      { status: 500 }
    );
  }
}