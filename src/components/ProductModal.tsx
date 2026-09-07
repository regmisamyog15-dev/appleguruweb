import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { priceDisclaimer } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenWhatsApp: (message?: string) => void;
  onVisitShowroom: () => void;
  onStartExchange: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onOpenWhatsApp,
  onVisitShowroom,
  onStartExchange,
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  if (!product) return null;

  const handleWhatsAppInquiry = () => {
    const text = `Hello Apple Guru! I am inquiring about the ${product.brand} ${product.name} (Price guide: ${product.priceRange}) currently shown at your Chitwan showroom. Please confirm stock and current offer.`;
    onOpenWhatsApp(text);
  };

  return (
    <div
      id="product-detail-modal-overlay"
      className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="product-detail-modal-card"
        className="w-full max-w-4xl bg-[#0a0a0d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-auto text-left relative flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-sm bg-black/60 hover:bg-black/80 text-zinc-400 hover:text-white border border-white/10 transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Dominated by Large Editorial Product Visual */}
        <div className="w-full md:w-1/2 bg-zinc-950 p-6 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
          <div className="absolute inset-0 bg-radial-gradient from-white/[0.06] to-transparent pointer-events-none" />
          
          {product.editorialHighlight && (
            <div className="absolute top-6 left-6 z-10">
              <span className="text-[9px] uppercase font-mono tracking-widest px-3 py-1 bg-black/80 text-[#D4AF37] border border-[#D4AF37]/30">
                {product.editorialHighlight}
              </span>
            </div>
          )}

          <div className="w-full max-w-[320px] aspect-[4/5] relative flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Color variant dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-6 flex items-center gap-2.5">
              <span className="text-xs text-zinc-500 font-mono">Color:</span>
              <div className="flex items-center gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColorIndex(i)}
                    title={c.name}
                    className={`w-4 h-4 rounded-full border transition-all ${
                      selectedColorIndex === i 
                        ? 'border-[#D4AF37] scale-125 shadow-md' 
                        : 'border-white/20 opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
              <span className="text-xs text-zinc-300 font-mono ml-1">
                {product.colors[selectedColorIndex]?.name}
              </span>
            </div>
          )}

          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Available at Indra Dev Marga</span>
          </div>
        </div>

        {/* Right Column: Specifications, Price Range & Conversion CTAs */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono">
              <span className="text-xs uppercase tracking-widest font-bold text-zinc-400">
                {product.brand} · {product.category}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-xs text-[#D4AF37] font-medium">{product.stockStatus}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {product.name}
            </h2>

            <p className="text-xs sm:text-sm text-[#D4AF37] font-serif-artistic italic mt-1">
              "{product.tagline}"
            </p>

            {/* Approximate Price Range Banner */}
            <div className="mt-5 p-4 rounded-sm bg-white/[0.02] border border-white/10">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-wider text-zinc-400">
                    Estimated Price Range
                  </span>
                  <p className="text-xl sm:text-2xl font-bold text-[#D4AF37] tracking-tight mt-0.5 font-mono">
                    {product.priceRange}
                  </p>
                </div>
                <span className="text-[9px] px-2 py-0.5 bg-[#D4AF37]/15 text-[#D4AF37] font-mono border border-[#D4AF37]/30">
                  Chitwan
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed flex items-start gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                <span>{priceDisclaimer}</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-300 mt-5 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Technical Highlights */}
            <div className="mt-5">
              <p className="text-xs uppercase tracking-wider text-zinc-400 font-mono font-bold mb-2.5">
                Key Hardware Specifications
              </p>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {product.keySpecs.map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-0.5">•</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warranty & Guarantee */}
            <div className="mt-5 flex items-center gap-2 text-xs text-zinc-400 bg-white/[0.02] p-2.5 rounded-sm border border-white/5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{product.warranty}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
            {/* Primary WhatsApp Action */}
            <button
              id="modal-ask-whatsapp-btn"
              onClick={handleWhatsAppInquiry}
              className="btn-artistic btn-artistic-accent w-full justify-center text-xs py-3 rounded-none sm:rounded-sm shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>ASK ON WHATSAPP (INSTANT QUOTE)</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                id="modal-tradein-btn"
                onClick={() => {
                  onClose();
                  onStartExchange(product);
                }}
                className="btn-artistic btn-artistic-outline text-xs py-2.5 px-3 rounded-none sm:rounded-sm justify-center"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Trade-In for This</span>
              </button>

              <button
                id="modal-directions-btn"
                onClick={() => {
                  onClose();
                  onVisitShowroom();
                }}
                className="btn-artistic btn-artistic-outline text-xs py-2.5 px-3 rounded-none sm:rounded-sm justify-center"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Visit Showroom</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
