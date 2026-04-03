import { ProductsResponse, Product } from "@/types/product";

// using DummyJSON as backend for this project.
// It's a great way to simulate a real-world product catalog.

const BASE_URL = "https://dummyjson.com";

export async function getProducts(
  params: {
    limit?: number;
    skip?: number;
    query?: string;
    category?: string;
  } = {}
): Promise<ProductsResponse> {
  const { limit = 20, skip = 0, query, category } = params;

  let url = `${BASE_URL}/products`;

  if (query) {
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`;
  } else if (category && category !== "all") {
    url = `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`;
  } else {
    url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
  }

  const res = await fetch(url, {
    next: { revalidate: 3600 }, // keep this in the cache for an hour to keep things snappy
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product with id: ${id}`);
  }

  return res.json();
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/category-list`, {
    next: { revalidate: 86400 },  // Cache for 24 hours. Categories don't change often, caching them for a full day
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}
