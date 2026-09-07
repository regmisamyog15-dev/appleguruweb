import { useEffect, useRef, useState } from 'react';

export function RepairMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { threshold: .35 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} aria-hidden="true" className="relative my-14 h-32 overflow-hidden border-y border-blue-100/10 bg-[#071329] md:h-44">
    <div className={`absolute inset-0 transition-transform duration-[1400ms] ease-out ${on ? 'translate-x-0 scale-100' : '-translate-x-16 scale-110'}`}>
      <img src="/assets/stitch/ultra_photorealistic_premium_smartphone_repair_workshop_scene._a_modern.png" alt="" className="h-full w-full object-cover opacity-45 grayscale" />
    </div>
    <div className={`absolute inset-0 bg-gradient-to-r from-[#071329] via-transparent to-[#071329] transition-opacity duration-700 ${on ? 'opacity-80' : 'opacity-100'}`} />
    <div className={`absolute inset-y-0 left-[18%] w-px bg-cyan-300/70 transition-transform duration-[1400ms] ${on ? 'translate-x-[48vw]' : '-translate-x-8'}`} />
    <div className={`absolute inset-y-0 left-[42%] w-px bg-blue-300/40 transition-transform duration-[1400ms] delay-100 ${on ? '-translate-x-[22vw]' : 'translate-x-8'}`} />
    <div className={`absolute left-0 right-0 top-1/2 h-px bg-blue-200/25 transition-transform duration-[1200ms] ${on ? 'scale-x-100' : 'scale-x-50'}`} />
  </div>;
}