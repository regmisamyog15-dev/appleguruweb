import React, { useState } from 'react';
import { products, priceDisclaimer } from '../data/products';
import { Product } from '../types';
import { 
  MessageCircle, 
  Eye, 
  MapPin, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight,
  Filter
} from 'lucide-react';

interface ProductSectionProps {
  onSelectProduct: (product: Product) => void;
  onOpenWhatsApp: (message?: string) => void;
  onVisitShowroom: () => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  onSelectProduct,
  onOpenWhatsApp,
  onVisitShowroom,
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Apple' | 'Samsung' | 'Mac' | 'Wearables'>('All');

  // Categorized splits
  const appleProducts = products.filter(p => p.brand === 'Apple' && p.category === 'iPhone');
  const samsungProducts = products.filter(p => p.brand === 'Samsung');
  const macProducts = products.filter(p => p.category === 'Mac');
  const wearableProducts = products.filter(p => p.category === 'Audio & Wearables');

  const crownApple = appleProducts[0]; // iPhone 16 Pro Max
  const secondaryApples = appleProducts.slice(1);

  const crownSamsung = samsungProducts[0]; // Galaxy S25 Ultra
  const secondarySamsungs = samsungProducts.slice(1);

  const filteredList = activeCategory === 'All'
    ? products
    : activeCategory === 'Apple'
    ? appleProducts
    : activeCategory === 'Samsung'
    ? samsungProducts
    : activeCategory === 'Mac'
    ? macProducts
    : wearableProducts;

  return (
    <section id="products-catalog-section" className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Background Watermark Word */}
      <div className="bg-word">DEVICES</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="artistic-tag mb-4 justify-center">
            <div className="line" />
            <span>Direct From Authorized Supply Chains</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            EXPLORE <span className="font-serif-artistic italic font-light text-[#D4AF37]">PHONES.</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 font-light mt-3 leading-relaxed">
            Authentic Apple, trending Samsung, and high-performance Mac. Presented with editorial precision and guaranteed peace of mind.
          </p>

          {/* Filter Pills (Artistic Flair Style) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {(['All', 'Apple', 'Samsung', 'Mac', 'Wearables'] as const).map((cat) => (
              <button
                key={cat}
                id={`filter-pill-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-none sm:rounded-sm text-[10px] sm:text-[11px] font-bold uppercase tracking-[2px] transition-all ${
                  activeCategory === cat
                    ? 'bg-[#D4AF37] text-[#050505] border border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'bg-transparent hover:border-[#D4AF37]/60 text-zinc-400 hover:text-white border border-white/20'
                }`}
              >
                {cat === 'All' ? 'All Flagships' : cat === 'Apple' ? 'Apple (iPhones)' : cat === 'Samsung' ? 'Trending Samsung' : cat === 'Mac' ? 'MacBooks' : 'Watches & Audio'}
              </button>
            ))}
          </div>

          {/* Price Range Notice */}
          <p className="text-xs text-zinc-400 mt-4 max-w-xl mx-auto italic">
            * {priceDisclaimer}
          </p>
        </div>

