import React, { useState } from 'react';
import { 
  Smartphone, 
  Bell, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  Search,
  RefreshCcw,
  Wrench
} from 'lucide-react';

interface AppPreviewSectionProps {
  onOpenWhatsApp: (message?: string) => void;
}

export const AppPreviewSection: React.FC<AppPreviewSectionProps> = ({
  onOpenWhatsApp,
}) => {
  const [notified, setNotified] = useState(false);

  const handleNotify = () => {
    setNotified(true);
    setTimeout(() => {
      onOpenWhatsApp('Hello Apple Guru! Please notify me when the official Apple Guru App launches in Chitwan.');
    }, 600);
  };

  return (
    <section id="app-preview-section" className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Background Watermark */}
      <div className="bg-word">MOBILE</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-surface rounded-2xl border border-white/10 p-8 sm:p-16 relative overflow-hidden shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[120px] pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Column: Conceptual Launch Story */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="artistic-tag mb-6">
                <div className="line" />
                <span>Official Mobile Experience</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[0.95]">
                APPLE GURU,<br />
                <span className="font-serif-artistic italic font-light text-[#D4AF37]">IN YOUR HAND.</span>
              </h2>

              <p className="text-base sm:text-lg text-zinc-300 font-light mt-5 leading-relaxed max-w-xl">
                We are crafting an award-grade mobile app to bring the entire Indra Dev Marga showroom experience to your pocket.
              </p>

              {/* Conceptual Feature Highlights */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-sm bg-white/[0.02] border border-white/10 flex items-start gap-3 hover:border-[#D4AF37]/30 transition-all">
                  <div className="p-2 rounded-sm bg-white/5 text-[#D4AF37] border border-white/10 shrink-0">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Live Showroom Inventory</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Check real-time stock and color variants before visiting.</p>
                  </div>
                </div>

                <div className="p-4 rounded-sm bg-white/[0.02] border border-white/10 flex items-start gap-3 hover:border-[#D4AF37]/30 transition-all">
                  <div className="p-2 rounded-sm bg-white/5 text-[#D4AF37] border border-white/10 shrink-0">
                    <RefreshCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Digital Trade-In</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Instant valuations on current second-hand device rates.</p>
                  </div>
                </div>

                <div className="p-4 rounded-sm bg-white/[0.02] border border-white/10 flex items-start gap-3 hover:border-[#D4AF37]/30 transition-all">
                  <div className="p-2 rounded-sm bg-white/5 text-[#D4AF37] border border-white/10 shrink-0">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Live Repair Tracker</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Track your device through microscopic lab repair stages.</p>
                  </div>
                </div>

                <div className="p-4 rounded-sm bg-white/[0.02] border border-white/10 flex items-start gap-3 hover:border-[#D4AF37]/30 transition-all">
                  <div className="p-2 rounded-sm bg-white/5 text-[#D4AF37] border border-white/10 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">VIP Drop Alerts</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">First access to limited flagship batches and community giveaways.</p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <button
                  id="app-get-notified-btn"
                  onClick={handleNotify}
                  disabled={notified}
                  className={`btn-artistic btn-artistic-accent rounded-none sm:rounded-sm shadow-xl ${
                    notified ? 'bg-emerald-600 text-white border-emerald-500' : ''
                  }`}
                >
                  {notified ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>YOU'RE ON THE VIP LIST!</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-4 h-4" />
                      <span>GET NOTIFIED AT LAUNCH</span>
                    </>
                  )}
                </button>
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">iOS & Android · Free in Chitwan</span>
              </div>
            </div>

            {/* Right Column: Conceptual Smartphone Mockup Frame */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-[280px] sm:w-[320px] h-[560px] rounded-[40px] bg-black border-4 border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden relative p-4 flex flex-col justify-between">
                
                {/* Dynamic Island Notch */}
                <div className="w-24 h-5 bg-black rounded-full mx-auto mb-2 border border-white/15 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                </div>

                {/* Conceptual Screen Interface */}
                <div className="flex-1 bg-[#09090b] rounded-[28px] p-4 flex flex-col justify-between border border-white/5 relative overflow-hidden">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-none bg-[#D4AF37] text-black flex items-center justify-center text-[9px] font-bold">
                          AG
                        </div>
                        <span className="text-xs font-bold text-white tracking-wider uppercase">Apple Guru</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-none bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-mono">
                        Chitwan Live
                      </span>
                    </div>

                    <div className="mt-4 p-3 rounded-sm bg-white/[0.03] border border-white/10">
                      <p className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">Today's Highlight</p>
                      <p className="text-sm font-bold text-white mt-0.5">iPhone 16 Pro Max</p>
                      <p className="text-[10px] text-[#D4AF37] font-mono mt-0.5">In Stock · Desert Titanium</p>
                    </div>

                    <div className="mt-3 p-3 rounded-sm bg-white/[0.02] border border-white/5">
                      <p className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">Repair Lab Status</p>
                      <p className="text-xs font-semibold text-white mt-0.5">Display Turnaround: 45 min</p>
                    </div>

                    <div className="mt-3 p-3 rounded-sm bg-white/[0.02] border border-white/5">
                      <p className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">Exchange Trade-In</p>
                      <p className="text-xs font-semibold text-white mt-0.5">Instant quote in 3 taps</p>
                    </div>
                  </div>

                  <div className="btn-artistic btn-artistic-accent w-full justify-center text-[10px] py-2 rounded-none shadow-md">
                    Explore Showroom Catalog
                  </div>
                </div>

                {/* Home indicator bar */}
                <div className="w-24 h-1 bg-white/40 rounded-full mx-auto mt-3" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
