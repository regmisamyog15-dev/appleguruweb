import React from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Navigation, 
  Clock, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

interface LocationSectionProps {
  onOpenWhatsApp: (message?: string) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  onOpenWhatsApp,
}) => {
  const mapQuery = "Apple+Guru,+Indra+dev+Hall,+Bharatpur+44200";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=Apple+Guru,+Indra+dev+Hall,+Bharatpur+44200&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location-section" className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Background Watermark */}
      <div className="bg-word">LOCATION</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="artistic-tag mb-4 justify-center">
            <div className="line" />
            <span>Visit The Original Showroom</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            INDRA DEV MARGA.<br />
            <span className="font-serif-artistic italic font-light text-[#D4AF37]">CHITWAN, NEPAL.</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed max-w-xl mx-auto">
            Experience the flagship devices in person. Test displays, evaluate trade-in valuations on the spot, or consult with our master lab technicians.
          </p>
        </div>

        {/* Premium Map & Showroom Bento Card */}
        <div className="glass-surface rounded-2xl overflow-hidden border border-white/10 shadow-2xl grid lg:grid-cols-12">
          
          {/* Left / Top: Interactive Google Map */}
          <div className="lg:col-span-7 h-[380px] lg:h-auto min-h-[380px] relative bg-zinc-950">
            <iframe
              title="Apple Guru Indra Dev Marga Location Map"
              src={mapEmbedUrl}
              className="w-full h-full border-0 filter grayscale contrast-125 invert opacity-85 hover:opacity-100 transition-opacity"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {/* Map Overlay Pill */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-sm border border-[#D4AF37]/30 shadow-lg flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Apple Guru Showroom</p>
                <p className="text-[10px] text-zinc-400 font-mono">Near Indra Dev Cinema Hall</p>
              </div>
            </div>
          </div>

          {/* Right / Bottom: Verified Location Details & Conversion CTAs */}
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <div className="artistic-tag mb-1">
                <div className="line" />
                <span>Physical Destination</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Indra Dev Marga
              </h3>
              <p className="text-sm text-zinc-300 mt-1 font-mono">
                Bharatpur 44200, Chitwan, Nepal
              </p>

              <div className="mt-6 space-y-4 text-xs text-zinc-300">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white uppercase tracking-wider">Showroom & Lab Availability</p>
                    <p className="text-zinc-400 mt-0.5">Open 7 days a week for hardware testing, trade-ins, and same-day lab repairs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white uppercase tracking-wider">Direct Telephone Helpline</p>
                    <a href="tel:9821552339" className="text-[#D4AF37] hover:underline text-sm font-bold font-mono">
                      +977 9821552339
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white uppercase tracking-wider">3+ Years In Chitwan</p>
                    <p className="text-zinc-400 mt-0.5">Authentic flagship stock, clean MDMS status, and genuine lab warranties.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Three Core CTAs: GET DIRECTIONS, CALL NOW, WHATSAPP */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <a
                id="location-directions-btn"
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-artistic btn-artistic-accent w-full justify-center rounded-none sm:rounded-sm shadow-lg text-xs"
              >
                <Navigation className="w-4 h-4 text-black" />
                <span>GET DIRECTIONS ON GOOGLE MAPS</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-800" />
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  id="location-call-btn"
                  href="tel:9821552339"
                  className="btn-artistic btn-artistic-outline text-xs py-2.5 px-3 rounded-none sm:rounded-sm justify-center"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>CALL NOW</span>
                </a>

                <button
                  id="location-whatsapp-btn"
                  onClick={() => onOpenWhatsApp('Hello Apple Guru! I would like directions to your showroom at Indra Dev Marga.')}
                  className="btn-artistic btn-artistic-accent text-xs py-2.5 px-3 rounded-none sm:rounded-sm justify-center"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-black" />
                  <span>WHATSAPP</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
