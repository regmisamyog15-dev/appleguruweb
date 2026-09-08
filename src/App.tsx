import { type ReactNode, useEffect, useMemo, useState, useRef, type TouchEvent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, CircleHelp, FileText,
  MapPin, Menu, MessageCircle, Minus, Phone, Plus, Search, X, Wrench,
  Smartphone, Navigation, Clock3, RefreshCw, Pause, Play, ArrowLeft,
  Sparkles, Watch
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { blogPosts } from './data/blogPosts';
import { products, priceDisclaimer } from './data/products';
import { repairServices } from './data/repairServices';
import type { BlogPost, PageView, Product } from './types';
import iphone15Pro from '../reference/assets/iphone15-pro.png';
import iphone14Pro from '../reference/assets/iphone14-pro.png';
import iphone15ProMax from '../reference/assets/iphone15-pro-max.png';
import galaxyS24 from '../reference/assets/galaxy-s24-ultra.png';
import galaxyFold from '../reference/assets/galaxy-fold5.png';
import showroomDay from '../reference/assets/showroom-day.png';
import showroomNight from '../reference/assets/showroom-night.png';
import { Router as WouterRouter, useLocation } from 'wouter';

// ─── uploaded reference images ────────────────────────────────────────────────
// Image 1: apple-ecosystem flat lay (white devices on grey)
const imgEcosystem = '/assets/stitch/ultra_premium_photorealistic_product_campaign_featuring_the_iphone_17_pro_max..png';
// Image 3: Mac Mini
const imgMacMini = '/assets/stitch/authentic_professional_commercial_lifestyle_photography_inside_a_modern_premium.png';
// Repair
const imgRepairScene = '/assets/stitch/ultra_photorealistic_premium_smartphone_repair_workshop_scene._a_modern.png';
// Exchange
const imgExchange = '/assets/stitch/premium_photorealistic_product_campaign_comparing_two_phone_states_side_by.png';
// Samsung fold
const imgFold = '/assets/stitch/premium_photorealistic_product_photograph_of_the_samsung_galaxy_z_fold7._one.png';
// Accessories
const imgAccessory = '/assets/stitch/premium_editorial_product_photograph_of_a_modern_smartphone_accessory.png';
// Showroom interior
const imgShowroomInt = '/assets/stitch/realistic_premium_technology_retail_showroom_interior_in_chitwan_nepal_for.png';
// User photos
const imgUser1 = '/assets/user/200_1788777310239.webp';
const imgUser2 = '/assets/user/200_1788777343556.webp';
const imgUser3 = '/assets/user/200_1788777333446.webp';
const imgUser4 = '/assets/user/200_1788777354019.webp';
const imgUser5 = '/assets/user/200_1788777460813.webp';
// Logo / favicon
const logoSrc = '/images/favicon.png';

const queryClient = new QueryClient();
const whatsappNumber = '9779821552339';
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Apple+Guru,+Indra+dev+Hall,+Bharatpur+44200';

const navItems: { id: PageView; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'phones', label: 'Phones' },
  { id: 'exchange', label: 'Exchange' },
  { id: 'repair', label: 'Repair' },
  { id: 'insights', label: 'Journal' },
  { id: 'showroom', label: 'Showroom' },
];

const localImages: Record<string, string> = {
  'iphone-15-pro': iphone15Pro,
  'iphone-14-pro-max': iphone14Pro,
  'iphone-15-pro-max': iphone15ProMax,
  'galaxy-s24-ultra': galaxyS24,
  'galaxy-z-fold-6': galaxyFold,
  'iphone-16-pro-max': imgEcosystem,
  'iphone-16-pro': imgEcosystem,
  'galaxy-s25-ultra': '/assets/stitch/ultra_premium_photorealistic_product_advertisement_for_the_samsung_galaxy_s26.png',
  'galaxy-z-flip-6': imgFold,
};

function openWhatsApp(message: string) {
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

// ─── Shared primitives ─────────────────────────────────────────────────────────
function Btn({
  children, onClick, variant = 'gold', className = '', type = 'button'
}: {
  children: ReactNode; onClick?: () => void;
  variant?: 'gold' | 'outline' | 'dark'; className?: string; type?: 'button' | 'submit';
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-sans font-semibold text-[13px] tracking-wide transition-all duration-200 cursor-pointer rounded-full px-6 min-h-[44px]';
  const v = variant === 'gold'
    ? 'bg-[#c9a84c] text-[#0a0a0a] hover:bg-[#d4b560]'
    : variant === 'outline'
    ? 'border border-[rgba(255,255,255,.15)] text-[#f0ebe3] hover:border-[#c9a84c] hover:text-[#c9a84c]'
    : 'bg-[#1a1a1a] text-[#f0ebe3] border border-[#2a2a2a] hover:border-[#c9a84c]';
  return <button type={type} onClick={onClick} className={`${base} ${v} ${className}`}>{children}</button>;
}

function Logo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <img src={logoSrc} alt="Apple Guru" style={{ width: size, height: size }} className="rounded-sm" />
      <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 18, letterSpacing: '-.02em', color: '#f0ebe3' }}>
        Apple Guru
      </span>
    </div>
  );
}

function DevanagariBar() {
  return (
    <div className="deva-bar w-full border-b border-[#1a1a1a] bg-[#0a0a0a] py-2 text-center">
      चितवनको सर्वोत्तम Apple र Samsung स्टोर — Indra Dev Marga, Bharatpur
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ currentPage, onNavigate, onSearch }: {
  currentPage: PageView; onNavigate: (p: PageView) => void; onSearch: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  const go = (page: PageView) => { setOpen(false); onNavigate(page); };
  return (
    <>
      <DevanagariBar />
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{ background: scrolled ? 'rgba(10,10,10,.95)' : 'rgba(10,10,10,.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #1a1a1a' }}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-12">
          {/* Logo */}
          <button onClick={() => go('home')} aria-label="Apple Guru home">
            <Logo />
          </button>

          {/* Nav pills — desktop */}
          <nav className="hidden items-center gap-1.5 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`nav-pill ${currentPage === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onSearch}
              aria-label="Search"
              className="hidden items-center gap-2 rounded-full border border-[#222] px-4 py-2 text-[13px] text-[#8a7f72] hover:border-[#c9a84c] hover:text-[#c9a84c] md:flex transition-all"
            >
              <Search size={15} /> Search
              <kbd className="ml-1 rounded border border-[#333] px-1.5 py-0.5 text-[10px]">⌘K</kbd>
            </button>
            <a
              href="tel:9821552339"
              className="hidden items-center gap-1.5 rounded-full border border-[#222] px-4 py-2 text-[13px] text-[#8a7f72] hover:border-[#c9a84c] hover:text-[#c9a84c] md:flex transition-all"
            >
              <Phone size={14} /> Call
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="text-[#f0ebe3] md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-[#1a1a1a] bg-[#0a0a0a] px-5 pb-6 pt-3 md:hidden page-reveal">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`flex w-full items-center justify-between border-b border-[#1a1a1a] py-4 text-left text-[15px] ${currentPage === item.id ? 'text-[#c9a84c]' : 'text-[#f0ebe3]'}`}
              >
                {item.label} <ArrowUpRight size={15} className="text-[#8a7f72]" />
              </button>
            ))}
            <a href="tel:9821552339" className="mt-5 flex items-center gap-2 text-[13px] text-[#8a7f72]">
              <Phone size={14} /> +977 9821 552 339
            </a>
          </div>
        )}
      </header>
    </>
  );
}

