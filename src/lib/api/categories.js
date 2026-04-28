import { apiGet } from "@/lib/api/client";

export async function getCategories() {
  const response = await apiGet("/categories", {
    cache: "no-store",
  });

  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.categories)) return response.categories;
  if (Array.isArray(response?.data?.categories)) return response.data.categories;

  return [];
}