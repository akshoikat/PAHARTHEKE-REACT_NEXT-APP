import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


// filter latest products


export function getLatestProducts(products, limit = 10) {
  return products
    .filter(product => product.featured === 1)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // correct field name
    .slice(0, limit);
}