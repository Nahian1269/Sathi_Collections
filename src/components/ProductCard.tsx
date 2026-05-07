import { Product } from "../types";
import { Plus } from "lucide-react";
import { motion } from "motion/react";

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onAddToCart: (p: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        {/* Quick Add Button */}
        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 right-4 bg-white text-primary p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">
              {product.category}
            </p>
            <h3 className="text-lg font-serif tracking-tight mt-1">
              {product.name}
            </h3>
          </div>
          <p className="text-lg font-serif">
            ${product.price}
          </p>
        </div>
        <p className="text-xs text-gray-500 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {product.description}
        </p>
      </div>
    </motion.div>
  );
}
