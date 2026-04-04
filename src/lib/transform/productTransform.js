export function transformProduct(apiProduct) {
  let images = ["/placeholder.png"];

  if (apiProduct.thumbnail_image) {
    images = [apiProduct.thumbnail_image];
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