        {/* --- 1. APPLE FIRST: LARGE EDITORIAL SHOWCASE (When All or Apple selected) --- */}
        {(activeCategory === 'All' || activeCategory === 'Apple') && (
          <div className="mb-24">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/15">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.98-5.87-9.04-10.45-19.55-13.75-31.54-3.3-11.99-4.95-23.27-4.95-33.86 0-14.28 3.59-26.06 10.77-35.34 7.18-9.28 16.35-14.05 27.5-14.31 5.33.12 11.22 1.58 17.67 4.39 6.45 2.81 10.4 4.33 11.87 4.56 2.18-.55 6.42-2.18 12.74-4.89 6.32-2.71 12.02-3.99 17.1-3.84 13.06.66 23.33 5.48 30.82 14.46-11.53 6.96-17.18 16.53-16.94 28.72.24 9.56 3.91 17.5 11.01 23.82 7.1 6.32 15.48 9.87 25.13 10.65-2.06 6.19-4.44 12.18-7.14 17.96zM119.22 33.64c0-7.39 2.66-14.41 7.99-21.06 5.33-6.65 11.94-11.19 19.83-13.62.98 7.39-1.25 14.52-6.69 21.39-5.44 6.87-12.14 11.51-20.09 13.92-.33-.22-.68-.43-1.04-.63z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    APPLE FIRST
                  </h3>
                  <p className="text-xs text-zinc-400">The world’s most refined mobile silicon & titanium craftsmanship</p>
                </div>
              </div>
              <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                01 / THE FLAGSHIP TIER
              </span>
            </div>

            {/* Dominant Featured iPhone Card */}
            {crownApple && (
              <div className="glass-surface rounded-2xl overflow-hidden border border-white/15 p-6 sm:p-12 mb-10 relative grid lg:grid-cols-12 gap-8 items-center group shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[9px] uppercase font-bold tracking-[2px] px-3 py-1 rounded-none sm:rounded-sm bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                        Featured Apple Flagship
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">Available in Chitwan</span>
                    </div>

                    <h4 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                      {crownApple.name}
                    </h4>

                    <p className="text-sm sm:text-base text-zinc-300 font-serif-artistic italic mt-2">
                      "{crownApple.tagline}"
                    </p>

                    <p className="text-sm text-zinc-300 mt-4 leading-relaxed max-w-xl">
                      {crownApple.description}
                    </p>

                    {/* Price Range Badge */}
                    <div className="mt-6 inline-flex flex-col sm:flex-row sm:items-baseline gap-2 bg-white/[0.03] p-3.5 rounded-sm border border-white/10">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Estimated Price Range:</span>
                      <span className="text-xl font-bold text-[#D4AF37] font-mono">{crownApple.priceRange}</span>
                      <span className="text-[10px] text-zinc-400">(Contact Apple Guru for today's configuration)</span>
                    </div>

                    {/* Hardware bullets */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                      {crownApple.keySpecs.slice(0, 4).map((spec, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Editorial Actions (Artistic Flair Buttons) */}
                  <div className="mt-8 flex flex-wrap gap-3 items-center">
                    <button
                      id="apple-hero-ask-whatsapp-btn"
                      onClick={() => onOpenWhatsApp(`Hello Apple Guru! I'm interested in the ${crownApple.name} at your Chitwan showroom.`)}
                      className="btn-artistic btn-artistic-accent rounded-none sm:rounded-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-black" />
                      <span>ASK ON WHATSAPP</span>
                    </button>

                    <button
                      id="apple-hero-view-details-btn"
                      onClick={() => onSelectProduct(crownApple)}
                      className="btn-artistic btn-artistic-outline rounded-none sm:rounded-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>VIEW DETAILS</span>
                    </button>

                    <button
                      onClick={onVisitShowroom}
                      className="text-xs uppercase tracking-[2px] font-semibold text-zinc-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 px-3 py-2"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>VISIT SHOWROOM</span>
                    </button>
                  </div>
                </div>

                {/* Dominant Product Image */}
                <div className="lg:col-span-5 flex items-center justify-center relative">
                  <div className="w-full max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 group-hover:scale-105 transition-transform duration-700">
                    <img
                      src={crownApple.image}
                      alt={crownApple.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <span className="text-[9px] uppercase font-mono tracking-[2px] text-[#D4AF37]">Showroom Flagship</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Smaller Apple Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondaryApples.map((p) => (
                <div
                  key={p.id}
                  id={`product-card-${p.id}`}
                  className="glass-surface rounded-xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between group p-6"
                >
                  <div>
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-zinc-950 mb-5 relative">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[9px] uppercase font-bold tracking-[1.5px] px-2.5 py-1 rounded-none bg-black/80 text-[#D4AF37] backdrop-blur-md border border-[#D4AF37]/30">
                          {p.brand}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-xl font-bold text-white tracking-tight group-hover:text-[#D4AF37] transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {p.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-baseline justify-between">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Guide:</span>
                      <span className="text-sm font-bold text-[#D4AF37] font-mono">{p.priceRange}</span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectProduct(p)}
                      className="px-3.5 py-2 rounded-none sm:rounded-sm border border-white/15 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] text-[10px] uppercase tracking-[1.5px] font-semibold transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => onOpenWhatsApp(`Hello Apple Guru! Inquiring about ${p.name} (${p.priceRange})`)}
                      className="px-3.5 py-2 rounded-none sm:rounded-sm bg-[#D4AF37] hover:bg-[#b89528] text-[#050505] text-[10px] uppercase tracking-[1.5px] font-bold transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <MessageCircle className="w-3 h-3 fill-current" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 2. TRENDING SAMSUNG SECTION --- */}
        {(activeCategory === 'All' || activeCategory === 'Samsung') && (
          <div className="mb-24">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  TRENDING SAMSUNG
                </h3>
                <p className="text-xs text-zinc-400">Galaxy AI, titanium form factors, and revolutionary foldables</p>
              </div>
              <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                02 / GALAXY APEX
              </span>
            </div>

            {/* Featured Samsung Hero Display */}
            {crownSamsung && (
              <div className="glass-surface rounded-3xl sm:rounded-[40px] overflow-hidden border border-white/20 p-6 sm:p-12 mb-10 relative grid lg:grid-cols-12 gap-8 items-center group shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      Apex Android Flagship
                    </span>
                    <h4 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-3">
                      {crownSamsung.name}
                    </h4>
                    <p className="text-sm text-zinc-300 font-serif-luxury italic mt-2">
                      "{crownSamsung.tagline}"
                    </p>
                    <p className="text-sm text-zinc-300 mt-4 leading-relaxed max-w-xl">
                      {crownSamsung.description}
                    </p>

                    <div className="mt-6 inline-flex flex-col sm:flex-row sm:items-baseline gap-2 bg-white/[0.04] p-3.5 rounded-2xl border border-white/10">
                      <span className="text-xs text-zinc-400 uppercase font-semibold">Estimated Price Range:</span>
                      <span className="text-xl font-extrabold text-white">{crownSamsung.priceRange}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3 items-center">
                    <button
                      onClick={() => onOpenWhatsApp(`Hello Apple Guru! Inquiring about Samsung ${crownSamsung.name} at Chitwan showroom.`)}
                      className="px-6 py-3 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 fill-black" />
                      <span>ASK ON WHATSAPP</span>
                    </button>
                    <button
                      onClick={() => onSelectProduct(crownSamsung)}
                      className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 border border-white/15"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>VIEW DETAILS</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 flex items-center justify-center">
                  <div className="w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 group-hover:scale-105 transition-transform duration-700">
                    <img
                      src={crownSamsung.image}
                      alt={crownSamsung.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Samsung Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondarySamsungs.map((p) => (
                <div
                  key={p.id}
                  id={`samsung-card-${p.id}`}
                  className="glass-surface rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group p-6"
                >
                  <div>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 mb-5 relative">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-black/70 text-blue-300 backdrop-blur-md border border-white/10">
                          {p.brand}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-xl font-bold text-white tracking-tight">
                      {p.name}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {p.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-baseline justify-between">
                      <span className="text-[11px] text-zinc-400 uppercase font-semibold">Guide:</span>
                      <span className="text-sm font-bold text-white">{p.priceRange}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectProduct(p)}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={() => onOpenWhatsApp(`Hello Apple Guru! I want to check availability for ${p.name}`)}
                      className="px-3.5 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-black" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 3. OTHER TRENDING DEVICES & MAC --- */}
        {(activeCategory === 'All' || activeCategory === 'Mac') && (
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  MAC & POWER GADGETS
                </h3>
                <p className="text-xs text-zinc-400">MacBook Pro, MacBook Air & creative hardware ready for in-store checkout</p>
              </div>
              <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                03 / PRO ECOSYSTEM
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {macProducts.map((p) => (
                <div
                  key={p.id}
                  id={`mac-card-${p.id}`}
                  className="glass-surface rounded-3xl overflow-hidden border border-white/15 hover:border-white/30 transition-all p-8 flex flex-col justify-between group"
                >
                  <div>
                    <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-950 mb-6 relative">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Apple Silicon</span>
                    <h4 className="text-2xl font-bold text-white tracking-tight mt-1">{p.name}</h4>
                    <p className="text-xs text-zinc-300 mt-2 leading-relaxed">{p.description}</p>
                    
                    <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-baseline justify-between">
                      <span className="text-xs text-zinc-400 uppercase font-semibold">Guide Price Range:</span>
                      <span className="text-base font-bold text-white">{p.priceRange}</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => onSelectProduct(p)}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Full Specifications</span>
                    </button>
                    <button
                      onClick={() => onOpenWhatsApp(`Hello Apple Guru! Inquiring about ${p.name}`)}
                      className="px-5 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4 fill-black" />
                      <span>Ask on WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 4. WEARABLES & AUDIO (Apple Watch & AirPods) --- */}
        {(activeCategory === 'All' || activeCategory === 'Wearables') && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  WEARABLES & AUDIO
                </h3>
                <p className="text-xs text-zinc-400">Apple Watch Series 10, Ultra 2, and AirPods Pro with genuine warranty</p>
              </div>
              <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                04 / WEARABLE HARMONY
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {wearableProducts.map((p) => (
                <div
                  key={p.id}
                  id={`wearable-card-${p.id}`}
                  className="glass-surface rounded-3xl overflow-hidden border border-white/15 hover:border-white/30 transition-all p-8 flex flex-col justify-between group"
                >
                  <div>
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 mb-6 relative">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">Original Accessory</span>
                    <h4 className="text-2xl font-bold text-white tracking-tight mt-1">{p.name}</h4>
                    <p className="text-xs text-zinc-300 mt-2 leading-relaxed">{p.description}</p>
                    
                    <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-baseline justify-between">
                      <span className="text-xs text-zinc-400 uppercase font-semibold">Guide Price Range:</span>
                      <span className="text-base font-bold text-white">{p.priceRange}</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => onSelectProduct(p)}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Specifications</span>
                    </button>
                    <button
                      onClick={() => onOpenWhatsApp(`Hello Apple Guru! Inquiring about ${p.name}`)}
                      className="px-5 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4 fill-black" />
                      <span>Ask on WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
