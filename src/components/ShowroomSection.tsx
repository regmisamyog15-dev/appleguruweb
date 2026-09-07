import React, { useState } from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  Award, 
  Users, 
  Clock, 
  Sparkles, 
  ChevronRight,
  Phone,
  MessageCircle
} from 'lucide-react';

interface ShowroomSectionProps {
  onOpenWhatsApp: (message?: string) => void;
  onViewLocation: () => void;
}

export const ShowroomSection: React.FC<ShowroomSectionProps> = ({
  onOpenWhatsApp,
  onViewLocation,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const showroomGallery = [
    {
      title: 'The Flagship Hands-On Experience',
      caption: 'Test genuine Apple and Samsung devices side-by-side in a well-lit, minimalist environment.',
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=1200&auto=format&fit=crop',
      tag: 'Display Floor'
    },
    {
      title: 'Precision Micro-Soldering Workstation',
      caption: 'Level 3 stereoscopic microscopes and thermal cameras dedicated to motherboard diagnostics.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
      tag: 'Lab Division'
    },
    {
      title: 'Instant Device Valuation Desk',
      caption: 'Transparent 10-minute appraisals where customers watch the entire diagnostic workflow.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
      tag: 'Exchange Counter'
    },
    {
      title: 'Original Supply & Sealed Units',
      caption: 'Every single phone verified with clean MDMS registration and manufacturer serial pairing.',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop',
      tag: 'Inventory Vault'
    }
  ];

  return (
    <section id="showroom-heritage-section" className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Background Watermark */}
      <div className="bg-word">CHITWAN</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="artistic-tag mb-4 justify-center">
            <div className="line" />
            <span>Chitwan's Original Destination</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            THE ORIGINAL<br />
            <span className="font-serif-artistic italic font-light text-[#D4AF37]">APPLE GURU.</span>
          </h2>

          <p className="text-xl sm:text-2xl font-serif-artistic italic text-zinc-300 mt-3">
            Indra Dev Marga · Bharatpur, Chitwan
          </p>

          <p className="text-base sm:text-lg text-zinc-400 font-light mt-4 leading-relaxed max-w-2xl mx-auto">
            Established over 3 years ago in the heart of Bharatpur to offer an uncompromising technology sanctuary: authentic flagship hardware, fair trade-ins, and a precision repair lab.
          </p>
        </div>

        {/* 3+ Years Metric & Pillars Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="glass-surface p-8 rounded-xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <span className="text-4xl sm:text-5xl font-bold text-[#D4AF37] tracking-tight font-mono">
                3+ YEARS
              </span>
              <p className="text-[10px] uppercase tracking-[2px] text-zinc-300 font-bold mt-1">
                Of Dedicated Service
              </p>
            </div>
            <p className="text-xs text-zinc-400 mt-6 leading-relaxed">
              Consistently serving Chitwan with authentic devices, rapid turnaround repairs, and honest trade-in appraisals.
            </p>
          </div>

          <div className="glass-surface p-8 rounded-xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <span className="text-4xl sm:text-5xl font-bold text-[#D4AF37] tracking-tight font-mono">
                100%
              </span>
              <p className="text-[10px] uppercase tracking-[2px] text-zinc-300 font-bold mt-1">
                Authenticity Guarantee
              </p>
            </div>
            <p className="text-xs text-zinc-400 mt-6 leading-relaxed">
              No fakes. No clones. Every Apple and Samsung device is verified authentic with full regulatory compliance.
            </p>
          </div>

          <div className="glass-surface p-8 rounded-xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                INDRA DEV MARGA
              </span>
              <p className="text-[10px] uppercase tracking-[2px] text-[#D4AF37] font-bold mt-1">
                Central Bharatpur Location
              </p>
            </div>
            <p className="text-xs text-zinc-400 mt-6 leading-relaxed">
              Convenient access with dedicated customer parking, live demo units, and our in-house surgical clean lab.
            </p>
          </div>
        </div>

        {/* Interactive Showroom Photography Gallery */}
        <div className="glass-surface rounded-2xl overflow-hidden border border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="artistic-tag mb-1">
                <div className="line" />
                <span>Showroom Gallery</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Inside the Apple Guru Experience
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Click photographs to explore different divisions of our showroom
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onViewLocation}
                className="btn-artistic btn-artistic-outline text-xs py-2 px-4 rounded-none sm:rounded-sm"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Show on Map</span>
              </button>
            </div>
          </div>

          {/* Featured Large View */}
          <div className="aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden relative group mb-6 bg-zinc-950 border border-white/10">
            <img
              src={showroomGallery[activePhotoIndex].image}
              alt={showroomGallery[activePhotoIndex].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-[2px] px-2.5 py-1 rounded-none bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-md">
                  {showroomGallery[activePhotoIndex].tag}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {showroomGallery[activePhotoIndex].title}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl">
                  {showroomGallery[activePhotoIndex].caption}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <a
                  href="tel:9821552339"
                  className="btn-artistic btn-artistic-accent text-xs py-2.5 px-4 rounded-none sm:rounded-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 9821552339</span>
                </a>
              </div>
            </div>
          </div>

          {/* Thumbnail Track */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {showroomGallery.map((item, index) => (
              <button
                key={index}
                onClick={() => setActivePhotoIndex(index)}
                className={`p-2.5 rounded-sm border transition-all text-left flex flex-col gap-2 ${
                  activePhotoIndex === index
                    ? 'bg-[#D4AF37]/10 border-[#D4AF37]'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="aspect-video rounded-sm overflow-hidden bg-zinc-900 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{item.title}</p>
                  <span className="text-[10px] text-[#D4AF37] font-mono">{item.tag}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