// ─── Bottom Nav (mobile) ───────────────────────────────────────────────────────
function BottomNav() {
  return (
    <nav className="fixed bottom-0 z-40 grid h-14 w-full grid-cols-2 border-t border-[#1a1a1a] bg-[#0a0a0a]/95 backdrop-blur-md md:hidden">
      <a href="tel:9821552339" className="flex flex-col items-center justify-center gap-1 text-[#8a7f72] hover:text-[#c9a84c] transition-colors">
        <Phone size={15} />
        <span className="text-[10px] font-medium">Call Us</span>
      </a>
      <a href={mapsUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-1 text-[#8a7f72] hover:text-[#c9a84c] transition-colors">
        <Navigation size={15} />
        <span className="text-[10px] font-medium">Directions</span>
      </a>
    </nav>
  );
}

// ─── Campaign Hero ─────────────────────────────────────────────────────────────
type Campaign = {
  eyebrow: string; title: string; titleAccent: string;
  body: string; cta: string; icon: typeof Smartphone;
  media: string; action: 'phones' | 'exchange' | 'repair' | 'showroom';
};
const campaigns: Campaign[] = [
  {
    eyebrow: 'iPhone', title: 'The one you', titleAccent: 'have been waiting for.',
    body: 'Original iPhones. Genuine warranty. Expert guidance — all at one address in Chitwan.',
    cta: 'Explore iPhones', icon: Smartphone, media: imgUser1, action: 'phones'
  },
  {
    eyebrow: 'Samsung Galaxy', title: 'Fold it. Flip it.', titleAccent: 'Own it.',
    body: 'The full Galaxy range — from the ultra-slim S26 to the Fold 7 — in stock at the showroom.',
    cta: 'See Galaxy', icon: Sparkles, media: imgFold, action: 'phones'
  },
  {
    eyebrow: 'Exchange', title: 'Your old phone', titleAccent: 'still has a price.',
    body: 'Bring it in. We assess it honestly. The value comes off your next device — simple.',
    cta: 'Start exchange', icon: RefreshCw, media: imgExchange, action: 'exchange'
  },
  {
    eyebrow: 'Repair', title: 'Broken screen?', titleAccent: "We've seen worse.",
    body: 'Screen, battery, charging port — precision work by technicians who stay with the problem.',
    cta: 'Book a repair', icon: Wrench, media: imgRepairScene, action: 'repair'
  },
  {
    eyebrow: 'Accessories', title: 'Finish your', titleAccent: 'setup.',
    body: 'Watch bands, cases, earbuds, and cables. The small things that make the difference.',
    cta: 'Visit showroom', icon: Watch, media: imgUser2, action: 'showroom'
  },
];

function CampaignHero({ onNavigate }: { onNavigate: (p: PageView) => void }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(true);
  const startX = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION = 6500;
  const item = campaigns[active];

  useEffect(() => {
    if (!playing || paused) return;
    const started = Date.now();
    timer.current = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - started) / DURATION) * 100);
      setProgress(pct);
      if (pct >= 100) setActive((v) => (v + 1) % campaigns.length);
    }, 60);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [active, paused, playing]);

  const select = (i: number) => { setActive((i + campaigns.length) % campaigns.length); setProgress(0); };
  const handleTouchStart = (e: TouchEvent) => { startX.current = e.touches[0]?.clientX ?? null; };
  const handleTouchEnd = (e: TouchEvent) => {
    if (startX.current === null) return;
    const dist = (e.changedTouches[0]?.clientX ?? 0) - startX.current;
    if (Math.abs(dist) > 40) select(active + (dist < 0 ? 1 : -1));
    startX.current = null;
  };

  return (
    <section
      className="relative min-h-[min(760px,96dvh)] overflow-hidden border-b border-[#1a1a1a] grain"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background image */}
      <img
        key={`bg-${active}`}
        src={item.media}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ opacity: .38 }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/75 to-[#0a0a0a]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[min(760px,96dvh)] max-w-[1440px] flex-col justify-between px-5 pb-10 pt-14 md:px-12 md:pb-14 md:pt-20">
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <item.icon size={14} className="text-[#c9a84c]" />
          <span key={`ey-${active}`} className="page-reveal font-sans text-[12px] font-medium tracking-[.12em] uppercase text-[#c9a84c]">
            {item.eyebrow}
          </span>
        </div>

        {/* Main headline */}
        <div className="max-w-3xl">
          <h1
            key={`h-${active}`}
            className="page-reveal font-serif text-[clamp(2.8rem,7vw,6.5rem)] leading-[.95] tracking-[-0.03em] text-[#f2ede6]"
          >
            {item.title}<br />
            <span className="text-[#c9a84c]">{item.titleAccent}</span>
          </h1>
          <p
            key={`p-${active}`}
            className="page-reveal mt-6 max-w-md font-sans text-[16px] leading-7 text-[#8a7f72] md:text-[17px]"
            style={{ animationDelay: '80ms' }}
          >
            {item.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Btn onClick={() => onNavigate(item.action)} variant="gold">
              {item.cta} <ArrowRight size={15} />
            </Btn>
            <Btn onClick={() => openWhatsApp(`Hello Apple Guru. I am interested in ${item.eyebrow}.`)} variant="outline">
              <MessageCircle size={15} /> Ask us
            </Btn>
          </div>
          <div className="mt-7 flex items-center gap-2 font-sans text-[12px] text-[#4a4540]">
            <MapPin size={13} className="text-[#c9a84c]" />
            Indra Dev Marga, Bharatpur · Chitwan
          </div>
        </div>

        {/* Controls */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => select(active - 1)}
                aria-label="Previous"
                className="grid h-9 w-9 place-items-center rounded-full border border-[#2a2a2a] text-[#6a6a6a] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={() => select(active + 1)}
                aria-label="Next"
                className="grid h-9 w-9 place-items-center rounded-full border border-[#2a2a2a] text-[#6a6a6a] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
              >
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => setPlaying((v) => !v)}
                aria-label={playing ? 'Pause' : 'Play'}
                className="grid h-9 w-9 place-items-center rounded-full border border-[#2a2a2a] text-[#6a6a6a] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
              >
                {playing ? <Pause size={12} /> : <Play size={12} />}
              </button>
            </div>
            <span className="font-sans text-[11px] text-[#4a4540] tracking-wider">
              {String(active + 1).padStart(2,'0')} / {String(campaigns.length).padStart(2,'0')}
            </span>
          </div>
          {/* Progress dots */}
          <div className="flex gap-1.5">
            {campaigns.map((c, i) => (
              <button
                key={c.eyebrow}
                onClick={() => select(i)}
                aria-label={c.eyebrow}
                className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-[#2a2a2a]"
              >
                <span
                  className="absolute left-0 top-0 h-full bg-[#c9a84c] transition-all"
                  style={{ width: i === active ? `${progress}%` : i < active ? '100%' : '0%' }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Ticker Bar ────────────────────────────────────────────────────────────────
function TickerBar() {
  const items = [
    'Original Apple Devices', 'Samsung Galaxy S26', 'Galaxy Z Fold 7',
    'iPhone 17 Pro Max', 'Same-Day Repair', 'Phone Exchange',
    'Genuine Warranty', 'Chitwan\'s Tech Store', 'iPhone Air',
  ];
  const repeated = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-[#1a1a1a] bg-[#0d0d0d] py-3">
      <div className="ticker-track">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6 font-sans text-[12px] font-medium tracking-[.1em] uppercase text-[#3a3530]">
            <span className="h-1 w-1 rounded-full bg-[#c9a84c] shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Bento Grid Home ───────────────────────────────────────────────────────────
function HomeBento({ onNavigate }: { onNavigate: (p: PageView) => void }) {
  return (
    <section className="section mx-auto max-w-[1440px] px-5 md:px-12">
      {/* Section heading */}
      <div className="mb-10">
        <h2 className="font-serif text-[2.6rem] leading-[1.1] tracking-[-0.03em] text-[#f2ede6] md:text-[3.5rem]">
          Everything you need.<br />
          <span className="text-[#c9a84c]">One place.</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:grid-rows-2">
        {/* Large tile — Phones */}
        <button
          onClick={() => onNavigate('phones')}
          className="group relative col-span-2 row-span-2 overflow-hidden rounded-2xl bg-[#111] border border-[#1e1e1e] text-left min-h-[320px] md:min-h-[440px] card-lift"
        >
          <img src={imgUser1} alt="iPhone collection" className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <span className="font-sans text-[11px] font-medium tracking-[.1em] uppercase text-[#c9a84c]">Phones</span>
            <h3 className="mt-2 font-serif text-[1.8rem] leading-tight text-[#f2ede6]">Latest iPhones & Galaxy</h3>
            <span className="mt-3 inline-flex items-center gap-1.5 font-sans text-[12px] text-[#8a7f72] group-hover:text-[#c9a84c] transition-colors">
              Explore collection <ArrowRight size={13} />
            </span>
          </div>
        </button>

        {/* Exchange */}
        <button
          onClick={() => onNavigate('exchange')}
          className="group relative overflow-hidden rounded-2xl bg-[#111] border border-[#1e1e1e] text-left min-h-[160px] md:min-h-[214px] card-lift"
        >
          <img src={imgExchange} alt="Phone exchange" className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 to-transparent" />
          <div className="absolute bottom-4 left-4 z-10">
            <RefreshCw size={16} className="text-[#c9a84c] mb-2" />
            <h3 className="font-sans text-[15px] font-semibold text-[#f0ebe3]">Exchange</h3>
          </div>
        </button>

        {/* Repair */}
        <button
          onClick={() => onNavigate('repair')}
          className="group relative overflow-hidden rounded-2xl bg-[#111] border border-[#1e1e1e] text-left min-h-[160px] md:min-h-[214px] card-lift"
        >
          <img src={imgRepairScene} alt="Phone repair" className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 to-transparent" />
          <div className="absolute bottom-4 left-4 z-10">
            <Wrench size={16} className="text-[#c9a84c] mb-2" />
            <h3 className="font-sans text-[15px] font-semibold text-[#f0ebe3]">Repair</h3>
          </div>
        </button>

        {/* Accessories */}
        <button
          onClick={() => onNavigate('phones')}
          className="group relative overflow-hidden rounded-2xl bg-[#111] border border-[#1e1e1e] text-left min-h-[160px] md:min-h-[214px] card-lift"
        >
          <img src={imgAccessory} alt="Accessories" className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 to-transparent" />
          <div className="absolute bottom-4 left-4 z-10">
            <Watch size={16} className="text-[#c9a84c] mb-2" />
            <h3 className="font-sans text-[15px] font-semibold text-[#f0ebe3]">Accessories</h3>
          </div>
        </button>

        {/* Showroom */}
        <button
          onClick={() => onNavigate('showroom')}
          className="group relative overflow-hidden rounded-2xl bg-[#111] border border-[#1e1e1e] text-left min-h-[160px] md:min-h-[214px] card-lift"
        >
          <img src={imgShowroomInt} alt="Showroom" className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 to-transparent" />
          <div className="absolute bottom-4 left-4 z-10">
            <MapPin size={16} className="text-[#c9a84c] mb-2" />
            <h3 className="font-sans text-[15px] font-semibold text-[#f0ebe3]">Showroom</h3>
          </div>
        </button>
      </div>
    </section>
  );
}

// ─── User Gallery Strip ────────────────────────────────────────────────────────
function GalleryStrip() {
  const imgs = [imgUser1, imgUser2, imgUser3, imgUser4, imgUser5, imgUser1, imgUser2];
  return (
    <section className="section mx-auto max-w-[1440px] px-5 md:px-12">
      <div className="mb-8">
        <h2 className="font-serif text-[2.2rem] leading-[1.1] tracking-[-0.03em] text-[#f2ede6]">
          Real devices.<br /><span className="text-[#c9a84c]">Real people.</span>
        </h2>
        <p className="mt-3 font-sans text-[15px] text-[#6a6560] max-w-md">
          Every device at Apple Guru is genuine, warrantied, and tested before it reaches you.
        </p>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {imgs.map((src, i) => (
          <div key={i} className="flex-shrink-0 w-44 h-56 md:w-56 md:h-72 rounded-xl overflow-hidden">
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Showroom Feature ──────────────────────────────────────────────────────────
function ShowroomFeature() {
  return (
    <section className="section border-y border-[#1a1a1a] bg-[#0d0d0d]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 md:flex-row md:items-center md:px-12">
        <div className="w-full md:w-1/2">
          <span className="font-sans text-[12px] font-medium tracking-[.1em] uppercase text-[#c9a84c]">Chitwan · Nepal</span>
          <h2 className="mt-4 font-serif text-[2.6rem] leading-[1.1] tracking-[-0.03em] text-[#f2ede6] md:text-[3.2rem]">
            One original<br />showroom.
          </h2>
          <p className="mt-5 max-w-md font-sans text-[16px] leading-7 text-[#6a6560]">
            Visit Apple Guru on Indra Dev Marga. Hold the devices. Ask real questions. Leave with confidence about what you bought.
          </p>
          <div className="mt-8 grid max-w-xs grid-cols-2 gap-6 border-t border-[#1a1a1a] pt-6">
            <div>
              <p className="font-serif text-[2.4rem] text-[#f2ede6]">3+</p>
              <p className="mt-1 font-sans text-[12px] text-[#6a6560]">Years of experience</p>
            </div>
            <div>
              <p className="font-serif text-[2.4rem] text-[#f2ede6]">10k+</p>
              <p className="mt-1 font-sans text-[12px] text-[#6a6560]">Happy customers</p>
            </div>
          </div>
          <div className="mt-7 flex gap-3">
            <Btn onClick={() => openWhatsApp('Hello Apple Guru. I am planning to visit the Chitwan showroom.')} variant="gold">
              Plan a visit <MessageCircle size={14} />
            </Btn>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] px-5 py-2.5 font-sans text-[13px] font-semibold text-[#8a7f72] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
            >
              <Navigation size={14} /> Directions
            </a>
          </div>
        </div>
        <div className="relative w-full md:w-1/2">
          <img
            src={showroomDay}
            alt="Apple Guru showroom at Indra Dev Marga"
            className="h-[300px] w-full rounded-2xl object-cover md:h-[420px]"
          />
          <div
            className="glass absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl p-4"
          >
            <div>
              <p className="font-sans text-[11px] text-[#c9a84c] tracking-[.08em] uppercase">Location</p>
              <p className="mt-0.5 font-sans text-[13px] text-[#8a7f72]">Indra Dev Marga, Chitwan</p>
            </div>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="text-[#c9a84c] hover:text-[#d4b560]">
              <Navigation size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Product Image ─────────────────────────────────────────────────────────────
function imageFor(product: Product) {
  return localImages[product.id] ?? product.image;
}
function ProductImage({ product, className = '' }: { product: Product; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#111] ${className}`}>
      <img
        src={imageFor(product)}
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
    </div>
  );
}

// ─── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product, onSelect, onWhatsApp }: {
  product: Product; onSelect: (p: Product) => void; onWhatsApp: (m: string) => void;
}) {
  return (
    <article className="group product-card rounded-2xl overflow-hidden">
      <button onClick={() => onSelect(product)} className="block w-full text-left">
        <ProductImage product={product} className="h-52 md:h-60" />
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-sans text-[16px] font-semibold text-[#f0ebe3]">{product.name}</h3>
              <p className="mt-0.5 font-sans text-[12px] text-[#c9a84c]">{product.editorialHighlight || product.brand}</p>
            </div>
            <ArrowUpRight size={16} className="text-[#c9a84c] mt-1 shrink-0" />
          </div>
          <p className="mt-3 font-sans text-[14px] leading-6 text-[#6a6560]">{product.tagline}</p>
          <p className="mt-4 font-sans text-[14px] font-semibold text-[#f0ebe3]">{product.priceRange}</p>
        </div>
      </button>
      <div className="border-t border-[#1e1e1e] px-5 py-3">
        <button
          onClick={() => onWhatsApp(`Hello Apple Guru. I would like to check ${product.name} at the Chitwan showroom.`)}
          className="flex w-full items-center justify-center gap-2 font-sans text-[12px] font-semibold text-[#c9a84c] hover:text-[#d4b560] transition-colors py-1"
        >
          <MessageCircle size={13} /> Enquire on WhatsApp
        </button>
      </div>
    </article>
  );
}

// ─── Product Catalog ───────────────────────────────────────────────────────────
function ProductCatalog({ onSelect, onWhatsApp }: {
  onSelect: (p: Product) => void; onWhatsApp: (m: string) => void;
}) {
  const [filter, setFilter] = useState('Apple');
  const filters = ['Apple', 'Samsung', 'Trending', 'Other devices'];
  const filtered = filter === 'Apple'
    ? products.filter((p) => p.brand === 'Apple')
    : filter === 'Samsung'
    ? products.filter((p) => p.brand === 'Samsung')
    : filter === 'Trending'
    ? products.filter((p) => p.featured)
    : products.filter((p) => p.category === 'Mac' || p.category === 'Audio & Wearables');

  const headings: Record<string, string> = {
    Apple: 'Apple collection',
    Samsung: 'Samsung collection',
    Trending: 'Trending now',
    'Other devices': 'Mac, Watch & Audio',
  };

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-12 md:pt-16">
      {/* Filter chips */}
      <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-chip ${filter === f ? 'active' : ''}`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="mb-8 flex items-end justify-between border-b border-[#1a1a1a] pb-5">
        <h1 className="font-serif text-[2rem] tracking-[-0.03em] text-[#f2ede6] md:text-[2.8rem]">
          {headings[filter]}
        </h1>
        <span className="font-sans text-[12px] text-[#4a4540]">{filtered.length} devices</span>
      </div>
      {filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={onSelect} onWhatsApp={onWhatsApp} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#1e1e1e] p-12 text-center font-sans text-[#4a4540]">
          Nothing here yet.
        </div>
      )}
      <p className="mt-8 font-sans text-[12px] italic text-center text-[#4a4540]">{priceDisclaimer}</p>
    </section>
  );
}

// ─── Exchange Page ─────────────────────────────────────────────────────────────
function ExchangePage({ onWhatsApp, targetProduct, clearTarget }: {
  onWhatsApp: (m: string) => void; targetProduct: Product | null; clearTarget: () => void;
}) {
  const models = [
    'iPhone 17 Pro Max', 'iPhone Air', 'iPhone 15 Pro Max', 'iPhone 15 Pro',
    'iPhone 15', 'iPhone 14 Pro Max', 'iPhone 14', 'iPhone 13 Pro Max',
    'Galaxy S26', 'Galaxy S24 Ultra', 'Galaxy S23 Ultra', 'Galaxy Z Fold 7',
    'Galaxy Z Fold 5', 'Other flagship / Android'
  ];
  const conditions = [
    { label: 'Like new — no scratches', multiplier: 1 },
    { label: 'Good — light wear', multiplier: .88 },
    { label: 'Cracked glass, works fine', multiplier: .65 },
    { label: 'Heavy wear or issues', multiplier: .45 },
  ];
  const [model, setModel] = useState(models[0]);
  const [condition, setCondition] = useState(conditions[0]);

  const base = model.includes('17 Pro Max') ? [145000, 175000] : model.includes('Air') ? [100000, 125000] : model.includes('15 Pro Max') ? [110000, 135000] : model.includes('15 Pro') ? [95000, 115000] : model.includes('15') ? [75000, 90000] : model.includes('14 Pro Max') ? [85000, 105000] : model.includes('14') ? [60000, 72000] : model.includes('13') ? [65000, 80000] : model.includes('S26') ? [115000, 145000] : model.includes('S24') ? [95000, 120000] : model.includes('S23') ? [70000, 88000] : model.includes('Fold') ? [85000, 110000] : [20000, 45000];
  const low = Math.round(base[0] * condition.multiplier / 1000) * 1000;
  const high = Math.round(base[1] * condition.multiplier / 1000) * 1000;

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-12 md:pt-16">
      <div className="max-w-2xl">
        <span className="font-sans text-[12px] font-medium tracking-[.1em] uppercase text-[#c9a84c]">Phone Exchange</span>
        <h1 className="mt-4 font-serif text-[3rem] leading-[1.05] tracking-[-0.03em] text-[#f2ede6] md:text-[5rem]">
          Trade in.<br /><span className="text-[#c9a84c]">Level up.</span>
        </h1>
        <p className="mt-5 font-sans text-[16px] leading-7 text-[#6a6560]">
          Exchange your current phone for a new device. The value of your old phone comes off the price of your new one.
        </p>
      </div>

      {/* Steps */}
      <div className="mt-14 grid gap-3 md:grid-cols-3">
        {[
          ['Bring your phone', 'Walk in with your current device — any condition welcome.'],
          ['We assess it', 'Our team evaluates condition, battery health, and resale value honestly.'],
          ['Upgrade & save', 'The agreed exchange value is deducted from your new device.'],
        ].map(([title, body], i) => (
          <div key={title} className="rounded-2xl border border-[#1e1e1e] bg-[#0d0d0d] p-6">
            <span className="font-sans text-[11px] text-[#c9a84c] font-medium tracking-[.1em] uppercase">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-5 font-serif text-[1.2rem] text-[#f2ede6]">{title}</h3>
            <p className="mt-2 font-sans text-[14px] leading-6 text-[#6a6560]">{body}</p>
          </div>
        ))}
      </div>

      {/* Estimator */}
      <div className="mt-12 grid gap-6 rounded-2xl border border-[#1e1e1e] bg-[#0d0d0d] p-6 md:grid-cols-2 md:p-10">
        <div>
          <h2 className="font-serif text-[1.5rem] text-[#f2ede6]">Value estimator</h2>
          <p className="mt-2 font-sans text-[13px] text-[#6a6560]">A rough guide. Final value assessed in store.</p>
          <label className="mt-7 block font-sans text-[13px] font-semibold text-[#8a7f72]">Your current device</label>
          <div className="relative mt-2">
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-[#2a2a2a] bg-[#111] px-4 pr-10 font-sans text-[14px] text-[#f0ebe3] outline-none focus:border-[#c9a84c] transition-all"
            >
              {models.map((m) => <option key={m}>{m}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-3.5 text-[#6a6560]" size={16} />
          </div>
          <label className="mt-6 block font-sans text-[13px] font-semibold text-[#8a7f72]">Condition</label>
          <div className="mt-2 space-y-2">
            {conditions.map((c) => (
              <button
                key={c.label}
                onClick={() => setCondition(c)}
                className={`condition-btn w-full ${condition.label === c.label ? 'selected' : ''}`}
              >
                {c.label}
                {condition.label === c.label && <Check size={15} className="text-[#c9a84c] shrink-0" />}
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-[#1e1e1e] pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          <h3 className="font-sans text-[13px] font-medium text-[#6a6560]">Working estimate</h3>
          <p className="mt-5 font-serif text-[2.6rem] leading-[1.1] text-[#f2ede6]">
            Rs. {low.toLocaleString()}
          </p>
          <p className="font-serif text-[2.6rem] leading-[1.1] text-[#c9a84c]">
            – Rs. {high.toLocaleString()}
          </p>
          <p className="mt-4 font-sans text-[13px] leading-6 text-[#6a6560]">
            Bring your device, its original box if you have it, and any cables. Our team does the rest.
          </p>
          <div className="mt-6 rounded-xl border border-[#1e1e1e] bg-[#111] p-4 font-sans text-[13px] text-[#6a6560]">
            <CircleHelp size={14} className="mr-2 inline text-[#c9a84c]" />
            Original parts and an unaltered serial pairing can add up to 25% more value.
          </div>
          {targetProduct && (
            <div className="mt-5 rounded-xl border border-[#c9a84c]/30 bg-[#c9a84c]/05 p-4">
              <p className="font-sans text-[11px] text-[#c9a84c] font-medium tracking-[.08em] uppercase">In mind</p>
              <p className="mt-1 font-sans text-[14px] font-semibold text-[#f0ebe3]">{targetProduct.name}</p>
              <button onClick={clearTarget} className="mt-2 font-sans text-[12px] text-[#6a6560] underline">Clear</button>
            </div>
          )}
          <Btn
            className="mt-7 w-full justify-center"
            variant="gold"
            onClick={() => onWhatsApp(`Hello Apple Guru. I want an exchange assessment for my ${model} in "${condition.label}" condition.`)}
          >
            Ask for assessment <MessageCircle size={14} />
          </Btn>
        </div>
      </div>
    </section>
  );
}

// ─── Repair Page ───────────────────────────────────────────────────────────────
function RepairPage({ onWhatsApp }: { onWhatsApp: (m: string) => void }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-12 md:pt-16">
      <div className="max-w-2xl">
        <span className="font-sans text-[12px] font-medium tracking-[.1em] uppercase text-[#c9a84c]">Repair</span>
        <h1 className="mt-4 font-serif text-[3rem] leading-[1.05] tracking-[-0.03em] text-[#f2ede6] md:text-[5rem]">
          Repair with<br /><span className="text-[#c9a84c]">a clear plan.</span>
        </h1>
        <p className="mt-5 font-sans text-[16px] leading-7 text-[#6a6560]">
          Diagnosis first, honest options second, precision work third. We don't guess.
        </p>
        <Btn className="mt-7" onClick={() => onWhatsApp('Hello Apple Guru. I want to book a repair.')} variant="gold">
          Book a repair <ArrowRight size={15} />
        </Btn>
      </div>

      {/* Repair hero image */}
      <div className="mt-10 overflow-hidden rounded-2xl">
        <img src={imgRepairScene} alt="Apple Guru repair lab" className="h-[280px] w-full object-cover md:h-[400px]" />
      </div>

      {/* Quick enquiry bar */}
      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#1e1e1e] bg-[#0d0d0d] p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <h2 className="font-serif text-[1.4rem] text-[#f2ede6]">Not sure if it can be repaired?</h2>
          <p className="mt-2 font-sans text-[14px] leading-6 text-[#6a6560]">
            Send a photo and describe the problem on WhatsApp. We'll tell you what's possible and what it'll cost.
          </p>
        </div>
        <Btn onClick={() => onWhatsApp('Hello Apple Guru repair desk. I want to know if my device is repairable. I can send photos.')} variant="gold" className="shrink-0">
          <MessageCircle size={14} /> WhatsApp us
        </Btn>
      </div>

      {/* Services grid */}
      <div className="mt-12">
        <h2 className="font-serif text-[1.8rem] tracking-[-0.02em] text-[#f2ede6] mb-6">What we repair</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {repairServices.slice(0, 6).map((service) => (
            <article key={service.id} className="rounded-2xl border border-[#1e1e1e] bg-[#0d0d0d] p-6">
              <Wrench size={18} className="text-[#c9a84c]" />
              <h3 className="mt-5 font-serif text-[1.1rem] text-[#f2ede6]">{service.title}</h3>
              <p className="mt-2 font-sans text-[13px] leading-6 text-[#6a6560]">{service.shortDesc}</p>
              <button
                onClick={() => setOpen(open === service.id ? null : service.id)}
                className="mt-5 flex items-center gap-1.5 font-sans text-[12px] font-semibold text-[#c9a84c] hover:text-[#d4b560] transition-colors"
              >
                {open === service.id ? <Minus size={13} /> : <Plus size={13} />}
                {open === service.id ? 'Hide' : 'Common signs'}
              </button>
              {open === service.id && (
                <div className="mt-4 border-t border-[#1e1e1e] pt-4 page-reveal">
                  <ul className="space-y-1.5 font-sans text-[13px] text-[#6a6560]">
                    {service.symptoms.slice(0, 4).map((s) => <li key={s}>— {s}</li>)}
                  </ul>
                  <button
                    onClick={() => onWhatsApp(`Hello Apple Guru repair desk. I want to ask about: ${service.title}.`)}
                    className="mt-4 font-sans text-[12px] text-[#c9a84c] underline"
                  >
                    Ask about this repair
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Process steps */}
      <div className="mt-12 border-t border-[#1a1a1a] pt-12">
        <h2 className="font-serif text-[1.5rem] text-[#f2ede6] mb-6">The process</h2>
        <div className="flex flex-wrap gap-2">
          {['Bring device', 'Inspection', 'Assessment', 'Repair', 'Collect'].map((step, i) => (
            <div key={step} className="flex items-center gap-3 rounded-full border border-[#1e1e1e] bg-[#0d0d0d] px-5 py-3 font-sans text-[13px] text-[#f0ebe3]">
              <span className="text-[#c9a84c] font-medium">{String(i + 1).padStart(2, '0')}</span>
              {step}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Showroom Page ─────────────────────────────────────────────────────────────
function ShowroomPage({ onWhatsApp }: { onWhatsApp: (m: string) => void }) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-12 md:pt-16">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="font-sans text-[12px] font-medium tracking-[.1em] uppercase text-[#c9a84c]">Our Showroom</span>
          <h1 className="mt-4 font-serif text-[3rem] leading-[1.05] tracking-[-0.03em] text-[#f2ede6] md:text-[4.5rem]">
            One original<br /><span className="text-[#c9a84c]">showroom.</span>
          </h1>
          <p className="mt-5 max-w-md font-sans text-[16px] leading-7 text-[#6a6560]">
            Come to Indra Dev Marga. Hold the phones side by side. Talk to someone who uses this stuff every day.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { icon: MapPin, text: 'Indra Dev Marga, Bharatpur 44200, Chitwan' },
              { icon: Clock3, text: 'Call ahead for a specific configuration or visit anytime.' },
              { icon: Phone, text: '+977 9821 552 339', href: 'tel:9821552339' },
            ].map(({ icon: Icon, text, href }) => (
              <div key={text} className="flex items-center gap-3 font-sans text-[14px] text-[#6a6560]">
                <Icon size={16} className="text-[#c9a84c] shrink-0" />
                {href ? <a href={href} className="underline hover:text-[#c9a84c]">{text}</a> : text}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn onClick={() => onWhatsApp('Hello Apple Guru. I am planning to visit the Chitwan showroom.')} variant="gold">
              Plan a visit <MessageCircle size={14} />
            </Btn>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] px-5 py-2.5 font-sans text-[13px] font-semibold text-[#8a7f72] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
            >
              <Navigation size={14} /> Get directions
            </a>
          </div>
        </div>
        <div>
          <img src={showroomNight} alt="Apple Guru showroom" className="h-[360px] w-full rounded-2xl object-cover md:h-[500px]" />
        </div>
      </div>

      {/* Showroom gallery */}
      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[imgShowroomInt, imgUser3, imgUser4, imgUser5].map((src, i) => (
          <div key={i} className="overflow-hidden rounded-xl">
            <img src={src} alt="" className="h-44 w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Journal Page ──────────────────────────────────────────────────────────────
function JournalPage({ onSelect }: { onSelect: (post: BlogPost) => void }) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-12 md:pt-16">
      <span className="font-sans text-[12px] font-medium tracking-[.1em] uppercase text-[#c9a84c]">Journal</span>
      <h1 className="mt-4 font-serif text-[3rem] leading-[1.05] tracking-[-0.03em] text-[#f2ede6] md:text-[5rem]">
        Useful things<br /><span className="text-[#c9a84c]">to know.</span>
      </h1>
      <div className="mt-12">
        {blogPosts.map((post, i) => (
          <button
            key={post.id}
            onClick={() => onSelect(post)}
            className="group grid w-full gap-4 border-t border-[#1a1a1a] py-8 text-left md:grid-cols-[60px_1fr_140px]"
          >
            <span className="font-sans text-[12px] font-medium text-[#c9a84c]">0{i + 1}</span>
            <span>
              <span className="font-sans text-[11px] font-medium tracking-[.08em] uppercase text-[#4a4540]">
                {post.category} · {post.readTime}
              </span>
              <strong className="mt-3 block max-w-3xl font-serif text-[1.3rem] leading-tight text-[#f2ede6] group-hover:text-[#c9a84c] transition-colors md:text-[1.8rem]">
                {post.title}
              </strong>
              <span className="mt-3 block max-w-2xl font-sans text-[14px] leading-6 text-[#6a6560]">{post.excerpt}</span>
            </span>
            <span className="flex items-center gap-1.5 font-sans text-[11px] font-medium text-[#4a4540] group-hover:text-[#c9a84c] transition-colors md:justify-end">
              Read <ArrowUpRight size={13} />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer({ onNavigate }: { onNavigate: (p: PageView) => void }) {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#0a0a0a] px-5 pb-24 pt-16 md:px-12 md:pb-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-5 max-w-sm font-sans text-[14px] leading-7 text-[#4a4540]">
              Apple Guru is Chitwan's home for original Apple and Samsung devices, genuine repair, and honest advice.
            </p>
            <div className="mt-5 deva-bar text-left" style={{ color: 'rgba(201,168,76,.5)', fontSize: 13 }}>
              चितवनको भरोसेमान्द टेक स्टोर
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-sans text-[12px] font-semibold tracking-[.08em] uppercase text-[#f0ebe3]">Services</span>
            {[['Phones', 'phones'], ['Exchange', 'exchange'], ['Repair', 'repair']].map(([label, page]) => (
              <button key={page} onClick={() => onNavigate(page as PageView)} className="text-left font-sans text-[14px] text-[#4a4540] hover:text-[#c9a84c] transition-colors">
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-sans text-[12px] font-semibold tracking-[.08em] uppercase text-[#f0ebe3]">Company</span>
            <button onClick={() => onNavigate('insights')} className="text-left font-sans text-[14px] text-[#4a4540] hover:text-[#c9a84c] transition-colors">Journal</button>
            <button onClick={() => onNavigate('showroom')} className="text-left font-sans text-[14px] text-[#4a4540] hover:text-[#c9a84c] transition-colors">Showroom</button>
            <a href="tel:9821552339" className="font-sans text-[14px] text-[#4a4540] hover:text-[#c9a84c] transition-colors">Contact</a>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="font-sans text-[14px] text-[#4a4540] hover:text-[#c9a84c] transition-colors">Directions</a>
          </div>
        </div>
        <div className="gold-line mt-10" />
        <p className="mt-6 font-sans text-[12px] text-[#2a2a2a] text-center">
          © {new Date().getFullYear()} Apple Guru, Chitwan, Nepal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── Product Modal ─────────────────────────────────────────────────────────────
function ProductModal({ product, onClose, onWhatsApp, onExchange, onNavigate }: {
  product: Product | null; onClose: () => void; onWhatsApp: (m: string) => void;
  onExchange: (p: Product) => void; onNavigate: (p: PageView) => void;
}) {
  if (!product) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/85 p-4 backdrop-blur-sm"
      role="dialog" aria-modal="true" onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#1e1e1e] bg-[#0d0d0d]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#1a1a1a] p-5">
          <span className="font-sans text-[12px] font-medium tracking-[.08em] uppercase text-[#c9a84c]">{product.brand}</span>
          <button onClick={onClose} className="text-[#6a6560] hover:text-[#f0ebe3] transition-colors" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="grid md:grid-cols-2">
          <div className="p-6">
            <ProductImage product={product} className="aspect-square rounded-xl" />
          </div>
          <div className="p-6">
            <h2 className="font-serif text-[2rem] tracking-[-0.02em] text-[#f2ede6] md:text-[2.8rem]">{product.name}</h2>
            <p className="mt-2 font-sans text-[14px] text-[#c9a84c]">{product.tagline}</p>
            <div className="my-6 border-y border-[#1a1a1a] py-5">
              <p className="font-sans text-[12px] text-[#6a6560]">Guide price</p>
              <p className="mt-1 font-serif text-[1.5rem] text-[#f2ede6]">{product.priceRange}</p>
              <p className="mt-1 font-sans text-[12px] text-[#4a4540]">{priceDisclaimer}</p>
            </div>
            <p className="font-sans text-[14px] leading-7 text-[#6a6560]">{product.description}</p>
            <ul className="mt-5 space-y-2 border-t border-[#1a1a1a] pt-5">
              {product.keySpecs.slice(0, 4).map((spec) => (
                <li key={spec} className="flex items-start gap-2 font-sans text-[13px] text-[#6a6560]">
                  <Check size={14} className="text-[#c9a84c] mt-0.5 shrink-0" /> {spec}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-2">
              <Btn variant="gold" onClick={() => onWhatsApp(`Hello Apple Guru. Please confirm stock and pricing for ${product.name}.`)}>
                <MessageCircle size={14} /> Ask availability
              </Btn>
              <Btn variant="outline" onClick={() => onExchange(product)}>
                Exchange toward this <ArrowRight size={14} />
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Journal Modal ─────────────────────────────────────────────────────────────
function JournalModal({ post, onClose }: { post: BlogPost | null; onClose: () => void }) {
  if (!post) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/85 p-4 backdrop-blur-sm"
      role="dialog" aria-modal="true" onClick={onClose}
    >
      <article
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#1e1e1e] bg-[#0d0d0d] p-7 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <span className="font-sans text-[12px] font-medium tracking-[.08em] uppercase text-[#c9a84c]">
            {post.category} · {post.readTime}
          </span>
          <button onClick={onClose} className="text-[#6a6560] hover:text-[#f0ebe3] transition-colors"><X size={17} /></button>
        </div>
        <h2 className="mt-7 font-serif text-[2rem] leading-tight tracking-[-0.02em] text-[#f2ede6] md:text-[2.6rem]">{post.title}</h2>
        <p className="mt-5 border-l-2 border-[#c9a84c] pl-4 font-sans text-[14px] leading-7 text-[#6a6560]">{post.keyTakeaway}</p>
        <div className="mt-7 space-y-5">
          {post.content.map((p) => (
            <p key={p} className="font-sans text-[15px] leading-8 text-[#6a6560]">{p}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

// ─── Search Dialog ─────────────────────────────────────────────────────────────
function SearchDialog({ open, onClose, onProduct, onPost }: {
  open: boolean; onClose: () => void;
  onProduct: (p: Product) => void; onPost: (p: BlogPost) => void;
}) {
  const [query, setQuery] = useState('');
  useEffect(() => { if (!open) setQuery(''); }, [open]);
  if (!open) return null;
  const term = query.toLowerCase().trim();
  const ps = products.filter((p) => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(term)).slice(0, 5);
  const posts = blogPosts.filter((p) => `${p.title} ${p.category}`.toLowerCase().includes(term)).slice(0, 3);
  return (
    <div
      className="fixed inset-0 z-50 bg-[#0a0a0a]/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-auto mt-[8vh] max-w-2xl overflow-hidden rounded-2xl border border-[#1e1e1e] bg-[#0d0d0d]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[#1a1a1a] px-5 py-4">
          <Search size={17} className="text-[#c9a84c] shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search devices, notes..."
            className="min-h-10 flex-1 bg-transparent font-sans text-[15px] text-[#f0ebe3] outline-none placeholder:text-[#4a4540]"
          />
          <button onClick={onClose} className="text-[#6a6560] hover:text-[#f0ebe3]"><X size={17} /></button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {ps.length > 0 && (
            <div>
              <p className="mb-3 font-sans text-[11px] font-medium tracking-[.08em] uppercase text-[#c9a84c]">Devices</p>
              {ps.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { onClose(); onProduct(p); }}
                  className="flex w-full items-center justify-between border-b border-[#1a1a1a] py-3 text-left hover:bg-[#111] px-2 rounded transition-colors"
                >
                  <span>
                    <b className="block font-sans text-[14px] font-semibold text-[#f0ebe3]">{p.name}</b>
                    <small className="font-sans text-[12px] text-[#6a6560]">{p.brand} · {p.priceRange}</small>
                  </span>
                  <ArrowUpRight size={14} className="text-[#c9a84c]" />
                </button>
              ))}
            </div>
          )}
          {posts.length > 0 && (
            <div className="mt-5">
              <p className="mb-3 font-sans text-[11px] font-medium tracking-[.08em] uppercase text-[#c9a84c]">Journal</p>
              {posts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { onClose(); onPost(p); }}
                  className="flex w-full items-center justify-between border-b border-[#1a1a1a] py-3 text-left hover:bg-[#111] px-2 rounded transition-colors"
                >
                  <span>
                    <b className="block font-sans text-[14px] font-semibold text-[#f0ebe3]">{p.title}</b>
                    <small className="font-sans text-[12px] text-[#6a6560]">{p.category}</small>
                  </span>
                  <ArrowUpRight size={14} className="text-[#c9a84c]" />
                </button>
              ))}
            </div>
          )}
          {!ps.length && !posts.length && (
            <div className="py-14 text-center">
              <FileText size={24} className="mx-auto text-[#c9a84c]" />
              <p className="mt-4 font-sans text-[14px] text-[#6a6560]">Nothing matched that search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────────────
function HomePage({ onNavigate, onWhatsApp }: {
  onNavigate: (p: PageView) => void;
  onWhatsApp: (m: string) => void;
}) {
  return (
    <>
      <CampaignHero onNavigate={onNavigate} />
      <TickerBar />
      <HomeBento onNavigate={onNavigate} />
      <ShowroomFeature />
      <GalleryStrip />
      <Footer onNavigate={onNavigate} />
    </>
  );
}

// ─── App shell ─────────────────────────────────────────────────────────────────
function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [targetProduct, setTargetProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [location, setLocation] = useLocation();

  const pathPage = location.replace(/^\/+/, '') as PageView;
  useEffect(() => {
    if (['home', 'phones', 'exchange', 'repair', 'showroom', 'insights', 'facts', 'location'].includes(pathPage))
      setCurrentPage(pathPage || 'home');
  }, [pathPage]);

  useEffect(() => {
    const titles: Record<string, string> = {
      home: 'Apple Guru · Chitwan\'s Tech Store',
      phones: 'Phones · Apple Guru',
      exchange: 'Exchange · Apple Guru',
      repair: 'Repair · Apple Guru',
      showroom: 'Showroom · Apple Guru',
      insights: 'Journal · Apple Guru',
    };
    document.title = titles[currentPage] ?? titles.home;
  }, [currentPage]);

  const navigate = (page: PageView) => {
    setCurrentPage(page);
    setLocation(page === 'home' ? '/' : `/${page}`);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearchOpen(true); }
      if (e.key === 'Escape') { setSearchOpen(false); setSelectedProduct(null); setSelectedPost(null); }
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, []);

  const page = useMemo(() => {
    if (currentPage === 'phones') return <ProductCatalog onSelect={setSelectedProduct} onWhatsApp={openWhatsApp} />;
    if (currentPage === 'exchange') return <ExchangePage onWhatsApp={openWhatsApp} targetProduct={targetProduct} clearTarget={() => setTargetProduct(null)} />;
    if (currentPage === 'repair') return <RepairPage onWhatsApp={openWhatsApp} />;
    if (currentPage === 'showroom' || currentPage === 'location') return <ShowroomPage onWhatsApp={openWhatsApp} />;
    if (currentPage === 'insights' || currentPage === 'facts') return <JournalPage onSelect={setSelectedPost} />;
    return <HomePage onNavigate={navigate} onWhatsApp={openWhatsApp} />;
  }, [currentPage, targetProduct]);

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] text-[#f0ebe3]">
      <Header currentPage={currentPage} onNavigate={navigate} onSearch={() => setSearchOpen(true)} />
      <main className="page-reveal">{page}</main>
      {currentPage !== 'home' && <Footer onNavigate={navigate} />}
      <BottomNav />
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onWhatsApp={openWhatsApp}
        onExchange={(p) => { setSelectedProduct(null); setTargetProduct(p); navigate('exchange'); }}
        onNavigate={navigate}
      />
      <JournalModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onProduct={setSelectedProduct}
        onPost={setSelectedPost}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base="">
          <ErrorBoundary>
            <AppContent />
          </ErrorBoundary>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
