import { useEffect, useRef, useState, type TouchEvent } from 'react';
import { ArrowDownRight, ArrowLeft, ArrowRight, MapPin, MessageCircle, Pause, Play, Smartphone, Wrench, RefreshCw, Sparkles, Watch } from 'lucide-react';

type CampaignHeroProps = {
  onExplorePhones: () => void;
  onVisitShowroom: () => void;
  onOpenExchange: () => void;
  onOpenRepair: () => void;
  onOpenWhatsApp: (message?: string) => void;
};

type Campaign = {
  eyebrow: string;
  title: string;
  accent: string;
  detail: string;
  cta: string;
  icon: typeof Smartphone;
  media: string;
  kind?: 'video';
  tint: string;
};

const campaigns: Campaign[] = [
  { eyebrow: '01 / iPhone', title: 'Your next iPhone', accent: 'starts here.', detail: 'Feel the new generation in person. Original devices, honest guidance, Chitwan.', cta: 'Explore iPhone', icon: Smartphone, media: '/assets/user/200_1788777310239.webp', tint: '#1d74ff' },
  { eyebrow: '02 / Samsung', title: 'Galaxy,', accent: 'your way.', detail: 'Fold 7 flexibility, a wider view, and a screen built for your everyday.', cta: 'See Galaxy', icon: Sparkles, media: '/assets/stitch/premium_photorealistic_product_photograph_of_the_samsung_galaxy_z_fold7._one.png', tint: '#386bff' },
  { eyebrow: '03 / Exchange', title: 'Your old phone', accent: 'still has value.', detail: 'Bring it in. Get a clear assessment. Put the value toward what is next.', cta: 'Start exchange', icon: RefreshCw, media: '/assets/stitch/premium_photorealistic_product_campaign_comparing_two_phone_states_side_by.png', tint: '#16b9d5' },
  { eyebrow: '04 / Repair', title: 'Cracked screen?', accent: 'We can help.', detail: 'Precision screen, battery, and board work by technicians who stay with the problem.', cta: 'Book a repair', icon: Wrench, media: '/assets/stitch/ultra_photorealistic_premium_smartphone_repair_workshop_scene._a_modern.png', tint: '#42a5ff' },
  { eyebrow: '05 / Accessories', title: 'Finish your', accent: 'setup.', detail: 'Watch, audio, cases, and the small details that make a device feel yours.', cta: 'Visit showroom', icon: Watch, media: '/assets/user/200_1788777343556.webp', tint: '#78d8ff' },
];

