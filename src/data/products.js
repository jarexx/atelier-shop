import okenA from "@/assets/p-oken-1.jpg";
import okenB from "@/assets/p-oken-2.jpg";
import arvidA from "@/assets/p-arvid-1.jpg";
import arvidB from "@/assets/p-arvid-2.jpg";
import plinthA from "@/assets/p-plinth-1.jpg";
import plinthB from "@/assets/p-plinth-2.jpg";
import monolithA from "@/assets/p-monolith-1.jpg";
import monolithB from "@/assets/p-monolith-2.jpg";
import hallaA from "@/assets/p-halla-1.jpg";
import hallaB from "@/assets/p-halla-2.jpg";
import toraA from "@/assets/p-tora-1.jpg";
import toraB from "@/assets/p-tora-2.jpg";

export const products = [
  {
    slug: "oken-stool",
    name: "Oken Stool",
    collection: "Collection 01 — Seating",
    category: "Seating",
    material: "Oak",
    price: 320,
    shortDescription: "Solid White Oak",
    description:
      "Designed by our lead craftsman, the Oken stool features traditional wedge-tenon joints that will remain stable for generations. Each piece is hand-finished with a natural wax oil to preserve the breathability of the wood.",
    dimensions: "Ø 32 × H 45 cm",
    finish: "Matte Hard-Wax Oil",
    leadTime: "4–6 Weeks",
    images: [okenA, okenB],
  },
  {
    slug: "arvid-chair",
    name: "Arvid Chair",
    collection: "Collection 01 — Seating",
    category: "Seating",
    material: "Ash",
    price: 840,
    shortDescription: "Curved Ash",
    description:
      "A single sculpted shell of steam-bent ash, the Arvid Chair traces the silhouette of the body. Each chair is shaped over a custom form and finished in our Småland workshop.",
    dimensions: "W 54 × D 56 × H 92 cm",
    finish: "Soap-Treated",
    leadTime: "6–8 Weeks",
    images: [arvidA, arvidB],
  },
  {
    slug: "low-plinth-table",
    name: "Low Plinth Table",
    collection: "Collection 02 — Tables",
    category: "Tables",
    material: "Walnut",
    price: 1200,
    shortDescription: "American Walnut",
    description:
      "A low, generous slab of figured American walnut rests on softly chamfered legs. Quiet enough to disappear, present enough to anchor the room.",
    dimensions: "L 140 × W 70 × H 36 cm",
    finish: "Natural Oil",
    leadTime: "8–10 Weeks",
    images: [plinthA, plinthB],
  },
  {
    slug: "monolith-bench",
    name: "Monolith Bench",
    collection: "Collection 01 — Seating",
    category: "Seating",
    material: "Oak",
    price: 1480,
    shortDescription: "Quarter-sawn Oak",
    description:
      "A single quarter-sawn oak plank, tapered legs, no hardware. The Monolith Bench is an exercise in restraint — every line earned, every joint hand-cut.",
    dimensions: "L 180 × W 36 × H 44 cm",
    finish: "Raw / Unfinished",
    leadTime: "8 Weeks",
    images: [monolithA, monolithB],
  },
  {
    slug: "halla-shelf",
    name: "Halla Shelf",
    collection: "Collection 03 — Storage",
    category: "Storage",
    material: "Oak",
    price: 460,
    shortDescription: "Floating Oak Shelf",
    description:
      "A patient shelf. Mounted with concealed brackets that vanish into the wall, the Halla Shelf carries books, ceramics, and afternoon light in equal measure.",
    dimensions: "L 90 × D 22 × H 4 cm",
    finish: "Matte Hard-Wax Oil",
    leadTime: "3–4 Weeks",
    images: [hallaA, hallaB],
  },
  {
    slug: "tora-desk",
    name: "Tora Desk",
    collection: "Collection 02 — Tables",
    category: "Tables",
    material: "Walnut",
    price: 1980,
    shortDescription: "Architectural Walnut Desk",
    description:
      "A study in proportion and restraint. The Tora Desk pairs a generous walnut surface with angular tapered legs and a single whisper-thin drawer — no hardware, only precision. Designed as a quiet architectural anchor for the workspace.",
    dimensions: "L 130 × W 62 × H 74 cm",
    finish: "Natural Oil",
    leadTime: "10 Weeks",
    images: [toraA, toraB],
  },
];

export const allMaterials = ["Oak", "Ash", "Walnut"];
export const allCategories = ["Seating", "Tables", "Storage"];

export function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}

export function getRelated(slug, limit = 3) {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);

  return products
    .filter((product) => product.slug !== slug)
    .sort((a, b) => {
      const aScore = a.category === current.category ? -1 : 1;
      const bScore = b.category === current.category ? -1 : 1;
      return aScore - bScore;
    })
    .slice(0, limit);
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
