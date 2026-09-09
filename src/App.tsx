import {
  type ReactNode, useEffect, useMemo, useState, useRef, type TouchEvent
} from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowRight, ArrowUpRight, ArrowLeft, Check, ChevronDown, CircleHelp,
  FileText, MapPin, Menu, MessageCircle, Minus, Phone, Plus, Search,
  X, Wrench, Smartphone, Navigation, Clock3, RefreshCw, Pause, Play,
  Sparkles, Watch
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { blogPosts } from './data/blogPosts';
import { products, priceDisclaimer } from './data/products';
import { repairServices } from './data/repairServices';
import type { BlogPost, PageView, Product } from './types';
import iphone15Pro    from '../reference/assets/iphone15-pro.png';
import iphone14Pro    from '../reference/assets/iphone14-pro.png';
import iphone15ProMax from '../reference/assets/iphone15-pro-max.png';
import galaxyS24      from '../reference/assets/galaxy-s24-ultra.png';
import galaxyFold     from '../reference/assets/galaxy-fold5.png';
import showroomDay    from '../reference/assets/showroom-day.png';
import showroomNight  from '../reference/assets/showroom-night.png';
import { Router as WouterRouter, useLocation } from 'wouter';

// ── Reference stitch assets ─────────────────────────────────────────────────
const imgHero1    = '/assets/stitch/ultra_premium_photorealistic_product_campaign_featuring_the_iphone_17_pro_max..png';
const imgHero2    = '/assets/stitch/ultra_premium_photorealistic_product_advertisement_for_the_samsung_galaxy_s26.png';
const imgHero3    = '/assets/stitch/premium_photorealistic_product_photograph_of_the_samsung_galaxy_z_fold7._one.png';
const imgRepair   = '/assets/stitch/ultra_photorealistic_premium_smartphone_repair_workshop_scene._a_modern.png';
const imgExchange = '/assets/stitch/premium_photorealistic_product_campaign_comparing_two_phone_states_side_by.png';
const imgUser1    = '/assets/user/200_1788777310239.webp';
const imgUser2    = '/assets/user/200_1788777333446.webp';
const imgUser3    = '/assets/user/200_1788777343556.webp';
const imgUser4    = '/assets/user/200_1788777354019.webp';
const imgUser5    = '/assets/user/200_1788777460813.webp';
const logoSrc     = '/images/favicon.png';

const queryClient  = new QueryClient();
const WHATSAPP_NUM = '9779821552339';
const MAPS_URL     = 'https://www.google.com/maps/search/?api=1&query=Apple+Guru,+Indra+dev+Hall,+Bharatpur+44200';

const navItems: { id: PageView; label: string }[] = [
  { id: 'home',     label: 'Home'     },
  { id: 'phones',   label: 'Phones'   },
  { id: 'exchange', label: 'Exchange' },
  { id: 'repair',   label: 'Repair'   },
  { id: 'insights', label: 'Journal'  },
  { id: 'showroom', label: 'Showroom' },
];

// per-product image overrides (use real photos where we have them)
const localImages: Record<string, string> = {
  'iphone-15-pro':     iphone15Pro,
  'iphone-14-pro-max': iphone14Pro,
  'iphone-15-pro-max': iphone15ProMax,
  'galaxy-s24-ultra':  galaxyS24,
  'galaxy-z-fold-6':   galaxyFold,
};

function wa(msg: string) {
  window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}
function imgFor(p: Product) { return localImages[p.id] ?? p.image; }

// ── Primitives ───────────────────────────────────────────────────────────────
function Btn({
  children, onClick, variant = 'primary', className = '', type = 'button'
}: {
  children: ReactNode; onClick?: () => void;
  variant?: 'primary' | 'outline' | 'gold'; className?: string; type?: 'button'|'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} ${className}`}
    >
      {children}
    </button>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <img src={logoSrc} alt="Apple Guru" className="w-7 h-7 rounded-md" />
      <span style={{ fontFamily:"'DM Serif Display',Georgia,serif", fontSize:17, letterSpacing:'-.02em', color:'var(--text-primary)' }}>
        Apple Guru
      </span>
    </div>
  );
}

