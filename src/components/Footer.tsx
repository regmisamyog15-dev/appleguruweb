import React from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Navigation, 
  ShieldCheck, 
  Clock, 
  ArrowUp,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { priceDisclaimer } from '../data/products';

interface FooterProps {
  onNavigate: (view: 'home' | 'phones' | 'exchange' | 'repair' | 'showroom' | 'insights' | 'facts' | 'location') => void;
  onOpenWhatsApp: (message?: string) => void;
  onVisitShowroom: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenWhatsApp,
  onVisitShowroom,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=Apple+Guru,+Indra+dev+Hall,+Bharatpur+44200`;

  return (
    <footer id="app-footer" className="bg-[#050505] text-white border-t border-white/[0.08] relative overflow-hidden">
      
      {/* --- FINAL HERO CONVERSION CTA (Artistic Flair) --- */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="glass-surface rounded-2xl sm:rounded-[32px] p-8 sm:p-16 border border-white/10 text-center relative overflow-hidden shadow-2xl">
          
          <div className="artistic-tag mb-6 justify-center">
            <div className="line" />
            <span>The Next Evolution</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[0.95]">
            READY TO UPGRADE?<br />
            <span className="font-serif-artistic italic font-light text-white/70">VISIT APPLE GURU.</span>
          </h2>

          <p className="text-sm sm:text-lg text-zinc-300 font-light mt-4 max-w-2xl mx-auto leading-relaxed">
            Touch and test the latest flagships in person at Indra Dev Marga, Chitwan. Transparent valuations, same-day repairs, and guaranteed authenticity.
          </p>

          {/* Three Core CTAs (Artistic Flair Buttons) */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              id="final-cta-visit-showroom"
              onClick={onVisitShowroom}
              className="btn-artistic btn-artistic-primary rounded-none sm:rounded-sm shadow-xl"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>VISIT SHOWROOM</span>
            </button>

            <button
              id="final-cta-whatsapp"
              onClick={() => onOpenWhatsApp('Hello Apple Guru! I am ready to upgrade my phone. Please assist me with stock and pricing at your Chitwan showroom.')}
              className="btn-artistic btn-artistic-accent rounded-none sm:rounded-sm shadow-xl"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-black" />
              <span>WHATSAPP APPLE GURU</span>
            </button>

            <a
              id="final-cta-directions"
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-artistic btn-artistic-outline rounded-none sm:rounded-sm"
            >
              <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>GET DIRECTIONS</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
          </div>

          {/* Artistic Flair Contact Blocks Strip */}
          <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            <div className="text-left">
              <div className="text-[9px] uppercase tracking-[1px] text-zinc-500 mb-1">Direct Line</div>
              <div className="text-xs font-semibold text-[#D4AF37] font-mono">9821552339</div>
            </div>
            <div className="text-left">
              <div className="text-[9px] uppercase tracking-[1px] text-zinc-500 mb-1">Digital Office</div>
              <div className="text-xs font-semibold text-white">@AppleGuruChitwan</div>
            </div>
            <div className="text-left">
              <div className="text-[9px] uppercase tracking-[1px] text-zinc-500 mb-1">Response Time</div>
              <div className="text-xs font-semibold text-white font-mono">&lt; 5 Minutes</div>
            </div>
            <div className="text-left">
              <div className="text-[9px] uppercase tracking-[1px] text-zinc-500 mb-1">Showroom Location</div>
              <div className="text-xs font-semibold text-zinc-300">Indra Dev Marga, Chitwan</div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOOTER SITEMAP & BUSINESS INFORMATION --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-bold text-base shadow-md">
                AG
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                APPLE GURU
              </span>
            </div>

            <p className="text-xs text-zinc-400 mt-4 leading-relaxed max-w-sm">
              Chitwan’s premier destination for genuine Apple flagships, trending Samsung devices, fair phone trade-ins, and precision micro-soldering repairs.
            </p>

            <div className="mt-6 space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                <span>Indra Dev Marga, Bharatpur 44200, Chitwan, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-white shrink-0" />
                <a href="tel:9821552339" className="hover:underline font-mono">+977 9821552339</a>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>3+ Years of authentic retail & lab service</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-widest text-zinc-400 mb-4 font-mono">
              Showroom & Products
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li>
                <button onClick={() => onNavigate('phones')} className="hover:text-white transition-colors">
                  Flagship Phones
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('phones')} className="hover:text-white transition-colors">
                  Apple First Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('phones')} className="hover:text-white transition-colors">
                  Trending Samsung
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('phones')} className="hover:text-white transition-colors">
                  MacBook Pro & Air
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('showroom')} className="hover:text-white transition-colors">
                  Inside the Showroom
                </button>
              </li>
            </ul>
          </div>

          {/* Services & Trade-In Col */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-widest text-zinc-400 mb-4 font-mono">
              Services & Lab
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li>
                <button onClick={() => onNavigate('exchange')} className="hover:text-white transition-colors">
                  Trade-In & Exchange
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('repair')} className="hover:text-white transition-colors">
                  Micro-Soldering Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('repair')} className="hover:text-white transition-colors">
                  OLED Screen Replacement
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('repair')} className="hover:text-white transition-colors">
                  BMS Battery Diagnostics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('location')} className="hover:text-white transition-colors">
                  Bharatpur Location & Map
                </button>
              </li>
            </ul>
          </div>

          {/* Insights & Community Col */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-widest text-zinc-400 mb-4 font-mono">
              Knowledge & Community
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li>
                <button onClick={() => onNavigate('insights')} className="hover:text-white transition-colors">
                  Apple Guru Insights
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('facts')} className="hover:text-white transition-colors">
                  Did You Know? Facts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Community & Concerts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Upcoming Giveaways
                </button>
              </li>
              <li>
                <button onClick={() => onOpenWhatsApp('Hello Apple Guru!')} className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <MessageCircle className="w-3 h-3 fill-current" /> WhatsApp Direct
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal & Price Disclaimer */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p className="max-w-3xl leading-relaxed text-center md:text-left">
            * <strong className="text-zinc-300">Notice on Pricing:</strong> {priceDisclaimer}
          </p>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors shrink-0 flex items-center gap-1.5"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="text-[11px] font-mono">TOP</span>
          </button>
        </div>

        <div className="mt-6 text-center text-[11px] text-zinc-400 font-mono">
          © {new Date().getFullYear()} Apple Guru · Indra Dev Marga, Chitwan, Nepal · All rights reserved.
        </div>
      </div>
    </footer>
  );
};
