import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  MapPin, 
  Play, 
  Pause,
  ArrowDown,
  MessageCircle,
  Wrench,
  Sparkles,
  Smartphone,
  Watch,
  RefreshCw,
  Eye
} from 'lucide-react';

interface CinematicHeroProps {
  onExplorePhones: () => void;
  onVisitShowroom: () => void;
  onOpenWhatsApp: (msg?: string) => void;
}

interface HeroMoment {
  id: number;
  label: string;
  headline: string;
  highlightWord: string;
  story: string;
  locationNote: string;
  icon: React.ElementType;
  image: string;
  imageAlt: string;
  visualTag: string;
  accentQuote: string;
  meaningKey: string;
}

// Exactly 6 moments corresponding to the 6 GIFs, each with deep human meaning
const moments: HeroMoment[] = [
  {
    id: 1,
    label: 'The Touch',
    headline: 'Hold it before you',
    highlightWord: 'decide.',
    story: 'A phone lives in your hands from sunrise to midnight. Come sit at our counter, feel the brushed titanium, test the camera in natural light, and take all the time you need.',
    locationNote: 'Showroom open daily · Indra Dev Marga',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Person holding an authentic iPhone inspecting the finish in natural light',
    visualTag: 'Tactile Experience',
    accentQuote: 'Technology you feel, not just look at.',
    meaningKey: 'touch'
  },
  {
    id: 2,
    label: 'The Lab',
    headline: 'We fix what holds your',
    highlightWord: 'memories.',
    story: 'Inside every broken screen is five years of family moments and conversations. We perform micro-soldering, battery transplants, and screen renewals with surgeon\'s care so nothing is lost.',
    locationNote: 'Certified master technicians on-site',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Hands carefully soldering a motherboard circuit under warm workbench light',
    visualTag: 'Hardware Surgery',
    accentQuote: 'No device is disposable when it carries your life.',
    meaningKey: 'repair'
  },
  {
    id: 3,
    label: 'The Companion',
    headline: 'Quiet intelligence.',
    highlightWord: 'Real help.',
    story: 'A true AI companion has arrived. Not empty marketing buzzwords, but real-time translation when you travel, clean voice isolation on Bharatpur roads, and notes organized before you ask.',
    locationNote: 'Galaxy AI & Apple Intelligence ready to test',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Modern flagship smartphone glowing softly in minimalist darkness',
    visualTag: 'Next-Gen Flagships',
    accentQuote: 'A companion that understands your day.',
    meaningKey: 'intelligence'
  },
  {
    id: 4,
    label: 'The Rhythm',
    headline: 'Every heartbeat.',
    highlightWord: 'Every hour.',
    story: 'Worn directly against your skin. From morning walks along the Narayani river to quiet meeting reminders, Apple Watch Series 10 and Ultra 2 with braided solo loops fit your daily pulse.',
    locationNote: 'Original loop bands & sizing at showroom',
    icon: Watch,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Apple Watch with braided solo loop rotating quietly on neutral canvas',
    visualTag: 'Wearable Harmony',
    accentQuote: 'Time worn close to your pulse.',
    meaningKey: 'watch'
  },
  {
    id: 5,
    label: 'The Switch',
    headline: 'Trade the worn.',
    highlightWord: 'Welcome the new.',
    story: 'Moving from your old phone should never feel stressful. Bring whatever device you are holding today. We give you honest cash valuation on the counter and migrate every contact in twenty minutes.',
    locationNote: 'Instant trade-in appraisal at counter',
    icon: RefreshCw,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Your old phone seamlessly transitioning to a new flagship on clean wooden desk',
    visualTag: 'Honest Trade-In',
    accentQuote: 'Out with the old. Seamlessly into the timeless.',
    meaningKey: 'switch'
  },
  {
    id: 6,
    label: 'The Horizon',
    headline: 'A clear window into the',
    highlightWord: 'world.',
    story: 'Flagship Super AMOLED and ProMotion glass engineered without boundaries. Colors that look like real life and anti-reflective displays that stay legible even under Chitwan\'s brightest afternoon sun.',
    locationNote: 'Tested under open Chitwan sunlight',
    icon: Eye,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Sleek smartphone floating in deep starry cosmos revealing an endless horizon',
    visualTag: 'Unbounded Displays',
    accentQuote: 'Expansive vision in the palm of your hand.',
    meaningKey: 'horizon'
  }
];

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onExplorePhones,
  onVisitShowroom,
  onOpenWhatsApp
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeMoment = moments[activeIndex];
  const DURATION_MS = 4000; // Exactly 4 seconds as requested by the user

  // Manage the 4-second auto progression
  useEffect(() => {
    if (!isPlaying) return;

    setProgress(0);
    const startTime = Date.now();

    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / DURATION_MS) * 100);
      setProgress(pct);
    }, 50);

    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % moments.length);
    }, DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [activeIndex, isPlaying]);

  const handleSelectMoment = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <section 
      id="hero-cinematic-section" 
      className="relative min-h-[92vh] w-full bg-[#050505] text-white overflow-hidden flex flex-col justify-between pt-20 pb-10 sm:pt-24 select-none border-b border-white/[0.06]"
    >
      {/* Background Starry Cosmos for Slide 6 or Subtle Warm Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {activeMoment.meaningKey === 'horizon' ? (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-[#050505] to-[#050505] transition-opacity duration-1000">
            {/* Ambient Star particles */}
            <div className="absolute w-1 h-1 bg-white/70 rounded-full top-1/4 left-1/5 animate-ping" />
            <div className="absolute w-1.5 h-1.5 bg-white/60 rounded-full top-1/3 right-1/4 animate-pulse" />
            <div className="absolute w-1 h-1 bg-white/50 rounded-full top-2/3 left-1/3" />
            <div className="absolute w-1 h-1 bg-[#D4AF37]/60 rounded-full top-1/2 right-1/6" />
          </div>
        ) : (
          <div 
            className="absolute w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full blur-[140px] opacity-15 -top-40 left-1/2 -translate-x-1/2 transition-all duration-1000"
            style={{
              background: activeMoment.meaningKey === 'repair' 
                ? 'radial-gradient(circle, #f97316 0%, transparent 70%)'
                : activeMoment.meaningKey === 'watch'
                ? 'radial-gradient(circle, #3b82f6 0%, transparent 70%)'
                : 'radial-gradient(circle, #D4AF37 0%, transparent 70%)'
            }}
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      {/* Top Quiet Anchor Tag */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span className="text-[11px] font-mono tracking-widest text-zinc-300 uppercase">
            APPLE GURU · INDRA DEV MARGA, CHITWAN
          </span>
          <span className="hidden sm:inline text-zinc-600">·</span>
          <span className="hidden sm:inline text-[11px] text-[#D4AF37] font-serif-artistic italic">
            Authentic Phones & Precision Repair
          </span>
        </div>
      </div>

      {/* Center Stage: Human Narrative + Real Device Photography */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 py-4 sm:py-8">
        
        {/* Left Column: Pure Human Words (Non-AI, literary, grounded) */}
        <div className="w-full lg:w-1/2 text-left flex flex-col items-start max-w-xl">
          
          {/* Moment Tag with Subtle Line */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-[#D4AF37] font-bold tracking-wider uppercase">
              0{activeMoment.id} / 06
            </span>
            <span className="w-8 h-[1px] bg-[#D4AF37]/40" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              {activeMoment.visualTag}
            </span>
          </div>

          {/* Deep Human Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.1] min-h-[90px] sm:min-h-[130px] flex flex-col justify-center">
            <span>{activeMoment.headline}</span>
            <span className="font-serif-artistic italic font-normal text-[#D4AF37] mt-0.5">
              {activeMoment.highlightWord}
            </span>
          </h1>

          {/* Meaningful, Human Story (Less text, deep meaning) */}
          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed mt-4 min-h-[80px]">
            {activeMoment.story}
          </p>

          {/* Poetic Accent Quote */}
          <div className="mt-3 pl-3 border-l border-[#D4AF37]/40 text-xs sm:text-sm text-zinc-400 font-serif-artistic italic">
            "{activeMoment.accentQuote}"
          </div>

          {/* Clean Call to Actions */}
          <div className="mt-8 flex flex-wrap gap-4 items-center w-full">
            <button
              id="hero-explore-collection-btn"
              onClick={onExplorePhones}
              className="px-6 py-3 bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-colors flex items-center gap-2 rounded-sm shadow-md"
            >
              <span>Explore Collection</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              id="hero-visit-showroom-btn"
              onClick={onVisitShowroom}
              className="px-6 py-3 bg-transparent text-white border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 rounded-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Visit Showroom</span>
            </button>

            <button
              id="hero-ask-whatsapp-btn"
              onClick={() => onOpenWhatsApp(`Hello Apple Guru, I am interested in ${activeMoment.label} at Indra Dev Marga.`)}
              className="px-4 py-3 text-zinc-400 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ask on WhatsApp</span>
            </button>
          </div>

          {/* Human Location Stamp */}
          <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{activeMoment.locationNote}</span>
          </div>
        </div>

        {/* Right Column: Real Documentary Photograph Representing the GIF */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          
          <div className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] bg-zinc-950 group">
            
            {/* Real Photographic Image */}
            <img
              src={activeMoment.image}
              alt={activeMoment.imageAlt}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />

            {/* Subtle photographic vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Specific GIF Visual Accent Indicators */}
            {activeMoment.meaningKey === 'repair' && (
              <div className="absolute top-4 right-4 px-2.5 py-1 bg-amber-500/20 border border-amber-500/40 backdrop-blur-md rounded-sm text-[10px] font-mono text-amber-300 flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Micro-Soldering Lab</span>
              </div>
            )}

            {activeMoment.meaningKey === 'switch' && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/70 border border-white/10 px-3 py-1 rounded-sm text-[10px] font-mono text-zinc-300 backdrop-blur-md">
                <span className="text-zinc-500">Your Phone</span>
                <span className="text-[#D4AF37]">→</span>
                <span className="text-white font-bold">New Flagship</span>
              </div>
            )}

            {activeMoment.meaningKey === 'watch' && (
              <div className="absolute top-4 right-4 px-2.5 py-1 bg-blue-500/20 border border-blue-500/40 backdrop-blur-md rounded-sm text-[10px] font-mono text-blue-300 flex items-center gap-1.5">
                <Watch className="w-3 h-3 text-blue-400" />
                <span>Braided Solo Loop</span>
              </div>
            )}

            {activeMoment.meaningKey === 'intelligence' && (
              <div className="absolute top-4 right-4 px-2.5 py-1 bg-[#D4AF37]/15 border border-[#D4AF37]/30 backdrop-blur-md rounded-sm text-[10px] font-mono text-[#D4AF37] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>A True Companion</span>
              </div>
            )}

            {activeMoment.meaningKey === 'touch' && (
              <div className="absolute top-4 right-4 px-2.5 py-1 bg-white/10 border border-white/20 backdrop-blur-md rounded-sm text-[10px] font-mono text-zinc-300 flex items-center gap-1.5">
                <span>Natural Titanium</span>
              </div>
            )}

            {activeMoment.meaningKey === 'horizon' && (
              <div className="absolute top-4 right-4 px-2.5 py-1 bg-indigo-500/20 border border-indigo-500/30 backdrop-blur-md rounded-sm text-[10px] font-mono text-indigo-300 flex items-center gap-1.5">
                <span>Infinite Horizon</span>
              </div>
            )}

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
              <div className="bg-black/60 backdrop-blur-md px-3 py-2 rounded-sm border border-white/10 max-w-[85%]">
                <p className="text-xs font-semibold text-white truncate">{activeMoment.accentQuote}</p>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{activeMoment.locationNote}</p>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-mono text-[#D4AF37] bg-black/80 px-2 py-1 border border-[#D4AF37]/30">
                  4s
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Timeline Stepper with 4-Second Dynamic Progress Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full mt-4">
        
        {/* 6 Moments Nav Strip (Changing every 4 seconds) */}
        <div className="glass-surface p-2 sm:p-3 rounded-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Stepper Buttons for each of the 6 GIF Meanings */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 w-full md:w-auto flex-1">
            {moments.map((m, idx) => {
              const isSelected = activeIndex === idx;
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  id={`hero-moment-tab-${idx}`}
                  onClick={() => handleSelectMoment(idx)}
                  className={`relative p-2 rounded-sm text-left transition-all flex flex-col justify-between overflow-hidden border ${
                    isSelected
                      ? 'bg-white/[0.08] border-[#D4AF37]/60 text-white'
                      : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Active Progress Bar (Fills in 4 seconds) */}
                  {isSelected && isPlaying && (
                    <div 
                      className="absolute top-0 left-0 bottom-0 bg-[#D4AF37]/15 pointer-events-none transition-all duration-75"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
                  )}

                  <div className="flex items-center justify-between w-full relative z-10">
                    <span className="text-[10px] font-mono font-bold text-zinc-500">
                      0{m.id}
                    </span>
                    <Icon className={`w-3 h-3 ${isSelected ? 'text-[#D4AF37]' : 'text-zinc-500'}`} />
                  </div>

                  <p className={`text-xs font-medium tracking-tight mt-1 truncate relative z-10 ${
                    isSelected ? 'text-white font-semibold' : 'text-zinc-400'
                  }`}>
                    {m.label}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Autoplay toggle & Quick Jump to Catalog */}
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <button
              id="hero-toggle-play-btn"
              onClick={handleTogglePlay}
              title={isPlaying ? 'Pause 4-second cycle' : 'Resume 4-second cycle'}
              className="px-3 py-1.5 rounded-sm bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/10 text-xs flex items-center gap-1.5 transition-colors font-mono"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Play className="w-3.5 h-3.5 text-[#D4AF37]" />}
              <span className="text-[10px] uppercase tracking-wider">{isPlaying ? '4s Cycle' : 'Paused'}</span>
            </button>

            <button
              onClick={onExplorePhones}
              className="text-xs text-zinc-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1 font-mono uppercase text-[10px]"
            >
              <span>See Devices</span>
              <ArrowDown className="w-3 h-3 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
