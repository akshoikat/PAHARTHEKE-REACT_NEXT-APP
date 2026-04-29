export async function getCategories() {
  const res = await fetch("/api/categories", {
    cache: "no-store",
  });

  const result = await res.json();

  console.log("CATEGORY RESULT:", result);

  return Array.isArray(result?.data) ? result.data : [];
}