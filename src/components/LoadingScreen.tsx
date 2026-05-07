import { motion } from "motion/react";

export default function LoadingScreen() {
  return (
    <motion.div 
      key="loading"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           className="text-center"
        >
          <h1 className="text-4xl md:text-6xl tracking-[0.4em] font-serif font-bold uppercase text-primary">
            SHATHI
          </h1>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="h-[1px] w-8 bg-accent/30" />
            <span className="text-[10px] tracking-[0.6em] uppercase text-accent font-medium">Boutique</span>
            <div className="h-[1px] w-8 bg-accent/30" />
          </div>
        </motion.div>
        
        {/* Elegant Loading Bar */}
        <div className="w-48 h-[2px] bg-gray-100 mt-12 overflow-hidden relative">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-1/2 bg-accent"
          />
        </div>
      </div>
    </motion.div>
  );
}
