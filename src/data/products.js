import { getCollection } from "astro:content";

function slugFromEntry(entry) {
  return entry.slug ?? entry.id.replace(/\.(md|mdx)$/, "");
}

function descriptionFromEntry(entry) {
  return entry.body.trim().replace(/\s+/g, " ");
}

function byOrderThenName(a, b) {
  return a.order - b.order || a.name.localeCompare(b.name);
}

export async function getProducts() {
  const entries = await getCollection("products");

  return entries
    .map((entry) => ({
      slug: slugFromEntry(entry),
      description: descriptionFromEntry(entry),
      ...entry.data,
    }))
    .sort(byOrderThenName);
}

export async function getProduct(slug) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}

export function getRelated(products, slug, limit = 3) {
  const current = products.find((product) => product.slug === slug);
  if (!current) return products.slice(0, limit);

  return products
    .filter((product) => product.slug !== slug)
    .sort((a, b) => {
      const aScore = a.category === current.category ? -1 : 1;
      const bScore = b.category === current.category ? -1 : 1;
      return aScore - bScore || byOrderThenName(a, b);
    })
    .slice(0, limit);
}

export function getProductFilters(products) {
  return {
    categories: [...new Set(products.map((product) => product.category))],
    materials: [...new Set(products.map((product) => product.material))],
  };
}

export function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function productForJson(product) {
  return {
    slug: product.slug,
    name: product.name,
    collection: product.collection,
    category: product.category,
    material: product.material,
    price: product.price,
    shortDescription: product.shortDescription,
    description: product.description,
    dimensions: product.dimensions,
    finish: product.finish,
    leadTime: product.leadTime,
  };
}
