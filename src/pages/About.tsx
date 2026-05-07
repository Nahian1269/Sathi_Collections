import React from "react";
import { motion } from "motion/react";
import { Globe, Users, ShieldCheck, Mail } from "lucide-react";

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24"
    >
      <div className="max-w-6xl mx-auto px-6 space-y-32">
        {/* Brand Mission */}
        <section className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
                <h1 className="text-5xl font-serif leading-tight">A Modern Vision <br/> for <span className="italic">Classic Souls</span></h1>
                <p className="text-lg text-gray-600 font-light leading-relaxed">
                    Shathi Fashion Brand operates at the intersection of high-art and functional luxury. Our mission is to provide a wardrobe that serves as a canvas for self-expression, without compromising on the well-being of our planet.
                </p>
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <h3 className="font-serif text-3xl text-accent">100%</h3>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Natural Fibers</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-serif text-3xl text-accent">12+</h3>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Global Ateliers</p>
                    </div>
                </div>
            </div>
            <div className="relative">
                <div className="aspect-square bg-gray-100 p-8">
                    <img 
                        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop" 
                        alt="Brand Spirit"
                        className="w-full h-full object-cover grayscale brightness-90 shadow-2xl"
                        referrerPolicy="no-referrer"
                    />
                </div>
                <div className="absolute -bottom-10 -left-10 bg-white p-8 shadow-xl hidden md:block max-w-xs">
                    <p className="text-xs uppercase tracking-widest font-bold mb-2">Our Philosophy</p>
                    <p className="text-sm font-light text-gray-500">"We don't just sell clothes; we architect moments of grace."</p>
                </div>
            </div>
        </section>

        {/* Global Values */}
        <section className="grid md:grid-cols-4 gap-12">
            {[
                { icon: Globe, title: "Worldwide", desc: "Curating excellence from every corner of the globe." },
                { icon: Users, title: "Community", desc: "Supporting local artisans and their families." },
                { icon: ShieldCheck, title: "Integrity", desc: "Transparent supply chains you can trust." },
                { icon: Mail, title: "Personal", desc: "Concierge service tailored to your style." }
            ].map((item, i) => (
                <div key={i} className="space-y-4">
                    <item.icon className="text-accent" size={28} />
                    <h3 className="font-serif text-xl">{item.title}</h3>
                    <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </section>

        {/* Contact/Engagement */}
        <section className="bg-primary text-white p-12 md:p-24 text-center space-y-8 rounded-sm">
            <h2 className="text-4xl font-serif">Be Part of our Journey</h2>
            <p className="max-w-xl mx-auto opacity-70 font-light">
                Subscribe to our private list for early access to seasonal lookbooks and exclusive atelier visits.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
                <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL" 
                    className="flex-1 bg-transparent border-b border-white/30 py-4 outline-none focus:border-white transition-colors text-xs tracking-widest"
                />
                <button className="text-xs uppercase tracking-[0.3em] font-bold text-accent">Subscribe</button>
            </div>
        </section>
      </div>
    </motion.div>
  );
}
