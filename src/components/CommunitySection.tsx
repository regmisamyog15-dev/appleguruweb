import React, { useState } from 'react';
import { 
  Sparkles, 
  Music, 
  Gift, 
  MessageCircle, 
  Bell, 
  CheckCircle2, 
  ChevronRight,
  Heart
} from 'lucide-react';

interface CommunitySectionProps {
  onOpenWhatsApp: (message?: string) => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  onOpenWhatsApp,
}) => {
  const [notificationRegistered, setNotificationRegistered] = useState(false);

  const eventMoments = [
    {
      title: 'Youth & Cultural Concert Gatherings',
      caption: 'Supporting local musicians, high-energy live stages, and creative student events across Chitwan.',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop',
      tag: 'Live Sound & Culture'
    },
    {
      title: 'Creators & Tech Community Meetups',
      caption: 'Empowering mobile photographers, videographers, and digital storytellers with flagship camera gear.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
      tag: 'Creative Energy'
    },
    {
      title: 'Festival Campaigns & Celebrations',
      caption: 'Bringing festive tech joy, special trade-in opportunities, and community togetherness to Bharatpur.',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
      tag: 'Festive Vibes'
    }
  ];

  const handleAlertSignup = () => {
    setNotificationRegistered(true);
    setTimeout(() => {
      onOpenWhatsApp('Hello Apple Guru! Please add me to the VIP alert list for upcoming giveaways, community events, and seasonal campaigns.');
    }, 800);
  };

  return (
    <section id="community-events-section" className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Background Watermark */}
      <div className="bg-word">COMMUNITY</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- PART 1: EVENTS & CONCERTS --- */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="artistic-tag mb-4 justify-center">
              <div className="line" />
              <span>Community & Culture</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              BEYOND <span className="font-serif-artistic italic font-light text-[#D4AF37]">TECHNOLOGY.</span>
            </h2>

            <p className="text-base sm:text-lg text-zinc-400 font-light mt-4 leading-relaxed max-w-2xl mx-auto">
              Technology comes alive through music, art, and shared moments. Apple Guru proudly participates in and supports energetic community concerts and creative experiences in Chitwan.
            </p>
          </div>

          {/* Editorial Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventMoments.map((evt, idx) => (
              <div
                key={idx}
                className="glass-surface rounded-xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-500 flex flex-col justify-between group"
              >
                <div className="aspect-[16/10] overflow-hidden relative bg-zinc-950">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] uppercase font-bold tracking-[2px] px-3 py-1 rounded-none bg-black/80 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-md">
                      {evt.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#D4AF37] transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                      {evt.caption}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Proud Chitwan Supporter</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- PART 2: GIVEAWAYS & EXCITING SURPRISES --- */}
        <div className="glass-surface p-8 sm:p-14 rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-[90px] pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <div className="artistic-tag mb-4">
                <div className="line" />
                <span>Upcoming Community Campaign</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                SOMETHING BIG <br />
                <span className="font-serif-artistic italic font-light text-[#D4AF37]">IS COMING.</span>
              </h3>

              <p className="text-sm sm:text-base text-zinc-300 mt-4 leading-relaxed max-w-xl">
                Stay connected for upcoming giveaways, seasonal campaigns, and surprises from the original Apple Guru showroom.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Exclusive in-store drops</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>VIP community early alerts</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Direct via WhatsApp broadcast</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <button
                id="giveaway-stay-updated-btn"
                onClick={handleAlertSignup}
                disabled={notificationRegistered}
                className={`btn-artistic btn-artistic-accent rounded-none sm:rounded-sm shadow-xl ${
                  notificationRegistered ? 'bg-emerald-600 text-white border-emerald-500' : ''
                }`}
              >
                {notificationRegistered ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ALERTS CONNECTED!</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4" />
                    <span>STAY UPDATED</span>
                  </>
                )}
              </button>

              <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 mt-3 text-left lg:text-right">
                Connect directly on WhatsApp: +977 9821552339
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
