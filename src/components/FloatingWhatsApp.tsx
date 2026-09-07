import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Phone, ArrowUpRight } from 'lucide-react';

interface FloatingWhatsAppProps {
  onOpenWhatsApp: (message?: string) => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  onOpenWhatsApp,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const quickPrompts = [
    { label: 'Check iPhone 16 Pro Max Stock', msg: 'Hello Apple Guru! Is the iPhone 16 Pro Max currently in stock at your Indra Dev Marga showroom?' },
    { label: 'Trade-In / Phone Exchange Appraisal', msg: 'Hello! I would like to get a trade-in estimate for my current phone.' },
    { label: 'Screen / Repair Consultation', msg: 'Hello Lab! My phone has screen/battery issues. Can I bring it in today?' },
    { label: 'Directions to Showroom', msg: 'Hello Apple Guru! What are your current opening hours and exact directions?' },
  ];

  return (
    <div id="floating-whatsapp-widget" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Quick Menu Popover */}
      {isOpen && (
        <div className="mb-3 w-80 bg-[#121217] border border-white/20 rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom-5 duration-200 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <p className="text-xs font-bold text-white">Apple Guru Chitwan</p>
                <p className="text-[10px] text-emerald-400 font-mono">Typically replies in minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-zinc-300 mt-3 mb-3 leading-relaxed">
            Direct WhatsApp helpline for Indra Dev Marga showroom & precision repair lab.
          </p>

          <div className="space-y-1.5">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsOpen(false);
                  onOpenWhatsApp(p.msg);
                }}
                className="w-full text-left p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/5 text-xs text-zinc-200 hover:text-white transition-all flex items-center justify-between group"
              >
                <span className="truncate">{p.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors shrink-0 ml-2" />
              </button>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span>+977 9821552339</span>
            <a href="tel:9821552339" className="text-white hover:underline flex items-center gap-1">
              <Phone className="w-3 h-3" /> Call Instead
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs text-zinc-300 shadow-lg pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Chat on WhatsApp</span>
          </div>
        )}

        <button
          id="floating-whatsapp-main-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-[0_10px_25px_rgba(16,185,129,0.4)] transition-all transform hover:scale-105 active:scale-95 border border-emerald-300/30"
          aria-label="Open WhatsApp Chat Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-7 h-7 fill-white text-white" />
          )}
        </button>
      </div>
    </div>
  );
};
