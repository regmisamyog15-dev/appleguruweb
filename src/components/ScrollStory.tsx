import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

export function ScrollStory({ onExplore }: { onExplore: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .28 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const node = ref.current;
    const video = videoRef.current;
    if (!node || !video) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const next = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      setProgress(next);
      if (!reduceMotion && Number.isFinite(video.duration) && video.duration > 0) {
        video.currentTime = next * video.duration;
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return <section ref={ref} className="relative overflow-hidden border-b border-blue-100/10 bg-[#081126] px-5 py-20 md:px-16 md:py-28">
    <div className="mx-auto grid max-w-[1450px] items-center gap-12 md:grid-cols-[.7fr_1.3fr] md:gap-20">
      <div className={`transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <span className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-cyan-300">The device, revealed</span>
        <h2 className="mt-5 max-w-md text-4xl font-bold leading-[.96] tracking-[-.06em] text-blue-50 md:text-6xl">Good technology<br /><span className="text-blue-400">makes room.</span></h2>
        <p className="mt-6 max-w-sm text-sm leading-6 text-blue-100/60">Every part has a purpose. Every detail earns its place. See what sits beneath the surface.</p>
        <button data-testid="button-story-explore" onClick={onExplore} className="mt-8 inline-flex items-center gap-3 border-b border-blue-300 pb-2 text-[11px] font-bold uppercase tracking-[.13em] text-blue-200 hover:text-cyan-300">Explore the collection <ArrowRight size={15} /></button>
      </div>
      <div className="relative h-[330px] overflow-hidden border border-blue-100/10 bg-[#050814] md:h-[500px]">
        <video
          ref={videoRef}
          data-testid="video-exploded-phone"
          src="/assets/user/iphone-explode.mp4"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(event) => {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && Number.isFinite(event.currentTarget.duration)) {
              event.currentTarget.currentTime = progress * event.currentTarget.duration;
            }
          }}
          className={`story-video absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ${visible ? 'scale-100' : 'scale-110'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081126] via-transparent to-[#081126]/15" />
        <div className="absolute bottom-5 right-5 h-px w-24 bg-blue-100/15">
          <span className="block h-full bg-cyan-300 transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="absolute bottom-5 left-5 font-mono-ui text-[9px] uppercase tracking-[.16em] text-blue-100/50"><ArrowDown size={14} className="mb-2 text-cyan-300" />Structure / signal / feeling</div>
      </div>
    </div>
  </section>;
}