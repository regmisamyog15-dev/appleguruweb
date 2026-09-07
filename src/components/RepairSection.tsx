import React, { useState } from 'react';
import { repairServices } from '../data/repairServices';
import { RepairService } from '../types';
import { 
  Wrench, 
  Cpu, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  MessageCircle, 
  CheckCircle2, 
  ChevronRight,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface RepairSectionProps {
  onOpenWhatsApp: (message?: string) => void;
  onSelectService?: (service: RepairService) => void;
}

export const RepairSection: React.FC<RepairSectionProps> = ({
  onOpenWhatsApp,
  onSelectService,
}) => {
  const [selectedService, setSelectedService] = useState<RepairService>(repairServices[0]);
  const [activeWorkflowStage, setActiveWorkflowStage] = useState(0);

  const workflowStages = [
    {
      title: '01. DAMAGED DEVICE',
      desc: 'Cracked outer glass, failing battery, liquid exposure, or silent motherboard short.',
      badge: 'Arrival & Intake'
    },
    {
      title: '02. MICROSCOPIC INSPECTION',
      desc: 'Thermal infrared mapping and component-level stereoscopic diagnostics in our clean lab.',
      badge: 'Diagnostics'
    },
    {
      title: '03. PRECISION REPAIR',
      desc: 'Laser glass de-lamination, BMS spot-welding, and micro-soldering pad restoration.',
      badge: 'Cleanroom Procedure'
    },
    {
      title: '04. READY DEVICE',
      desc: 'Tested for waterproof seal, True Tone calibration, full diagnostics, and returned like new.',
      badge: 'Certified Handover'
    }
  ];

  const handleRequestQuote = (service: RepairService) => {
    const msg = `Hello Apple Guru Lab! I need a repair quote for ${service.title}. My phone is having symptoms: ${service.symptoms[0]}. Please advise on timeline and cost at your Chitwan lab.`;
    onOpenWhatsApp(msg);
  };

  return (
    <section id="repair-lab-section" className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Background Watermark */}
      <div className="bg-word">SURGERY</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="artistic-tag mb-4 justify-center">
            <div className="line" />
            <span>Chitwan’s Precision Micro-Soldering Lab</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            DAMAGED PHONE?<br />
            <span className="font-serif-artistic italic font-light text-[#D4AF37]">WE CAN HELP.</span>
          </h2>

          <p className="text-base sm:text-xl text-zinc-300 font-light mt-4 leading-relaxed max-w-2xl mx-auto text-balance">
            We don’t just swap assemblies; we understand component architecture. From cracked OLED glass refurbishment to Level 3 logic board micro-soldering.
          </p>

          <p className="text-xs text-zinc-400 mt-3 italic max-w-md mx-auto font-mono">
            * Note: While our success rate on micro-soldering and liquid revival is high, every repair begins with honest diagnostic feasibility. We never guarantee unfixable board trauma without testing.
          </p>
        </div>

        {/* Realistic Interactive Repair Progression */}
        <div className="glass-surface p-6 sm:p-10 rounded-2xl border border-white/10 mb-20 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <div className="artistic-tag mb-1">
                <div className="line" />
                <span>The Laboratory Methodology</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                From Impact Trauma to Factory Restoration
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {workflowStages.map((st, i) => (
                <button
                  key={i}
                  onClick={() => setActiveWorkflowStage(i)}
                  className={`w-3 h-3 rounded-none transition-all ${
                    activeWorkflowStage === i ? 'bg-[#D4AF37] scale-125 shadow-md' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  title={st.title}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowStages.map((stage, idx) => {
              const isSelected = activeWorkflowStage === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveWorkflowStage(idx)}
                  className={`p-6 rounded-sm border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] shadow-xl scale-[1.02]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[2px] text-[#D4AF37] px-2 py-0.5 rounded-none bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                    {stage.badge}
                  </span>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white mt-4">{stage.title}</h4>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{stage.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Macro Photography Lab Cards (6 surgical service modules) */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                SPECIALIZED LAB SERVICES
              </h3>
              <p className="text-xs text-zinc-400">Microscopic equipment, OEM-spec components, and calibrated cleanroom tools</p>
            </div>
            <span className="text-[10px] text-[#D4AF37] font-mono tracking-[2px] uppercase hidden sm:inline">
              IN-HOUSE AT INDRA DEV MARGA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repairServices.map((service) => (
              <div
                key={service.id}
                id={`repair-card-${service.id}`}
                className="glass-surface rounded-xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-500 flex flex-col justify-between group"
              >
                <div>
                  {/* Macro Photography Image */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-zinc-950">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-none border border-[#D4AF37]/30 text-[9px] uppercase font-mono tracking-wider text-[#D4AF37]">
                      {service.turnaroundTime}
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-[#D4AF37] transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Common Symptoms List */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-[10px] uppercase tracking-[1.5px] text-zinc-400 font-bold mb-2">
                        Common Indicators:
                      </p>
                      <ul className="space-y-1 text-xs text-zinc-400">
                        {service.symptoms.slice(0, 3).map((sym, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                            <span className="truncate">{sym}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleRequestQuote(service)}
                      className="btn-artistic btn-artistic-accent w-full justify-center rounded-none sm:rounded-sm shadow-md"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-black" />
                      <span>Request Quote & Diagnosis</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Lab Symptom Checker */}
        <div className="glass-surface p-8 sm:p-12 rounded-2xl border border-white/10 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="artistic-tag mb-2">
              <div className="line" />
              <span>Live Lab Assistance</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-2">
              Have a Damaged Phone Right Now?
            </h3>
            <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
              Don't attempt rice or DIY heat guns on modern flagships—these often oxidize delicate motherboard traces. Bring your phone directly to our Indra Dev Marga lab for cold-separation or power diagnostics.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-zinc-300">
              <div className="flex items-center gap-2 bg-white/[0.03] px-3 py-2 rounded-sm border border-white/10">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>30-90 Min Express Service for Glass & Battery</span>
              </div>
              <div className="flex items-center gap-2 bg-white/[0.03] px-3 py-2 rounded-sm border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Genuine Part Serial Calibration</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center sm:items-end justify-center">
            <button
              onClick={() => onOpenWhatsApp('Hello Apple Guru Lab! My smartphone has been damaged. I would like an urgent diagnostic consultation.')}
              className="btn-artistic btn-artistic-accent w-full sm:w-auto rounded-none sm:rounded-sm shadow-xl"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>WHATSAPP THE LAB TECHNICIAN</span>
            </button>
            <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 mt-2">
              Direct Helpline: 9821552339 · Indra Dev Marga, Chitwan
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
