import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  cartCount: number;
  onCartToggle: () => void;
}

export default function Navbar({ cartCount, onCartToggle }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Our Story", path: "/our-story" },
    { label: "Collections", path: "/collections" },
    { label: "About Us", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Categories - Desktop */}
        <div className="hidden lg:flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-bold">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`hover:text-accent transition-colors ${location.pathname === link.path ? "text-accent" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group">
          <h1 className="text-2xl md:text-3xl tracking-[0.2em] font-serif font-bold uppercase transition-transform group-hover:scale-105">
            SHATHI
          </h1>
          <span className="text-[8px] tracking-[0.5em] uppercase opacity-40 -mt-1 hidden md:block">
            Fashion Brand
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="hidden md:block p-2 hover:text-accent transition-colors">
            <Search size={20} />
          </button>
          <button className="hidden md:block p-2 hover:text-accent transition-colors">
            <User size={20} />
          </button>
          <button 
            className="p-2 relative flex items-center hover:text-accent transition-colors"
            onClick={onCartToggle}
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4 text-center text-[10px] tracking-[0.2em] font-bold uppercase">
              {navLinks.map(link => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)}
                  className={`hover:text-accent transition-colors ${location.pathname === link.path ? "text-accent" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex justify-center gap-6 pt-4 border-t border-gray-50">
                <Search size={20} />
                <User size={20} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