export function CampaignHero({ onExplorePhones, onVisitShowroom, onOpenExchange, onOpenRepair, onOpenWhatsApp }: CampaignHeroProps) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const startX = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const item = campaigns[active];
  const DURATION = 6200;

  useEffect(() => {
    if (!playing || paused) return;
    const started = Date.now();
    timer.current = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - started) / DURATION) * 100);
      setProgress(pct);
      if (pct >= 100) setActive((value) => (value + 1) % campaigns.length);
    }, 60);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [active, paused, playing]);

  const select = (index: number) => { setActive((index + campaigns.length) % campaigns.length); setProgress(0); };
  const handleTouchStart = (event: TouchEvent) => { startX.current = event.touches[0]?.clientX ?? null; };
  const handleTouchEnd = (event: TouchEvent) => {
    if (startX.current === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? 0) - startX.current;
    if (Math.abs(distance) > 42) select(active + (distance < 0 ? 1 : -1));
    startX.current = null;
  };

  return (
    <section className="campaign-shell relative overflow-hidden border-b border-blue-200/10 text-white" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="campaign-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="campaign-glow pointer-events-none absolute -right-48 top-10 h-[34rem] w-[34rem]" style={{ background: `radial-gradient(circle, ${item.tint}55, transparent 68%)` }} />
      <div className="relative mx-auto flex min-h-[min(790px,100dvh)] max-w-[1500px] flex-col justify-between px-5 pb-6 pt-28 sm:px-8 md:px-16 md:pb-10 md:pt-32">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[.18em] text-blue-100/55">
          <span>Apple Guru / Chitwan, Nepal</span>
          <span className="hidden sm:inline">Premium tech / precision repair</span>
        </div>
        <div className="grid items-center gap-12 py-12 lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
          <div key={`copy-${active}`} className="campaign-in max-w-xl">
            <div className="mb-5 flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[.15em]" style={{ color: item.tint }}>
              <item.icon size={15} />
              <span>{item.eyebrow}</span>
            </div>
            <h1 className="max-w-3xl text-[clamp(3rem,8.3vw,8.1rem)] font-bold leading-[.9] tracking-[-.075em]">
              {item.title}<br /><span className="text-blue-300">{item.accent}</span>
            </h1>
            <p className="mt-7 max-w-md text-base leading-7 text-blue-50/65 md:text-lg">{item.detail}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button data-testid="button-campaign-primary" onClick={() => active === 2 ? onOpenExchange() : active === 3 ? onOpenRepair() : active === 4 ? onVisitShowroom() : onExplorePhones()} className="inline-flex min-h-12 items-center gap-3 bg-blue-400 px-5 text-[11px] font-bold uppercase tracking-[.12em] text-[#061021] transition-colors hover:bg-cyan-300">
                {item.cta}<ArrowRight size={16} />
              </button>
              <button data-testid="button-campaign-whatsapp" onClick={() => onOpenWhatsApp(`Hello Apple Guru. I am interested in the ${item.eyebrow} campaign.`)} className="inline-flex min-h-12 items-center gap-2 border border-blue-100/20 px-4 text-[11px] font-bold uppercase tracking-[.12em] text-blue-50/75 hover:border-blue-300 hover:text-white">
                <MessageCircle size={15} /> Ask the counter
              </button>
            </div>
          </div>
          <div key={`media-${active}`} className="campaign-in relative min-h-[280px] sm:min-h-[400px]">
            <div className="campaign-media relative ml-auto aspect-[1.24/1] w-full max-w-[760px] overflow-hidden bg-[#091126]">
              {item.kind === 'video' ? <video src={item.media} autoPlay muted loop playsInline className="h-full w-full object-cover" /> : <img src={item.media} alt={item.title} className="media-drift h-full w-full object-cover" />}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#050814]/55 via-transparent to-blue-200/10" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 border border-blue-100/20 bg-[#071127]/75 px-3 py-2 font-mono-ui text-[9px] uppercase tracking-[.14em] text-blue-100/65 backdrop-blur-md"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> Live showroom campaign</div>
              <div className="absolute right-4 top-4 font-mono-ui text-[9px] text-blue-50/55">AG / {String(active + 1).padStart(2, '0')}</div>
            </div>
            <div className="absolute -bottom-5 -left-2 hidden max-w-[180px] border-l border-blue-300/50 pl-3 text-[10px] uppercase leading-5 tracking-[.14em] text-blue-100/45 sm:block">Touch the future.<br />Keep it yours.</div>
          </div>
        </div>
        <div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2"><button data-testid="button-campaign-previous" onClick={() => select(active - 1)} aria-label="Previous campaign" className="grid h-10 w-10 place-items-center border border-blue-100/20 text-blue-100/70 hover:border-blue-300 hover:text-white"><ArrowLeft size={16} /></button><button data-testid="button-campaign-next" onClick={() => select(active + 1)} aria-label="Next campaign" className="grid h-10 w-10 place-items-center border border-blue-100/20 text-blue-100/70 hover:border-blue-300 hover:text-white"><ArrowRight size={16} /></button><button data-testid="button-campaign-play" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause campaign' : 'Play campaign'} className="ml-1 grid h-10 w-10 place-items-center border border-blue-100/20 text-blue-100/70 hover:border-blue-300 hover:text-white">{playing ? <Pause size={14} /> : <Play size={14} />}</button></div>
            <div className="flex items-center gap-2 text-right font-mono-ui text-[9px] uppercase tracking-[.16em] text-blue-100/50"><span>{String(active + 1).padStart(2, '0')}</span><span className="h-px w-8 bg-blue-100/20" /><span>{String(campaigns.length).padStart(2, '0')}</span><span className="hidden sm:inline">{paused ? 'Paused on hover' : 'Auto sequence'}</span></div>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {campaigns.map((campaign, index) => <button data-testid={`button-campaign-dot-${index}`} key={campaign.eyebrow} onClick={() => select(index)} aria-label={`Show ${campaign.eyebrow}`} className="group relative h-8 overflow-hidden border-t border-blue-100/20 text-left">
              <span className={`absolute left-0 top-0 h-px bg-blue-300 transition-[width] ${index === active ? '' : 'w-0 group-hover:w-full'}`} style={index === active ? { width: `${progress}%` } : undefined} />
              <span className={`font-mono-ui text-[8px] tracking-wider ${index === active ? 'text-blue-200' : 'text-blue-100/35'}`}>0{index + 1}</span>
            </button>)}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-3 right-5 hidden items-center gap-2 text-[9px] uppercase tracking-[.16em] text-blue-100/35 md:flex"><ArrowDownRight size={14} /> Swipe or choose a moment</div>
    </section>
  );
}