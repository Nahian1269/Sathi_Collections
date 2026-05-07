import React from "react";
import { motion } from "motion/react";
import { Sparkles, Heart, Crown } from "lucide-react";

export default function OurStory() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24"
    >
      <div className="max-w-4xl mx-auto px-6 space-y-24">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold"
          >
            Since 2026
          </motion.p>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif"
          >
            Our Heritage <br/>
            <span className="italic">& Sacred Craft</span>
          </motion.h1>
        </div>

        {/* Narrative */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1544441893-675973e30605?q=80&w=800&auto=format&fit=crop" 
              alt="Atelier" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-serif">The Beginning of a Dream</h2>
            <p className="text-gray-600 leading-relaxed font-light">
              Founded on the principles of mindfulness and meticulous design, Shathi Fashion Brand was born from a desire to return to the soul of dressmaking. In an era of fast trends, we chose the path of enduring beauty.
            </p>
            <p className="text-gray-600 leading-relaxed font-light">
              Every thread we use is selected for its story—where it was grown, how it was spun, and how it feels against the skin. We believe that what you wear is a reflection of your inner landscape.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-12 py-16 border-y border-gray-100">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto text-accent">
              <Heart size={24} />
            </div>
            <h3 className="font-serif text-xl">Ethical Soul</h3>
            <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest">Fair wages and sustainable sourcing are not choices, they are our foundation.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto text-accent">
              <Sparkles size={24} />
            </div>
            <h3 className="font-serif text-xl">Timeless Design</h3>
            <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest">We create pieces that ignore the calendar and embrace the legacy.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto text-accent">
              <Crown size={24} />
            </div>
            <h3 className="font-serif text-xl">Exquisite Craft</h3>
            <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest">Hand-finished details that whisper of true luxury and patient hands.</p>
          </div>
        </div>

        {/* Final Quote */}
        <div className="text-center py-12">
          <p className="font-serif text-3xl italic text-gray-400">
            "Fashion is temporary. Elegance is the signature of a life well-lived."
          </p>
          <p className="mt-6 text-[10px] uppercase tracking-[0.3em] font-bold">
            — Shathi, Founder
          </p>
        </div>
      </div>
    </motion.div>
  );
}
