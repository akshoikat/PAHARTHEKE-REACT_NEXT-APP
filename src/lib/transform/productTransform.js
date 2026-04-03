export function transformProduct(apiProduct) {
  let images = ["/placeholder.png"];

  try {
    if (apiProduct.photos) {
      const parsed = typeof apiProduct.photos === "string"
        ? JSON.parse(apiProduct.photos)
        : apiProduct.photos;

      if (Array.isArray(parsed) && parsed.length > 0) {
        images = parsed.map(
          (img) => `https://pahartheke.com/public/${img}`
        );
      }
    }

    // fallback to thumbnail_img with .jpg
    if (images.length === 1 && images[0] === "/placeholder.png" && apiProduct.thumbnail_img) {
      images = [`https://pahartheke.com/public/${apiProduct.thumbnail_img}.jpg`];
    }
  } catch (e) {
    console.error("Image parse error:", e);
    images = ["/placeholder.png"];
  }

  return {
    id: apiProduct.id,
    name: apiProduct.name,
    slug: apiProduct.slug,
    images,
    price: apiProduct.unit_price || 0,
    oldPrice:
      apiProduct.discount > 0
        ? apiProduct.unit_price + apiProduct.discount
        : null,
    stock: apiProduct.current_stock ?? 0,
    rating: Number(apiProduct.rating) || 0,
    weight: apiProduct.unit || "pc",
    featured: apiProduct.featured == 1,
    createdAt: apiProduct.created_at,
  };
}