// ── Header ───────────────────────────────────────────────────────────────────
function Header({ page, goto, openSearch }: {
  page: PageView; goto: (p: PageView) => void; openSearch: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  const go = (p: PageView) => { setMenuOpen(false); goto(p); };

  return (
    <>
      {/* Devanagari micro-bar */}
      <div className="w-full border-b deva-bar text-center py-1.5" style={{ borderColor:'var(--border)', background:'var(--bg)', color:'var(--text-muted)' }}>
        चितवनको सर्वोत्तम Apple र Samsung स्टोर — Indra Dev Marga, Bharatpur
      </div>

      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,18,.97)' : 'rgba(10,10,18,.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)'
        }}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-12">
          <button onClick={() => go('home')}><Logo /></button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`nav-pill ${page === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={openSearch}
              className="hidden md:flex items-center gap-2 rounded-full px-4 py-2 text-[13px] transition-all"
              style={{ border:'1px solid var(--border)', color:'var(--text-secondary)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--blue-bright)'; (e.currentTarget as HTMLElement).style.color='var(--blue-bright)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--border)'; (e.currentTarget as HTMLElement).style.color='var(--text-secondary)'; }}
            >
              <Search size={14} /> Search
              <kbd className="ml-1 rounded px-1.5 py-0.5 text-[10px]" style={{ border:'1px solid var(--border-hover)', color:'var(--text-muted)' }}>⌘K</kbd>
            </button>

            <a
              href="tel:9821552339"
              className="hidden md:flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] transition-all"
              style={{ border:'1px solid var(--border)', color:'var(--text-secondary)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--blue-bright)'; (e.currentTarget as HTMLElement).style.color='var(--blue-bright)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--border)'; (e.currentTarget as HTMLElement).style.color='var(--text-secondary)'; }}
            >
              <Phone size={13} /> Call
            </a>

            <button
              className="md:hidden"
              style={{ color:'var(--text-primary)' }}
              onClick={() => setMenuOpen(v => !v)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="page-reveal border-t px-5 pb-6 pt-3 md:hidden" style={{ borderColor:'var(--border)', background:'var(--bg)' }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="flex w-full items-center justify-between border-b py-4 text-left text-[15px]"
                style={{ borderColor:'var(--border)', color: page===item.id ? 'var(--blue-bright)' : 'var(--text-primary)' }}
              >
                {item.label} <ArrowUpRight size={14} style={{ color:'var(--text-muted)' }} />
              </button>
            ))}
            <a href="tel:9821552339" className="mt-5 flex items-center gap-2 text-[13px]" style={{ color:'var(--text-muted)' }}>
              <Phone size={13} /> +977 9821 552 339
            </a>
          </div>
        )}
      </header>
    </>
  );
}

// ── Bottom nav (mobile) ───────────────────────────────────────────────────────
function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 z-40 grid h-14 w-full grid-cols-2 border-t md:hidden"
      style={{ background:'rgba(10,10,18,.97)', backdropFilter:'blur(16px)', borderColor:'var(--border)' }}
    >
      {[
        { href:'tel:9821552339', icon:<Phone size={15}/>, label:'Call Us' },
        { href:MAPS_URL, icon:<Navigation size={15}/>, label:'Directions' }
      ].map(({ href, icon, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors"
          style={{ color:'var(--text-secondary)' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color='var(--blue-bright)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color='var(--text-secondary)'}
        >
          {icon}{label}
        </a>
      ))}
    </nav>
  );
}

// ── Ticker bar ────────────────────────────────────────────────────────────────
function Ticker() {
  const items = [
    'Original Apple Devices','Samsung Galaxy S26 Ultra','Galaxy Z Fold 7',
    'iPhone 17 Pro Max','Same-Day Repair','Phone Exchange',
    'Genuine Warranty','Chitwan Tech Store','iPhone Air'
  ];
  const doubled = [...items,...items];
  return (
    <div className="overflow-hidden border-y py-3" style={{ borderColor:'var(--border)', background:'var(--bg)' }}>
      <div className="ticker-track">
        {doubled.map((t,i) => (
          <span key={i} className="flex items-center gap-5 px-5 text-[11.5px] font-medium tracking-[.09em] uppercase" style={{ color:'var(--text-muted)' }}>
            <span className="h-1 w-1 rounded-full shrink-0" style={{ background:'var(--blue)' }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Campaign Hero ─────────────────────────────────────────────────────────────
type Slide = {
  tag: string; title: string; accent: string;
  body: string; cta: string; img: string;
  action: 'phones'|'exchange'|'repair'|'showroom';
};
const slides: Slide[] = [
  {
    tag:'iPhone 17 Series', title:'The new Pro Max.', accent:'Titanium. Intelligence.',
    body:'Original iPhones with genuine warranty. Expert guidance at Chitwan\'s most trusted store.',
    cta:'Explore iPhones', img: imgHero1, action:'phones'
  },
  {
    tag:'Samsung Galaxy S26 Ultra', title:'Galaxy at its peak.', accent:'Engineered to exceed.',
    body:'The full Galaxy lineup — from S26 Ultra to Z Fold 7 — in stock at our showroom.',
    cta:'See Galaxy', img: imgHero2, action:'phones'
  },
  {
    tag:'Galaxy Z Fold 7', title:'Unfold a bigger world.', accent:'Fold. Work. Create.',
    body:'The most capable foldable yet. Try it in your hands at Apple Guru Chitwan.',
    cta:'View Foldables', img: imgHero3, action:'phones'
  },
  {
    tag:'Phone Exchange', title:'Your old phone has value.', accent:'Put it to work.',
    body:'Bring it in. We assess it honestly. The amount comes straight off your next device.',
    cta:'Start exchange', img: imgExchange, action:'exchange'
  },
  {
    tag:'Repair', title:'Broken screen?', accent:"We've fixed worse.",
    body:'Screen, battery, charging port — diagnosed and repaired by technicians who care.',
    cta:'Book a repair', img: imgRepair, action:'repair'
  },
];

function Hero({ goto }: { goto: (p: PageView) => void }) {
  const [idx,     setIdx]     = useState(0);
  const [prog,    setProg]    = useState(0);
  const [playing, setPlaying] = useState(true);
  const touchX  = useRef<number|null>(null);
  const paused  = useRef(false);
  const ivRef   = useRef<ReturnType<typeof setInterval>|null>(null);
  const idxRef  = useRef(0);
  const DURATION = 3000;

  const startTimer = () => {
    if (ivRef.current) clearInterval(ivRef.current);
    const t0 = Date.now();
    ivRef.current = setInterval(() => {
      if (paused.current) return;
      const pct = Math.min(100, ((Date.now()-t0)/DURATION)*100);
      setProg(pct);
      if (pct >= 100) {
        const next = (idxRef.current + 1) % slides.length;
        idxRef.current = next;
        setIdx(next);
        setProg(0);
        startTimer();
      }
    }, 40);
  };

  useEffect(() => {
    if (playing) startTimer();
    else { if (ivRef.current) clearInterval(ivRef.current); }
    return () => { if (ivRef.current) clearInterval(ivRef.current); };
  }, [playing]);

  const jump = (i: number) => {
    const n = (i + slides.length) % slides.length;
    idxRef.current = n;
    setIdx(n);
    setProg(0);
    if (playing) startTimer();
  };

  const s = slides[idx];

  return (
    <section
      className="relative overflow-hidden hero-grain"
      style={{ minHeight:'min(760px,94dvh)' }}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      onTouchStart={e => { touchX.current = e.touches[0]?.clientX ?? null; }}
      onTouchEnd={e => {
        if (touchX.current===null) return;
        const d=(e.changedTouches[0]?.clientX??0)-touchX.current;
        if (Math.abs(d)>40) jump(idx+(d<0?1:-1));
        touchX.current=null;
      }}
    >
      {/* BG image — pinned to the RIGHT half, high opacity */}
      <img
        key={`bg-${idx}`}
        src={s.img}
        alt=""
        className="absolute top-0 right-0 h-full transition-opacity duration-500"
        style={{ width:'62%', objectFit:'cover', objectPosition:'center', opacity:.72 }}
      />
      {/* Strong left-to-right gradient so text stays crisp */}
      <div className="absolute inset-0" style={{ background:'linear-gradient(90deg,var(--bg) 38%,rgba(10,10,18,.55) 62%,transparent 100%)' }} />
      {/* Bottom fade */}
      <div className="absolute inset-0" style={{ background:'linear-gradient(to top,var(--bg) 0%,transparent 40%)' }} />
      {/* Blue glow accent */}
      <div className="blue-glow" style={{ width:420, height:420, top:'15%', right:'30%', opacity:.22 }} />

      {/* Content */}
      <div className="relative mx-auto flex flex-col justify-between px-5 md:px-12 max-w-[1440px]"
        style={{ minHeight:'min(760px,94dvh)', paddingTop:64, paddingBottom:40 }}>

        {/* Tag */}
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background:'var(--blue-bright)' }} />
          <span key={`tag-${idx}`} className="page-reveal text-[12px] font-semibold tracking-[.1em] uppercase" style={{ color:'var(--blue-bright)' }}>
            {s.tag}
          </span>
        </div>

        {/* Headline */}
        <div style={{ maxWidth:680 }}>
          <h1
            key={`h-${idx}`}
            className="page-reveal font-serif"
            style={{ fontSize:'clamp(2.8rem,6.5vw,6rem)', lineHeight:.96, letterSpacing:'-.03em', color:'var(--text-primary)' }}
          >
            {s.title}<br />
            <span style={{ color:'var(--blue-bright)' }}>{s.accent}</span>
          </h1>
          <p
            key={`p-${idx}`}
            className="page-reveal mt-6 text-[16px] leading-7"
            style={{ maxWidth:420, color:'var(--text-secondary)', animationDelay:'80ms' }}
          >
            {s.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn variant="primary" onClick={() => goto(s.action)}>
              {s.cta} <ArrowRight size={15} />
            </Btn>
            <Btn variant="outline" onClick={() => wa(`Hello Apple Guru. I am interested in ${s.tag}.`)}>
              <MessageCircle size={14} /> Ask us
            </Btn>
          </div>
          <div className="mt-6 flex items-center gap-2 text-[12px]" style={{ color:'var(--text-muted)' }}>
            <MapPin size={12} style={{ color:'var(--blue)' }} />
            Indra Dev Marga, Bharatpur · Chitwan
          </div>
        </div>

        {/* Controls */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {[
                { icon:<ArrowLeft size={16}/>, fn:()=>jump(idx-1), label:'Prev' },
                { icon:<ArrowRight size={16}/>, fn:()=>jump(idx+1), label:'Next' },
                { icon: playing ? <Pause size={14}/> : <Play size={14}/>, fn:()=>setPlaying(v=>!v), label: playing ? 'Pause' : 'Play' },
              ].map(({ icon, fn, label }) => (
                <button
                  key={label}
                  onClick={fn}
                  aria-label={label}
                  title={label}
                  className="grid place-items-center rounded-full transition-all duration-150"
                  style={{
                    width:42, height:42,
                    background:'rgba(255,255,255,.12)',
                    border:'1.5px solid rgba(255,255,255,.25)',
                    color:'#fff',
                    backdropFilter:'blur(8px)',
                  }}
                  onMouseEnter={e=>{
                    (e.currentTarget as HTMLElement).style.background='var(--blue)';
                    (e.currentTarget as HTMLElement).style.borderColor='var(--blue-bright)';
                  }}
                  onMouseLeave={e=>{
                    (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,.12)';
                    (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,.25)';
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
            <span className="rounded-full px-3 py-1 text-[12px] font-semibold tracking-wider" style={{ background:'rgba(255,255,255,.1)', color:'rgba(255,255,255,.7)', backdropFilter:'blur(8px)' }}>
              {String(idx+1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}
            </span>
          </div>
          {/* Progress scrubbers — thicker and more visible */}
          <div className="flex gap-2">
            {slides.map((slide,i) => (
              <button
                key={slide.tag}
                onClick={() => jump(i)}
                className="relative h-1 flex-1 overflow-hidden rounded-full"
                style={{ background:'rgba(255,255,255,.18)' }}
              >
                <span
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    background:'var(--blue-bright)',
                    width: i===idx ? `${prog}%` : i<idx ? '100%' : '0%',
                    transition: i===idx ? 'none' : 'width .2s',
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Home bento grid ───────────────────────────────────────────────────────────
const bentoItems = [
  { label:'Phones', sub:'iPhone & Galaxy', icon:<Smartphone size={15}/>, img:imgUser1, page:'phones' as PageView },
  { label:'Exchange', sub:'Trade in', icon:<RefreshCw size={15}/>, img:imgExchange, page:'exchange' as PageView },
  { label:'Repair', sub:'Same-day service', icon:<Wrench size={15}/>, img:imgRepair, page:'repair' as PageView },
  { label:'Accessories', sub:'Cases & more', icon:<Watch size={15}/>, img:imgUser2, page:'phones' as PageView },
  { label:'Showroom', sub:'Chitwan', icon:<MapPin size={15}/>, img:showroomDay, page:'showroom' as PageView },
];

function HomeBento({ goto }: { goto: (p: PageView) => void }) {
  return (
    <section className="section mx-auto max-w-[1440px] px-5 md:px-12">
      <div className="mb-10">
        <p className="mb-3 text-[11px] font-semibold tracking-[.12em] uppercase" style={{ color:'var(--text-muted)' }}>What we do</p>
        <h2 className="font-serif" style={{ fontSize:'clamp(2rem,4.5vw,3.5rem)', lineHeight:1.1, letterSpacing:'-.03em', color:'var(--text-primary)' }}>
          Everything you need.<br />
          <span style={{ color:'var(--blue-bright)' }}>One place.</span>
        </h2>
        <div className="line-accent mt-6" style={{ maxWidth:280 }} />
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:grid-rows-2">
        {/* Large tile */}
        <button
          onClick={() => goto('phones')}
          className="group relative col-span-2 row-span-2 overflow-hidden rounded-2xl text-left card"
          style={{ minHeight:320 }}
        >
          <img src={imgUser3} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background:'linear-gradient(to top,var(--bg),rgba(10,10,18,.4) 50%,transparent)' }} />
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <span className="text-[11px] font-semibold tracking-[.1em] uppercase" style={{ color:'var(--blue-bright)' }}>Phones</span>
            <h3 className="mt-2 font-serif text-[1.7rem] leading-tight" style={{ color:'var(--text-primary)' }}>
              Latest iPhones &amp; Galaxy
            </h3>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] transition-colors group-hover:text-blue-400" style={{ color:'var(--text-secondary)' }}>
              Explore <ArrowRight size={12} />
            </span>
          </div>
        </button>

        {/* Small tiles */}
        {bentoItems.slice(1).map(item => (
          <button
            key={item.label}
            onClick={() => goto(item.page)}
            className="group relative overflow-hidden rounded-2xl text-left card"
            style={{ minHeight:155 }}
          >
            <img src={item.img} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background:'linear-gradient(to top,var(--bg),transparent)' }} />
            <div className="absolute bottom-4 left-4 z-10">
              <span style={{ color:'var(--blue-bright)' }}>{item.icon}</span>
              <h3 className="mt-2 text-[14px] font-semibold" style={{ color:'var(--text-primary)' }}>{item.label}</h3>
              <p className="text-[12px]" style={{ color:'var(--text-muted)' }}>{item.sub}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

// ── Showroom feature ──────────────────────────────────────────────────────────
function ShowroomFeature() {
  return (
    <section className="section border-y" style={{ borderColor:'var(--border)', background:'var(--bg-card)' }}>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 md:flex-row md:items-center md:px-12">
        <div className="w-full md:w-1/2">
          <span className="text-[12px] font-semibold tracking-[.1em] uppercase" style={{ color:'var(--blue-bright)' }}>Chitwan · Nepal</span>
          <h2 className="mt-4 font-serif" style={{ fontSize:'clamp(2rem,4vw,3.2rem)', lineHeight:1.1, letterSpacing:'-.03em', color:'var(--text-primary)' }}>
            Come see it<br /><span style={{ color:'var(--blue-bright)' }}>in person.</span>
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-7" style={{ color:'var(--text-secondary)' }}>
            Visit Apple Guru on Indra Dev Marga. Hold the devices. Ask real questions.
            Leave with confidence about what you bought.
          </p>
          <div className="mt-8 grid max-w-xs grid-cols-2 gap-6 border-t pt-6" style={{ borderColor:'var(--border)' }}>
            {[['3+','Years of trust'],['10k+','Happy customers']].map(([n,l]) => (
              <div key={l}>
                <p className="font-serif text-[2.4rem]" style={{ color:'var(--text-primary)' }}>{n}</p>
                <p className="mt-1 text-[12px]" style={{ color:'var(--text-muted)' }}>{l}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Btn variant="primary" onClick={() => wa('Hello Apple Guru. I am planning to visit the showroom in Chitwan.')}>
              Plan a visit <MessageCircle size={13} />
            </Btn>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              <Navigation size={13} /> Directions
            </a>
          </div>
        </div>

        <div className="relative w-full md:w-1/2">
          <img
            src={showroomDay}
            alt="Apple Guru showroom, Indra Dev Marga Chitwan"
            className="h-[300px] w-full rounded-2xl object-cover md:h-[420px]"
          />
          <div className="glass absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl p-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[.08em] uppercase" style={{ color:'var(--blue-bright)' }}>Location</p>
              <p className="mt-0.5 text-[13px]" style={{ color:'var(--text-secondary)' }}>Indra Dev Marga, Bharatpur, Chitwan</p>
            </div>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ color:'var(--blue-bright)' }}>
              <Navigation size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── User gallery strip ────────────────────────────────────────────────────────
function GalleryStrip() {
  const imgs = [imgUser1,imgUser2,imgUser3,imgUser4,imgUser5,imgUser1,imgUser2];
  return (
    <section className="section mx-auto max-w-[1440px] px-5 md:px-12">
      <div className="mb-8">
        <p className="mb-3 text-[11px] font-semibold tracking-[.12em] uppercase" style={{ color:'var(--text-muted)' }}>At the showroom</p>
        <h2 className="font-serif" style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', lineHeight:1.1, letterSpacing:'-.03em', color:'var(--text-primary)' }}>
          Real devices.<br /><span style={{ color:'var(--blue-bright)' }}>Real people.</span>
        </h2>
        <div className="line-accent mt-5" style={{ maxWidth:200 }} />
      </div>
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
        {imgs.map((src,i) => (
          <div key={i} className="shrink-0 overflow-hidden rounded-xl" style={{ width:176, height:224 }}>
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Product image component ───────────────────────────────────────────────────
function ProdImg({ product, className='' }: { product:Product; className?:string }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background:'var(--bg-raised)' }}>
      <img
        src={imgFor(product)}
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(10,10,18,.55),transparent)' }} />
    </div>
  );
}

// ── Product card ──────────────────────────────────────────────────────────────
function ProductCard({ p, onSelect }: { p:Product; onSelect:(p:Product)=>void }) {
  return (
    <article className="group card">
      <button onClick={() => onSelect(p)} className="block w-full text-left">
        <ProdImg product={p} className="h-52 md:h-60" />
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-semibold" style={{ color:'var(--text-primary)' }}>{p.name}</h3>
              <p className="mt-0.5 text-[12px]" style={{ color:'var(--blue-bright)' }}>
                {p.editorialHighlight || p.brand}
              </p>
            </div>
            <ArrowUpRight size={15} style={{ color:'var(--blue-bright)', marginTop:2, flexShrink:0 }} />
          </div>
          <p className="mt-3 text-[13.5px] leading-6" style={{ color:'var(--text-secondary)' }}>{p.tagline}</p>
          <p className="mt-4 text-[14px] font-semibold" style={{ color:'var(--text-primary)' }}>{p.priceRange}</p>
        </div>
      </button>
      <div className="border-t px-5 py-3" style={{ borderColor:'var(--border)' }}>
        <button
          onClick={() => wa(`Hello Apple Guru. I would like to check ${p.name} at the showroom.`)}
          className="flex w-full items-center justify-center gap-2 py-1 text-[12px] font-semibold transition-colors"
          style={{ color:'var(--blue-bright)' }}
          onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='var(--blue)'}
          onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='var(--blue-bright)'}
        >
          <MessageCircle size={12} /> Enquire on WhatsApp
        </button>
      </div>
    </article>
  );
}

// ── Product catalog ───────────────────────────────────────────────────────────
function Catalog({ onSelect }: { onSelect:(p:Product)=>void }) {
  const [filter, setFilter] = useState('Apple');
  const tabs = ['Apple','Samsung','Trending','Other devices'];
  const filtered =
    filter==='Apple'   ? products.filter(p=>p.brand==='Apple') :
    filter==='Samsung' ? products.filter(p=>p.brand==='Samsung') :
    filter==='Trending'? products.filter(p=>p.featured) :
    products.filter(p=>p.category==='Mac'||p.category==='Audio & Wearables');

  const headings: Record<string,string> = {
    Apple:'Apple collection', Samsung:'Samsung collection',
    Trending:'Trending now', 'Other devices':'Mac, Watch & Audio'
  };

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-12 md:pt-14">
      <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-5">
        {tabs.map(t => (
          <button key={t} onClick={()=>setFilter(t)} className={`chip ${filter===t?'active':''}`}>{t}</button>
        ))}
      </div>
      <div className="mb-8 flex items-end justify-between border-b pb-5" style={{ borderColor:'var(--border)' }}>
        <h1 className="font-serif" style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing:'-.03em', color:'var(--text-primary)' }}>
          {headings[filter]}
        </h1>
        <span className="text-[12px]" style={{ color:'var(--text-muted)' }}>{filtered.length} devices</span>
      </div>
      {filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(p => <ProductCard key={p.id} p={p} onSelect={onSelect} />)}
        </div>
      ) : (
        <div className="rounded-2xl border p-12 text-center text-[14px]" style={{ borderColor:'var(--border)', color:'var(--text-muted)' }}>
          Nothing here yet.
        </div>
      )}
      <p className="mt-8 text-center text-[12px] italic" style={{ color:'var(--text-muted)' }}>{priceDisclaimer}</p>
    </section>
  );
}

// ── Exchange page ─────────────────────────────────────────────────────────────
function ExchangePage({ target, clearTarget }: { target:Product|null; clearTarget:()=>void }) {
  const models = [
    'iPhone 17 Pro Max','iPhone Air','iPhone 15 Pro Max','iPhone 15 Pro',
    'iPhone 15','iPhone 14 Pro Max','iPhone 14','iPhone 13 Pro Max',
    'Galaxy S26 Ultra','Galaxy S24 Ultra','Galaxy S23 Ultra',
    'Galaxy Z Fold 7','Galaxy Z Fold 5','Other flagship / Android'
  ];
  const conditions = [
    { label:'Like new — no scratches', mult:1 },
    { label:'Good — light wear',       mult:.88 },
    { label:'Cracked glass, works fine', mult:.65 },
    { label:'Heavy wear or issues',    mult:.45 },
  ];
  const [model, setModel]     = useState(models[0]);
  const [cond,  setCond]      = useState(conditions[0]);

  const base: [number,number] =
    model.includes('17 Pro Max') ? [145000,175000] :
    model.includes('Air')        ? [100000,125000] :
    model.includes('15 Pro Max') ? [110000,135000] :
    model.includes('15 Pro')     ? [95000,115000]  :
    model.includes('15')         ? [75000,90000]   :
    model.includes('14 Pro Max') ? [85000,105000]  :
    model.includes('14')         ? [60000,72000]   :
    model.includes('13')         ? [65000,80000]   :
    model.includes('S26')        ? [115000,145000] :
    model.includes('S24')        ? [95000,120000]  :
    model.includes('S23')        ? [70000,88000]   :
    model.includes('Fold')       ? [85000,110000]  : [20000,45000];

  const lo = Math.round(base[0]*cond.mult/1000)*1000;
  const hi = Math.round(base[1]*cond.mult/1000)*1000;

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-12 md:pt-14">
      <div style={{ maxWidth:640 }}>
        <span className="text-[12px] font-semibold tracking-[.1em] uppercase" style={{ color:'var(--blue-bright)' }}>Phone Exchange</span>
        <h1 className="mt-4 font-serif" style={{ fontSize:'clamp(2.5rem,5.5vw,5rem)', lineHeight:.97, letterSpacing:'-.03em', color:'var(--text-primary)' }}>
          Trade in.<br /><span style={{ color:'var(--blue-bright)' }}>Level up.</span>
        </h1>
        <p className="mt-5 text-[15px] leading-7" style={{ color:'var(--text-secondary)' }}>
          Exchange your current phone for a new one. The value of your old device comes off the price.
        </p>
      </div>

      {/* Steps */}
      <div className="mt-12 grid gap-3 md:grid-cols-3">
        {[
          ['Bring your phone','Walk in with your current device — any condition welcome.'],
          ['We assess it','Our team evaluates condition, battery health, and resale value honestly.'],
          ['Upgrade & save','The agreed exchange value is deducted from your new device.'],
        ].map(([title,body],i) => (
          <div key={title as string} className="rounded-2xl border p-6" style={{ background:'var(--bg-card)', borderColor:'var(--border)' }}>
            <span className="text-[11px] font-semibold tracking-[.1em] uppercase" style={{ color:'var(--blue-bright)' }}>
              {String(i+1).padStart(2,'0')}
            </span>
            <h3 className="mt-5 font-serif text-[1.15rem]" style={{ color:'var(--text-primary)' }}>{title}</h3>
            <p className="mt-2 text-[13.5px] leading-6" style={{ color:'var(--text-secondary)' }}>{body}</p>
          </div>
        ))}
      </div>

      {/* Estimator */}
      <div className="mt-10 grid gap-6 rounded-2xl border p-6 md:grid-cols-2 md:p-10" style={{ background:'var(--bg-card)', borderColor:'var(--border)' }}>
        <div>
          <h2 className="font-serif text-[1.5rem]" style={{ color:'var(--text-primary)' }}>Value estimator</h2>
          <p className="mt-1.5 text-[13px]" style={{ color:'var(--text-muted)' }}>Rough guide only — final value assessed in store.</p>

          <label className="mt-7 block text-[13px] font-semibold" style={{ color:'var(--text-secondary)' }}>Your current device</label>
          <div className="relative mt-2">
            <select
              value={model}
              onChange={e=>setModel(e.target.value)}
              className="h-11 w-full appearance-none rounded-xl px-4 pr-10 text-[14px] outline-none transition-all"
              style={{ border:'1px solid var(--border-hover)', background:'var(--bg-raised)', color:'var(--text-primary)' }}
              onFocus={e=>(e.target as HTMLSelectElement).style.borderColor='var(--blue-bright)'}
              onBlur={e=>(e.target as HTMLSelectElement).style.borderColor='var(--border-hover)'}
            >
              {models.map(m=><option key={m}>{m}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-3" size={15} style={{ color:'var(--text-muted)' }} />
          </div>

          <label className="mt-6 block text-[13px] font-semibold" style={{ color:'var(--text-secondary)' }}>Condition</label>
          <div className="mt-2 space-y-2">
            {conditions.map(c => (
              <button
                key={c.label}
                onClick={()=>setCond(c)}
                className={`cond-btn ${cond.label===c.label?'selected':''}`}
              >
                {c.label}
                {cond.label===c.label && <Check size={14} style={{ color:'var(--blue-bright)', flexShrink:0 }} />}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0" style={{ borderColor:'var(--border)' }}>
          <h3 className="text-[13px] font-medium" style={{ color:'var(--text-muted)' }}>Working estimate</h3>
          <p className="mt-5 font-serif" style={{ fontSize:'2.5rem', lineHeight:1.1, color:'var(--text-primary)' }}>
            Rs. {lo.toLocaleString()}
          </p>
          <p className="font-serif" style={{ fontSize:'2.5rem', lineHeight:1.1, color:'var(--blue-bright)' }}>
            – Rs. {hi.toLocaleString()}
          </p>
          <p className="mt-4 text-[13px] leading-6" style={{ color:'var(--text-secondary)' }}>
            Bring your device, its original box if available, and any cables. Our team does the rest.
          </p>
          <div className="mt-5 rounded-xl border p-4 text-[13px]" style={{ borderColor:'var(--border)', background:'var(--bg-raised)', color:'var(--text-secondary)' }}>
            <CircleHelp size={13} className="mr-2 inline" style={{ color:'var(--blue-bright)' }} />
            Original parts and unaltered pairing can add up to 25% more value.
          </div>
          {target && (
            <div className="mt-5 rounded-xl border p-4" style={{ borderColor:'var(--blue)', background:'var(--blue-dim)' }}>
              <p className="text-[11px] font-semibold tracking-[.08em] uppercase" style={{ color:'var(--blue-bright)' }}>Upgrading to</p>
              <p className="mt-1 text-[14px] font-semibold" style={{ color:'var(--text-primary)' }}>{target.name}</p>
              <button onClick={clearTarget} className="mt-2 text-[12px] underline" style={{ color:'var(--text-muted)' }}>Clear</button>
            </div>
          )}
          <Btn
            className="mt-7 w-full"
            variant="primary"
            onClick={()=>wa(`Hello Apple Guru. I want an exchange assessment for my ${model} in "${cond.label}" condition.`)}
          >
            Ask for assessment <MessageCircle size={13} />
          </Btn>
        </div>
      </div>
    </section>
  );
}

// ── Repair page ───────────────────────────────────────────────────────────────
function RepairPage() {
  const [open, setOpen] = useState<string|null>(null);
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-12 md:pt-14">
      <div style={{ maxWidth:640 }}>
        <span className="text-[12px] font-semibold tracking-[.1em] uppercase" style={{ color:'var(--blue-bright)' }}>Repair</span>
        <h1 className="mt-4 font-serif" style={{ fontSize:'clamp(2.5rem,5.5vw,5rem)', lineHeight:.97, letterSpacing:'-.03em', color:'var(--text-primary)' }}>
          Repair with<br /><span style={{ color:'var(--blue-bright)' }}>a clear plan.</span>
        </h1>
        <p className="mt-5 text-[15px] leading-7" style={{ color:'var(--text-secondary)' }}>
          Diagnosis first, honest options second, precision work third. We don't guess.
        </p>
        <Btn className="mt-7" variant="primary" onClick={()=>wa('Hello Apple Guru. I want to book a repair.')}>
          Book a repair <ArrowRight size={14} />
        </Btn>
      </div>

      {/* Hero image — real repair lab */}
      <div className="mt-10 overflow-hidden rounded-2xl">
        <img src={imgRepair} alt="Apple Guru repair lab" className="h-[260px] w-full object-cover md:h-[380px]" />
      </div>

      {/* WhatsApp enquiry */}
      <div className="mt-6 flex flex-col gap-4 rounded-2xl border p-6 md:flex-row md:items-center md:justify-between md:p-8" style={{ background:'var(--bg-card)', borderColor:'var(--border)' }}>
        <div>
          <h2 className="font-serif text-[1.4rem]" style={{ color:'var(--text-primary)' }}>Not sure if it can be repaired?</h2>
          <p className="mt-2 text-[14px] leading-6" style={{ color:'var(--text-secondary)' }}>
            Send a photo and describe the issue on WhatsApp. We'll tell you what's possible and what it costs.
          </p>
        </div>
        <Btn variant="primary" className="shrink-0" onClick={()=>wa('Hello Apple Guru repair desk. I want to check if my device is repairable.')}>
          <MessageCircle size={13} /> WhatsApp us
        </Btn>
      </div>

      {/* Services */}
      <div className="mt-12">
        <h2 className="mb-6 font-serif text-[1.8rem]" style={{ color:'var(--text-primary)' }}>What we repair</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {repairServices.slice(0,6).map(svc => (
            <article key={svc.id} className="card p-6">
              <Wrench size={17} style={{ color:'var(--blue-bright)' }} />
              <h3 className="mt-5 font-serif text-[1.05rem]" style={{ color:'var(--text-primary)' }}>{svc.title}</h3>
              <p className="mt-2 text-[13px] leading-6" style={{ color:'var(--text-secondary)' }}>{svc.shortDesc}</p>
              <button
                onClick={()=>setOpen(open===svc.id?null:svc.id)}
                className="mt-5 flex items-center gap-1.5 text-[12px] font-semibold transition-colors"
                style={{ color:'var(--blue-bright)' }}
              >
                {open===svc.id ? <Minus size={12}/> : <Plus size={12}/>}
                {open===svc.id ? 'Hide' : 'Common signs'}
              </button>
              {open===svc.id && (
                <div className="mt-4 border-t pt-4 page-reveal" style={{ borderColor:'var(--border)' }}>
                  <ul className="space-y-1.5 text-[13px]" style={{ color:'var(--text-secondary)' }}>
                    {svc.symptoms.slice(0,4).map(s=><li key={s}>— {s}</li>)}
                  </ul>
                  <button
                    onClick={()=>wa(`Hello Apple Guru repair desk. I want to ask about: ${svc.title}.`)}
                    className="mt-4 text-[12px] underline"
                    style={{ color:'var(--blue-bright)' }}
                  >
                    Ask about this repair
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Process pills */}
      <div className="mt-12 border-t pt-10" style={{ borderColor:'var(--border)' }}>
        <h2 className="mb-5 font-serif text-[1.4rem]" style={{ color:'var(--text-primary)' }}>The process</h2>
        <div className="flex flex-wrap gap-2">
          {['Bring device','Inspection','Assessment','Repair','Collect'].map((step,i)=>(
            <div key={step} className="flex items-center gap-3 rounded-full border px-5 py-3 text-[13px]" style={{ borderColor:'var(--border)', background:'var(--bg-card)', color:'var(--text-primary)' }}>
              <span className="font-medium" style={{ color:'var(--blue-bright)' }}>{String(i+1).padStart(2,'0')}</span>
              {step}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Showroom page ─────────────────────────────────────────────────────────────
function ShowroomPage() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-12 md:pt-14">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="text-[12px] font-semibold tracking-[.1em] uppercase" style={{ color:'var(--blue-bright)' }}>Our Showroom</span>
          <h1 className="mt-4 font-serif" style={{ fontSize:'clamp(2.5rem,5vw,4.5rem)', lineHeight:.97, letterSpacing:'-.03em', color:'var(--text-primary)' }}>
            One original<br /><span style={{ color:'var(--blue-bright)' }}>showroom.</span>
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-7" style={{ color:'var(--text-secondary)' }}>
            Come to Indra Dev Marga. Hold the phones side by side. Talk to someone who uses this stuff every day.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { Icon:MapPin,  text:'Indra Dev Marga, Bharatpur 44200, Chitwan' },
              { Icon:Clock3,  text:'Call ahead for a specific configuration or visit anytime.' },
              { Icon:Phone,   text:'+977 9821 552 339', href:'tel:9821552339' },
            ].map(({ Icon, text, href })=>(
              <div key={text} className="flex items-start gap-3 text-[14px]" style={{ color:'var(--text-secondary)' }}>
                <Icon size={15} style={{ color:'var(--blue-bright)', flexShrink:0, marginTop:2 }} />
                {href ? <a href={href} className="underline" style={{ color:'var(--text-secondary)' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='var(--blue-bright)'}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='var(--text-secondary)'}
                >{text}</a> : text}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn variant="primary" onClick={()=>wa('Hello Apple Guru. I am planning to visit the Chitwan showroom.')}>
              Plan a visit <MessageCircle size={13} />
            </Btn>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="btn btn-outline">
              <Navigation size={13} /> Get directions
            </a>
          </div>
        </div>

        <div>
          <img src={showroomNight} alt="Apple Guru showroom at night" className="h-[360px] w-full rounded-2xl object-cover md:h-[480px]" />
        </div>
      </div>

      {/* Real photo gallery — NO AI showroom image */}
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[showroomDay, imgUser1, imgUser4, imgUser5].map((src,i)=>(
          <div key={i} className="overflow-hidden rounded-xl">
            <img src={src} alt="" className="h-44 w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Journal page ──────────────────────────────────────────────────────────────
function JournalPage({ onSelect }: { onSelect:(p:BlogPost)=>void }) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-12 md:pt-14">
      <span className="text-[12px] font-semibold tracking-[.1em] uppercase" style={{ color:'var(--blue-bright)' }}>Journal</span>
      <h1 className="mt-4 font-serif" style={{ fontSize:'clamp(2.5rem,5.5vw,5rem)', lineHeight:.97, letterSpacing:'-.03em', color:'var(--text-primary)' }}>
        Useful things<br /><span style={{ color:'var(--blue-bright)' }}>to know.</span>
      </h1>
      <div className="mt-12">
        {blogPosts.map((post,i)=>(
          <button
            key={post.id}
            onClick={()=>onSelect(post)}
            className="group grid w-full gap-4 border-t py-8 text-left md:grid-cols-[60px_1fr_130px]"
            style={{ borderColor:'var(--border)' }}
          >
            <span className="text-[12px] font-medium" style={{ color:'var(--blue-bright)' }}>0{i+1}</span>
            <span>
              <span className="text-[11px] font-semibold tracking-[.08em] uppercase" style={{ color:'var(--text-muted)' }}>
                {post.category} · {post.readTime}
              </span>
              <strong className="mt-2.5 block max-w-3xl font-serif leading-tight transition-colors group-hover:text-blue-400"
                style={{ fontSize:'clamp(1.1rem,2.2vw,1.7rem)', color:'var(--text-primary)' }}>
                {post.title}
              </strong>
              <span className="mt-2.5 block max-w-2xl text-[13.5px] leading-6" style={{ color:'var(--text-muted)' }}>
                {post.excerpt}
              </span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-medium transition-colors group-hover:text-blue-400 md:justify-end" style={{ color:'var(--text-muted)' }}>
              Read <ArrowUpRight size={12} />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer({ goto }: { goto:(p:PageView)=>void }) {
  return (
    <footer className="border-t px-5 pb-24 pt-14 md:px-12 md:pb-14" style={{ borderColor:'var(--border)', background:'var(--bg-card)' }}>
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-5 max-w-sm text-[14px] leading-7" style={{ color:'var(--text-muted)' }}>
              Apple Guru is Chitwan's home for original Apple and Samsung devices, genuine repair, and honest advice.
            </p>
            <div className="deva-bar mt-4" style={{ color:'var(--text-muted)' }}>चितवनको भरोसेमान्द टेक स्टोर</div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-semibold tracking-[.08em] uppercase" style={{ color:'var(--text-primary)' }}>Services</span>
            {(['phones','exchange','repair'] as PageView[]).map(p=>(
              <button key={p} onClick={()=>goto(p)} className="text-left text-[14px] capitalize transition-colors"
                style={{ color:'var(--text-muted)' }}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='var(--blue-bright)'}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='var(--text-muted)'}
              >{p}</button>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-semibold tracking-[.08em] uppercase" style={{ color:'var(--text-primary)' }}>Company</span>
            {[['Journal','insights'],['Showroom','showroom']].map(([label,p])=>(
              <button key={p} onClick={()=>goto(p as PageView)} className="text-left text-[14px] transition-colors"
                style={{ color:'var(--text-muted)' }}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='var(--blue-bright)'}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='var(--text-muted)'}
              >{label}</button>
            ))}
            <a href="tel:9821552339" className="text-[14px] transition-colors"
              style={{ color:'var(--text-muted)' }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='var(--blue-bright)'}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='var(--text-muted)'}
            >Contact</a>
          </div>
        </div>
        <div className="divider mt-10" />
        <p className="mt-6 text-center text-[12px]" style={{ color:'var(--text-muted)' }}>
          © {new Date().getFullYear()} Apple Guru, Chitwan, Nepal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ── Product modal ─────────────────────────────────────────────────────────────
function ProductModal({ product, onClose, onExchange, goto }: {
  product:Product|null; onClose:()=>void;
  onExchange:(p:Product)=>void; goto:(p:PageView)=>void;
}) {
  if (!product) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background:'rgba(5,5,12,.88)', backdropFilter:'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border"
        style={{ background:'var(--bg-card)', borderColor:'var(--border)' }}
        onClick={e=>e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor:'var(--border)' }}>
          <span className="text-[12px] font-semibold tracking-[.08em] uppercase" style={{ color:'var(--blue-bright)' }}>{product.brand}</span>
          <button onClick={onClose} style={{ color:'var(--text-muted)' }}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='var(--text-primary)'}
            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='var(--text-muted)'}
          >
            <X size={17} />
          </button>
        </div>
        <div className="grid md:grid-cols-2">
          <ProdImg product={product} className="h-72 md:h-full md:min-h-[360px]" />
          <div className="p-6 md:p-8">
            <h2 className="font-serif" style={{ fontSize:'clamp(1.8rem,3vw,2.6rem)', letterSpacing:'-.02em', color:'var(--text-primary)' }}>
              {product.name}
            </h2>
            <p className="mt-1.5 text-[13.5px]" style={{ color:'var(--blue-bright)' }}>{product.tagline}</p>
            <div className="my-6 border-y py-5" style={{ borderColor:'var(--border)' }}>
              <p className="text-[12px]" style={{ color:'var(--text-muted)' }}>Guide price</p>
              <p className="mt-1 font-serif text-[1.6rem]" style={{ color:'var(--text-primary)' }}>{product.priceRange}</p>
              <p className="mt-1 text-[12px]" style={{ color:'var(--text-muted)' }}>{priceDisclaimer}</p>
            </div>
            <p className="text-[14px] leading-7" style={{ color:'var(--text-secondary)' }}>{product.description}</p>
            <ul className="mt-5 space-y-2 border-t pt-5" style={{ borderColor:'var(--border)' }}>
              {product.keySpecs.slice(0,4).map(spec=>(
                <li key={spec} className="flex items-start gap-2 text-[13px]" style={{ color:'var(--text-secondary)' }}>
                  <Check size={13} style={{ color:'var(--blue-bright)', marginTop:3, flexShrink:0 }} />{spec}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-2">
              <Btn variant="primary" onClick={()=>wa(`Hello Apple Guru. Please confirm stock and pricing for ${product.name}.`)}>
                <MessageCircle size={13} /> Check availability
              </Btn>
              <Btn variant="outline" onClick={()=>onExchange(product)}>
                Exchange toward this <ArrowRight size={13} />
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Journal modal ─────────────────────────────────────────────────────────────
function JournalModal({ post, onClose }: { post:BlogPost|null; onClose:()=>void }) {
  if (!post) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background:'rgba(5,5,12,.88)', backdropFilter:'blur(12px)' }}
      onClick={onClose}
    >
      <article
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border p-7 md:p-10"
        style={{ background:'var(--bg-card)', borderColor:'var(--border)' }}
        onClick={e=>e.stopPropagation()}
      >
        <div className="flex justify-between">
          <span className="text-[12px] font-semibold tracking-[.08em] uppercase" style={{ color:'var(--blue-bright)' }}>
            {post.category} · {post.readTime}
          </span>
          <button onClick={onClose} style={{ color:'var(--text-muted)' }}><X size={16} /></button>
        </div>
        <h2 className="mt-6 font-serif" style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', lineHeight:1.15, letterSpacing:'-.02em', color:'var(--text-primary)' }}>
          {post.title}
        </h2>
        <p className="mt-5 border-l-2 pl-4 text-[14px] leading-7 italic" style={{ borderColor:'var(--blue)', color:'var(--text-secondary)' }}>
          {post.keyTakeaway}
        </p>
        <div className="mt-7 space-y-5">
          {post.content.map((para,i)=>(
            <p key={i} className="text-[14.5px] leading-8" style={{ color:'var(--text-secondary)' }}>{para}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

// ── Search dialog ─────────────────────────────────────────────────────────────
function SearchDialog({ open, onClose, onProduct, onPost }: {
  open:boolean; onClose:()=>void;
  onProduct:(p:Product)=>void; onPost:(p:BlogPost)=>void;
}) {
  const [q, setQ] = useState('');
  useEffect(()=>{ if (!open) setQ(''); },[open]);
  if (!open) return null;
  const term = q.toLowerCase().trim();
  const ps   = products.filter(p=>`${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(term)).slice(0,5);
  const posts = blogPosts.filter(p=>`${p.title} ${p.category}`.toLowerCase().includes(term)).slice(0,3);

  return (
    <div
      className="fixed inset-0 z-50 p-4"
      style={{ background:'rgba(5,5,12,.88)', backdropFilter:'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="mx-auto mt-[8vh] max-w-2xl overflow-hidden rounded-2xl border"
        style={{ background:'var(--bg-card)', borderColor:'var(--border)' }}
        onClick={e=>e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b px-5 py-4" style={{ borderColor:'var(--border)' }}>
          <Search size={16} style={{ color:'var(--blue-bright)', flexShrink:0 }} />
          <input
            autoFocus
            value={q}
            onChange={e=>setQ(e.target.value)}
            placeholder="Search devices, journal..."
            className="min-h-10 flex-1 bg-transparent text-[15px] outline-none"
            style={{ color:'var(--text-primary)' }}
          />
          <button onClick={onClose} style={{ color:'var(--text-muted)' }}><X size={16} /></button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-3">
          {ps.length>0 && (
            <>
              <p className="mb-2 px-2 text-[11px] font-semibold tracking-[.08em] uppercase" style={{ color:'var(--blue-bright)' }}>Devices</p>
              {ps.map(p=>(
                <button
                  key={p.id}
                  onClick={()=>{ onClose(); onProduct(p); }}
                  className="flex w-full items-center justify-between rounded-xl border-b px-3 py-3 text-left transition-colors hover:bg-blue-900/10"
                  style={{ borderColor:'var(--border)' }}
                >
                  <span>
                    <b className="block text-[14px] font-semibold" style={{ color:'var(--text-primary)' }}>{p.name}</b>
                    <small className="text-[12px]" style={{ color:'var(--text-muted)' }}>{p.brand} · {p.priceRange}</small>
                  </span>
                  <ArrowUpRight size={13} style={{ color:'var(--blue-bright)' }} />
                </button>
              ))}
            </>
          )}
          {posts.length>0 && (
            <div className="mt-4">
              <p className="mb-2 px-2 text-[11px] font-semibold tracking-[.08em] uppercase" style={{ color:'var(--blue-bright)' }}>Journal</p>
              {posts.map(p=>(
                <button
                  key={p.id}
                  onClick={()=>{ onClose(); onPost(p); }}
                  className="flex w-full items-center justify-between rounded-xl border-b px-3 py-3 text-left transition-colors hover:bg-blue-900/10"
                  style={{ borderColor:'var(--border)' }}
                >
                  <span>
                    <b className="block text-[14px] font-semibold" style={{ color:'var(--text-primary)' }}>{p.title}</b>
                    <small className="text-[12px]" style={{ color:'var(--text-muted)' }}>{p.category}</small>
                  </span>
                  <ArrowUpRight size={13} style={{ color:'var(--blue-bright)' }} />
                </button>
              ))}
            </div>
          )}
          {!ps.length && !posts.length && (
            <div className="py-14 text-center">
              <FileText size={22} style={{ color:'var(--blue-bright)', margin:'0 auto 12px' }} />
              <p className="text-[14px]" style={{ color:'var(--text-muted)' }}>Nothing matched.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Home page ─────────────────────────────────────────────────────────────────
function HomePage({ goto }: { goto:(p:PageView)=>void }) {
  return (
    <>
      <Hero goto={goto} />
      <Ticker />
      <HomeBento goto={goto} />
      <ShowroomFeature />
      <GalleryStrip />
      <Footer goto={goto} />
    </>
  );
}

// ── App shell ─────────────────────────────────────────────────────────────────
function AppContent() {
  const [page,            setPage]            = useState<PageView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product|null>(null);
  const [selectedPost,    setSelectedPost]    = useState<BlogPost|null>(null);
  const [targetProduct,   setTargetProduct]   = useState<Product|null>(null);
  const [searchOpen,      setSearchOpen]      = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(()=>{
    const raw = location.replace(/^\/+/,'') as PageView;
    const valid: PageView[] = ['home','phones','exchange','repair','showroom','insights','facts','location'];
    if (valid.includes(raw)) setPage(raw||'home');
  },[location]);

  useEffect(()=>{
    const titles: Record<string,string> = {
      home:"Apple Guru · Chitwan's Tech Store",
      phones:'Phones · Apple Guru', exchange:'Exchange · Apple Guru',
      repair:'Repair · Apple Guru', showroom:'Showroom · Apple Guru',
      insights:'Journal · Apple Guru',
    };
    document.title = titles[page] ?? titles.home;
  },[page]);

  const goto = (p: PageView) => {
    setPage(p);
    setLocation(p==='home'?'/':'/'+p);
    window.requestAnimationFrame(()=>window.scrollTo({ top:0, behavior:'smooth' }));
  };

  useEffect(()=>{
    const kd = (e: KeyboardEvent) => {
      if ((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==='k') { e.preventDefault(); setSearchOpen(true); }
      if (e.key==='Escape') { setSearchOpen(false); setSelectedProduct(null); setSelectedPost(null); }
    };
    window.addEventListener('keydown', kd);
    return ()=>window.removeEventListener('keydown', kd);
  },[]);

  const body = useMemo(()=>{
    if (page==='phones')                              return <Catalog onSelect={setSelectedProduct} />;
    if (page==='exchange')                            return <ExchangePage target={targetProduct} clearTarget={()=>setTargetProduct(null)} />;
    if (page==='repair')                              return <RepairPage />;
    if (page==='showroom'||page==='location')         return <ShowroomPage />;
    if (page==='insights'||page==='facts')            return <JournalPage onSelect={setSelectedPost} />;
    return <HomePage goto={goto} />;
  },[page, targetProduct]);

  return (
    <div style={{ minHeight:'100dvh', background:'var(--bg)', color:'var(--text-primary)' }}>
      <Header page={page} goto={goto} openSearch={()=>setSearchOpen(true)} />
      <main className="page-reveal">{body}</main>
      {page!=='home' && <Footer goto={goto} />}
      <BottomNav />

      <ProductModal
        product={selectedProduct}
        onClose={()=>setSelectedProduct(null)}
        onExchange={p=>{ setSelectedProduct(null); setTargetProduct(p); goto('exchange'); }}
        goto={goto}
      />
      <JournalModal post={selectedPost} onClose={()=>setSelectedPost(null)} />
      <SearchDialog
        open={searchOpen}
        onClose={()=>setSearchOpen(false)}
        onProduct={setSelectedProduct}
        onPost={setSelectedPost}
      />
    </div>
  );
}

export default function App() {
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
