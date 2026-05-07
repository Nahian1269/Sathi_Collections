import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import About from "./pages/About";
import OurStory from "./pages/OurStory";
import Collections from "./pages/Collections";
import { Product, CartItem } from "./types";
import { AnimatePresence } from "motion/react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => 
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen key="loader" />}
        </AnimatePresence>

        <Navbar 
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
          onCartToggle={() => setIsCartOpen(!isCartOpen)} 
        />

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/collections" element={<Collections onAddToCart={addToCart} />} />
          </Routes>
        </AnimatePresence>

        {/* Footer */}
        <footer className="bg-primary text-white py-24 px-6 mt-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-20">
            <div className="space-y-6">
              <h4 className="text-2xl tracking-[0.2em] font-serif uppercase">SHATHI</h4>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                Crafting stories through fabric since 2026. A commitment to quality and ethical fashion.
              </p>
            </div>
            <div className="space-y-4">
              <h5 className="uppercase text-[10px] tracking-[0.2em] opacity-40">Client Care</h5>
              <ul className="text-sm space-y-2 font-light">
                <li><a href="#" className="hover:text-accent transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Sizing Guide</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Gift Cards</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="uppercase text-[10px] tracking-[0.2em] opacity-40">Legal</h5>
              <ul className="text-sm space-y-2 font-light">
                <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="uppercase text-[10px] tracking-[0.2em] opacity-40">Newsletter</h5>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="flex-1 bg-transparent border-b border-white/20 py-2 outline-none focus:border-white text-[10px] tracking-widest transition-colors"
                  autoComplete="off"
                />
                <button className="text-white">JOIN</button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-gray-500 font-medium">
            <p>© 2026 Shathi Fashion Brand. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#">Instagram</a>
              <a href="#">Pinterest</a>
              <a href="#">Vogue</a>
            </div>
          </div>
        </footer>

        {/* Overlays */}
        <Cart 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemove={removeItem}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />

        <CheckoutForm 
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cartItems}
          onSuccess={() => setCartItems([])}
        />
      </div>
    </Router>
  );
}
