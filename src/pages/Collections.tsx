import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, SlidersHorizontal } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../constants";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";

export default function Collections({ onAddToCart }: { onAddToCart: (p: Product) => void }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-serif">Our Collections</h1>
            <p className="text-gray-500 font-light max-w-lg italic">
              Carefully curated selections for every occasion. Filter through our premium range of essentials.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between border-y border-gray-100 py-8">
            <div className="flex flex-wrap gap-8 text-[10px] uppercase tracking-[0.3em] font-bold">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`transition-all ${selectedCategory === cat ? "text-accent scale-110" : "text-gray-400 hover:text-primary"}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64 group">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-accent transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="SEARCH COLLECTION"
                className="w-full pl-6 pr-4 py-2 bg-transparent outline-none border-b border-gray-100 focus:border-accent text-[10px] tracking-[0.2em] transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart} 
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-32 text-center">
              <p className="font-serif text-2xl text-gray-400 italic">No pieces found in this category.</p>
              <button 
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="mt-4 text-accent uppercase tracking-widest text-xs font-bold"
              >
                Reset Selection
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
