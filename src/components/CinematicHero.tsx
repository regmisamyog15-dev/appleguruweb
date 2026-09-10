import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronRight,
  MapPin,
  Play,
  Pause,
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
  eyebrow: string;
  headline: string;
  sub: string;
  locationNote: string;
  icon: React.ElementType;
  image: string;
  imageAlt: string;
  accentColor: string;
  meaningKey: string;
}

const moments: HeroMoment[] = [
  {
    id: 1,
    label: 'The Touch',
    eyebrow: 'Showroom Experience',
    headline: 'Hold it before\nyou decide.',
    sub: 'Every flagship at our counter — feel the titanium, test the camera in natural Chitwan light, take all the time you need.',
    locationNote: 'Open daily · Indra Dev Marga',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Person inspecting an iPhone in natural light',
    accentColor: 'rgba(41,151,255,0.6)',
    meaningKey: 'touch',
  },
  {
    id: 2,
    label: 'The Lab',
    eyebrow: 'Precision Repair',
    headline: 'We fix what holds\nyour memories.',
    sub: 'Micro-soldering, battery transplants, screen renewals — performed with surgeon\'s care so nothing is lost.',
    locationNote: 'Certified technicians on-site',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Technician soldering a circuit board',
    accentColor: 'rgba(251,146,60,0.5)',
    meaningKey: 'repair',
  },
  {
    id: 3,
    label: 'Intelligence',
    eyebrow: 'Next-Gen Flagships',
    headline: 'Quiet intelligence.\nReal help.',
    sub: 'Galaxy AI and Apple Intelligence ready to test in-store. Real-time translation, voice isolation, notes — before you buy.',
    locationNote: 'Test in-store today',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Modern flagship smartphone with AI features',
    accentColor: 'rgba(167,139,250,0.5)',
    meaningKey: 'intelligence',
  },
  {
    id: 4,
    label: 'The Watch',
    eyebrow: 'Wearable Collection',
    headline: 'Every heartbeat.\nEvery hour.',
    sub: 'Apple Watch Series 10 and Ultra 2. Braided solo loops sized and fitted at our showroom.',
    locationNote: 'Original bands & sizing available',
    icon: Watch,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Apple Watch with braided loop on neutral canvas',
    accentColor: 'rgba(52,211,153,0.5)',
    meaningKey: 'watch',
  },
  {
    id: 5,
    label: 'Exchange',
    eyebrow: 'Honest Trade-In',
    headline: 'Trade the worn.\nWelcome the new.',
    sub: 'Bring any device. Honest cash valuation on the counter, every contact migrated in twenty minutes.',
    locationNote: 'Instant appraisal at counter',
    icon: RefreshCw,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Old phone transitioning to a new flagship',
    accentColor: 'rgba(212,175,55,0.5)',
    meaningKey: 'switch',
  },
  {
    id: 6,
    label: 'The Display',
    eyebrow: 'Flagship Screens',
    headline: 'A clear window\ninto the world.',
    sub: 'ProMotion and Super AMOLED that stay legible under Chitwan\'s brightest afternoon sun.',
    locationNote: 'Tested under open sunlight',
    icon: Eye,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Sleek smartphone display glowing in darkness',
    accentColor: 'rgba(99,179,237,0.5)',
    meaningKey: 'horizon',
  },
];

