import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic Silk Shirt",
    price: 120,
    category: "Women",
    image: "https://images.unsplash.com/photo-1548171916-c0ecba8e7f1d?q=80&w=800&auto=format&fit=crop",
    description: "Pure mulberry silk shirt with a refined sheen and tailored fit."
  },
  {
    id: "2",
    name: "Midnight Wool Overcoat",
    price: 350,
    category: "Men",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    description: "Italian wool blend coat designed for timeless elegance."
  },
  {
    id: "3",
    name: "Gold Chrono Timepiece",
    price: 450,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    description: "Hand-assembled watch featuring sapphire glass and premium gold finish."
  },
  {
    id: "4",
    name: "Linen Summer Dress",
    price: 180,
    category: "Women",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop",
    description: "Breathable linen fabric with an ethereal silhouette."
  },
  {
    id: "5",
    name: "Leather Chelsea Boots",
    price: 220,
    category: "Men",
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800&auto=format&fit=crop",
    description: "Full-grain leather boots with ergonomic cushioning."
  },
  {
    id: "6",
    name: "Cashmere Scarf",
    price: 95,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop",
    description: "Ultra-soft Mongolian cashmere for superior warmth."
  }
];

export const CATEGORIES = ["All", "Men", "Women", "Accessories"];
