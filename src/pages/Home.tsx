import React from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
import { PRODUCTS } from "../constants";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";
import { useNavigate } from "react-router-dom";

export default function Home({ onAddToCart }: { onAddToCart: (p: Product) => void }) {
  const navigate = useNavigate();
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-white">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-2xl space-y-6"
          >
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] font-medium text-accent">
              <Sparkles size={16} />
              Spring Summer 2026
            </div>
            <h2 className="text-6xl md:text-8xl font-serif tracking-tight leading-[0.9]">
              Essence of <br />
              <span className="italic">Timeless Elegance</span>
            </h2>
            <p className="text-lg opacity-80 max-w-md font-light leading-relaxed">
              Curated garments designed to define the modern aesthetic while honoring traditional craftsmanship.
            </p>
            <button 
              onClick={() => navigate("/collections")}
              className="bg-white text-primary px-10 py-4 rounded-sm flex items-center gap-3 uppercase tracking-widest text-xs font-bold hover:bg-accent hover:text-white transition-all transform hover:-translate-y-1"
            >
              Explore Collection
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <h3 className="text-4xl font-serif">Featured Pieces</h3>
            <p className="text-gray-400 text-sm uppercase tracking-widest tracking-[0.2em]">Our Atelier's Latest Creations</p>
          </div>
          <button 
            onClick={() => navigate("/collections")}
            className="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2 hover:gap-4 transition-all"
          >
            View All <ArrowRight size={14} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* Philosophy Teaser */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Our Philosophy</h4>
            <h3 className="text-4xl md:text-5xl font-serif italic italic leading-tight text-primary">"True luxury resides in the quiet confidence of quality and the stories hidden in the weave."</h3>
            <div className="pt-6">
                <button 
                    onClick={() => navigate("/our-story")}
                    className="text-xs uppercase tracking-[0.2em] font-bold border-b border-primary pb-2 hover:text-accent hover:border-accent transition-all"
                >
                    Discover our Story
                </button>
            </div>
        </div>
      </section>
    </motion.div>
  );
}