const DURATION_MS = 5000;

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onExplorePhones,
  onVisitShowroom,
  onOpenWhatsApp,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const activeMoment = moments[activeIndex];

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const tick = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const pct = Math.min(100, (elapsed / DURATION_MS) * 100);
    setProgress(pct);
    if (pct < 100) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    clearTimers();
    setProgress(0);
    startTimeRef.current = Date.now();
    rafRef.current = requestAnimationFrame(tick);
    timerRef.current = setTimeout(() => {
      setActiveIndex(prev => {
        setPrevIndex(prev);
        return (prev + 1) % moments.length;
      });
    }, DURATION_MS);
    return clearTimers;
  }, [activeIndex, isPlaying, tick, clearTimers]);

  const handleSelectMoment = (index: number) => {
    clearTimers();
    setPrevIndex(activeIndex);
    setActiveIndex(index);
    setProgress(0);
  };

  return (
    <section
      id="hero-cinematic-section"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        width: '100%',
        background: '#000',
        color: '#f5f5f7',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '52px', /* nav height */
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'opacity 1s ease',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '30%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: `radial-gradient(ellipse, ${activeMoment.accentColor} 0%, transparent 65%)`,
            filter: 'blur(80px)',
            transition: 'background 1.2s ease',
            animation: 'glow-pulse 6s ease-in-out infinite',
          }}
        />
      </div>

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '0 22px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: '60px',
          paddingBottom: '40px',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            alignItems: 'center',
          }}
          className="lg:grid-cols-2"
        >
          {/* LEFT: Text */}
          <div key={activeIndex} style={{ animation: 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both' }}>

            {/* Eyebrow */}
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#2997ff',
                marginBottom: '20px',
                animation: 'fade-up 0.7s 0.05s cubic-bezier(0.16,1,0.3,1) both',
              }}
            >
              {activeMoment.eyebrow}
            </p>

            {/* Headline — Apple-huge */}
            <h1
              style={{
                fontSize: 'clamp(40px, 6.5vw, 80px)',
                fontWeight: 600,
                lineHeight: 1.04,
                letterSpacing: '-0.045em',
                color: '#f5f5f7',
                whiteSpace: 'pre-line',
                marginBottom: '24px',
                animation: 'fade-up 0.7s 0.1s cubic-bezier(0.16,1,0.3,1) both',
              }}
            >
              {activeMoment.headline}
            </h1>

            {/* Body */}
            <p
              style={{
                fontSize: '19px',
                fontWeight: 400,
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                color: 'rgba(245,245,247,0.72)',
                maxWidth: '440px',
                marginBottom: '36px',
                animation: 'fade-up 0.7s 0.18s cubic-bezier(0.16,1,0.3,1) both',
              }}
            >
              {activeMoment.sub}
            </p>

            {/* CTAs — Apple pill style */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '32px',
                animation: 'fade-up 0.7s 0.26s cubic-bezier(0.16,1,0.3,1) both',
              }}
            >
              <button
                id="hero-explore-phones-btn"
                onClick={onExplorePhones}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 22px',
                  borderRadius: '980px',
                  background: '#0071e3',
                  color: '#fff',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#2997ff'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#0071e3'}
              >
                Explore Devices
                <ChevronRight style={{ width: '14px', height: '14px' }} />
              </button>

              <button
                id="hero-visit-showroom-btn"
                onClick={onVisitShowroom}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 22px',
                  borderRadius: '980px',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#f5f5f7',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.16)'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'}
              >
                <MapPin style={{ width: '14px', height: '14px', color: '#d4af37' }} />
                Visit Showroom
              </button>

              <button
                id="hero-ask-whatsapp-btn"
                onClick={() => onOpenWhatsApp(`Hello Apple Guru, I'm interested in ${activeMoment.label}.`)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 0',
                  background: 'none',
                  border: 'none',
                  color: '#2997ff',
                  fontSize: '15px',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = '#60c8ff'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = '#2997ff'}
              >
                <MessageCircle style={{ width: '14px', height: '14px', color: '#4ade80' }} />
                Ask on WhatsApp
              </button>
            </div>

            {/* Location stamp */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                fontSize: '12px',
                color: 'rgba(245,245,247,0.4)',
                letterSpacing: '-0.01em',
                animation: 'fade-up 0.7s 0.34s cubic-bezier(0.16,1,0.3,1) both',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#4ade80',
                  display: 'inline-block',
                  animation: 'glow-pulse 2s ease-in-out infinite',
                  flexShrink: 0,
                }}
              />
              {activeMoment.locationNote}
            </div>
          </div>

          {/* RIGHT: Photo — Apple-clean with subtle float */}
          <div
            key={`img-${activeIndex}`}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              animation: 'scale-in 0.8s 0.1s cubic-bezier(0.16,1,0.3,1) both',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '520px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
                aspectRatio: '4/3',
                background: '#111',
              }}
            >
              <img
                src={activeMoment.image}
                alt={activeMoment.imageAlt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 8s ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.03)'}
                onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'}
              />
              {/* Subtle gradient overlay — bottom only */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                  pointerEvents: 'none',
                }}
              />
              {/* Bottom label */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '0.5px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  padding: '7px 12px',
                }}
              >
                {React.createElement(activeMoment.icon, {
                  style: { width: '13px', height: '13px', color: '#d4af37' }
                })}
                <span style={{ fontSize: '12px', color: '#f5f5f7', fontWeight: 500, letterSpacing: '-0.01em' }}>
                  {activeMoment.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom — Moment stepper */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          borderTop: '0.5px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div
          style={{
            maxWidth: '1080px',
            margin: '0 auto',
            padding: '0 22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            height: '60px',
          }}
        >
          {/* Moment tabs */}
          <div
            style={{
              display: 'flex',
              gap: '4px',
              flex: 1,
              overflowX: 'auto',
            }}
            className="scrollbar-hide"
          >
            {moments.map((m, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={m.id}
                  id={`hero-moment-tab-${idx}`}
                  onClick={() => handleSelectMoment(idx)}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    padding: '0 14px',
                    height: '44px',
                    borderRadius: '8px',
                    background: isSelected ? 'rgba(255,255,255,0.1)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: 0,
                    overflow: 'hidden',
                    transition: 'background 0.2s',
                    minWidth: '80px',
                  }}
                >
                  {/* Progress fill */}
                  {isSelected && isPlaying && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: `${progress}%`,
                        background: 'rgba(41,151,255,0.12)',
                        pointerEvents: 'none',
                        transition: 'width 0.05s linear',
                      }}
                    />
                  )}
                  {/* Top progress bar */}
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'rgba(255,255,255,0.15)',
                      }}
                    >
                      {isPlaying && (
                        <div
                          style={{
                            height: '100%',
                            width: `${progress}%`,
                            background: '#2997ff',
                            transition: 'width 0.05s linear',
                          }}
                        />
                      )}
                    </div>
                  )}
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: isSelected ? 500 : 400,
                      color: isSelected ? '#f5f5f7' : 'rgba(245,245,247,0.45)',
                      letterSpacing: '-0.01em',
                      whiteSpace: 'nowrap',
                      position: 'relative',
                      zIndex: 1,
                      transition: 'color 0.2s',
                    }}
                  >
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            <button
              id="hero-toggle-play-btn"
              onClick={() => setIsPlaying(p => !p)}
              title={isPlaying ? 'Pause' : 'Play'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(245,245,247,0.5)',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = '#f5f5f7'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,245,247,0.5)'}
            >
              {isPlaying
                ? <Pause style={{ width: '14px', height: '14px' }} />
                : <Play style={{ width: '14px', height: '14px' }} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
