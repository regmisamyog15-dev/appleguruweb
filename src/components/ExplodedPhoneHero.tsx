import { ArrowRight, MapPin, MessageCircle } from 'lucide-react';

type ExplodedPhoneMediaProps = {
  compact?: boolean;
  label?: string;
};

export function ExplodedPhoneMedia({ compact = false, label = 'Exploded iPhone study' }: ExplodedPhoneMediaProps) {
  return (
    <div className={`exploded-media relative overflow-hidden border border-[#163a78] bg-[#02050b] ${compact ? 'aspect-[16/8]' : 'aspect-[4/3] md:aspect-[1.16/1]'}`}>
      <div className="texture-grid pointer-events-none absolute inset-0 opacity-40" />
      <video
        data-testid={compact ? 'video-repair-exploded-phone' : 'video-exploded-phone'}
        src="/assets/user/iphone-explode.mp4"
        poster="/assets/user/iphone-explode-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="relative z-10 h-full w-full bg-[#080d16] object-contain"
      />
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-[#02050b]/75 via-transparent to-[#246bdb]/10" />
      <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2 border border-blue-300/20 bg-[#030711]/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.12em] text-blue-100/75 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2f7df4]" />
        {label}
      </div>
      <div className="absolute right-4 top-4 z-30 font-mono-ui text-[9px] uppercase tracking-[.12em] text-blue-100/50">AG / 01</div>
    </div>
  );
}

export function ExplodedPhoneHero({
  onExplorePhones,
  onVisitShowroom,
  onOpenWhatsApp,
}: {
  onExplorePhones: () => void;
  onVisitShowroom: () => void;
  onOpenWhatsApp: (message: string) => void;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[#10264a] bg-[#050505]">
      <div className="texture-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto grid min-h-[720px] max-w-[1440px] items-center gap-12 px-5 py-16 md:grid-cols-[.86fr_1.14fr] md:px-16 md:py-24">
        <div className="max-w-xl">
          <div className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.16em] text-[#5e9bf9]">
            <MapPin size={15} />
            Apple Guru / Chitwan, Nepal
          </div>
          <h1 className="max-w-xl text-[clamp(2.8rem,6.7vw,6.7rem)] font-semibold leading-[.96] tracking-[-.055em] text-[#f3f7ff]">
            Technology,
            <br />
            selected with
            <br />
            <span className="text-[#347ef0]">intent.</span>
          </h1>
          <p className="mt-7 max-w-md text-base leading-7 text-[#aab8ce] md:text-lg">
            New phones, clear advice, and a repair desk that keeps your everyday technology moving.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button data-testid="button-hero-explore" onClick={onExplorePhones} className="inline-flex min-h-12 items-center gap-3 bg-[#2563d8] px-5 text-[11px] font-bold uppercase tracking-[.1em] text-white transition-colors hover:bg-[#347ef0]">
              Explore devices <ArrowRight size={16} />
            </button>
            <button data-testid="button-hero-whatsapp" onClick={() => onOpenWhatsApp('Hello Apple Guru. I would like help choosing a device.')} className="inline-flex min-h-12 items-center gap-2 border border-[#244b87] px-4 text-[11px] font-bold uppercase tracking-[.1em] text-[#c7d9f7] transition-colors hover:border-[#5e9bf9] hover:text-white">
              <MessageCircle size={15} /> Talk to the counter
            </button>
          </div>
          <button onClick={onVisitShowroom} className="mt-8 text-left text-sm text-[#7692bb] transition-colors hover:text-[#5e9bf9]">
            Visit the original Apple Guru showroom <ArrowRight size={14} className="ml-1 inline" />
          </button>
        </div>
        <ExplodedPhoneMedia label="Continuous device anatomy" />
      </div>
    </section>
  );
}