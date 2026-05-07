import React, { useState } from "react";
import { X, CheckCircle2, Loader2, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CustomerDetails, CartItem } from "../types";
import confetti from "canvas-confetti";

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onSuccess: () => void;
}

export default function CheckoutForm({ isOpen, onClose, items, onSuccess }: CheckoutFormProps) {
  const [step, setStep] = useState<"form" | "confirming" | "success">("form");
  const [details, setDetails] = useState<CustomerDetails>({
    name: "",
    address: "",
    postalCode: "",
    phone: ""
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirming");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: details,
          items,
          total
        })
      });

      if (response.ok) {
        setStep("success");
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#c5a059", "#1a1a1a", "#ffffff"]
        });
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      setStep("form");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden"
          >
            {step === "form" && (
              <>
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-xl font-serif font-bold uppercase tracking-[0.2em]">Delivery Details</h2>
                  <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full">
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Full Name</label>
                      <input 
                        required
                        type="text"
                        placeholder="Nahian Dip"
                        className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition-colors text-sm"
                        value={details.name}
                        onChange={(e) => setDetails({ ...details, name: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Delivery Address</label>
                      <input 
                        required
                        type="text"
                        placeholder="House No, Street, City"
                        className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition-colors text-sm"
                        value={details.address}
                        onChange={(e) => setDetails({ ...details, address: e.target.value })}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Postal Code</label>
                        <input 
                          required
                          type="text"
                          placeholder="1234"
                          className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition-colors text-sm"
                          value={details.postalCode}
                          onChange={(e) => setDetails({ ...details, postalCode: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Phone Number</label>
                        <input 
                          required
                          type="tel"
                          placeholder="+880..."
                          className="w-full border-b border-gray-200 py-2 focus:border-accent outline-none transition-colors text-sm"
                          value={details.phone}
                          onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <div className="flex justify-between items-center mb-6 py-4 border-y border-gray-50">
                      <span className="text-xs uppercase tracking-widest text-gray-500">Total Purchase</span>
                      <span className="text-xl font-serif font-bold">${total}</span>
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-primary text-white py-4 rounded-sm uppercase tracking-[0.2em] font-bold text-xs hover:bg-black transition-all transform active:scale-95"
                    >
                      Confirm Purchase
                    </button>
                    <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest">
                      Your details will be sent for confirmation
                    </p>
                  </div>
                </form>
              </>
            )}

            {step === "confirming" && (
              <div className="p-20 text-center space-y-4">
                <Loader2 className="animate-spin mx-auto text-accent" size={48} />
                <h3 className="text-xl font-serif">Processing your order...</h3>
                <p className="text-sm text-gray-400">Securing your elegant selection</p>
              </div>
            )}

            {step === "success" && (
              <div className="p-16 text-center space-y-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-serif uppercase tracking-widest">Purchase Confirmed</h3>
                  <p className="text-gray-500">Thank you for choosing Shathi Fashion Brand.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-sm space-y-3 text-left">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 border-b border-gray-200 pb-2 flex items-center gap-2">
                    <Mail size={12} /> Email Details Sent
                  </p>
                  <div className="text-sm space-y-1">
                    <p><strong>To:</strong> nahindip1269@gmail.com</p>
                    <p><strong>From:</strong> nahian12169@gmail.com</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    onSuccess();
                    onClose();
                  }}
                  className="w-full border border-primary py-4 hover:bg-primary hover:text-white transition-all uppercase tracking-widest text-xs font-bold"
                >
                  Return to Boutique
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
