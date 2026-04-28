export async function getCategories() {
  try {
    const res = await fetch("/api/categories", {
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Failed to load categories.");
    }

    return Array.isArray(result?.data) ? result.data : [];
  } catch (error) {
    console.error("Failed to load categories:", error);
    throw error;
  }
}