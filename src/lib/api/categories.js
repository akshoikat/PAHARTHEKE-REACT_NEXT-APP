import { apiGet } from "@/lib/api/client";

export async function getCategories() {
  const response = await apiGet("/api/categories", {
    cache: "no-store",
  });

  return response?.data || [];
}