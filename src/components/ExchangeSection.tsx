import React, { useState } from 'react';
import { 
  RefreshCcw, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  HelpCircle, 
  ShieldCheck,
  ChevronRight,
  Calculator
} from 'lucide-react';
import { Product } from '../types';

interface ExchangeSectionProps {
  onOpenWhatsApp: (message?: string) => void;
  targetProduct?: Product | null;
}

interface TradeInModel {
  name: string;
  brand: string;
  baseValuationLow: number; // in NPR
  baseValuationHigh: number;
}

const tradeInModels: TradeInModel[] = [
  // iPhones
  { name: 'iPhone 15 Pro Max', brand: 'Apple', baseValuationLow: 110000, baseValuationHigh: 135000 },
  { name: 'iPhone 15 Pro', brand: 'Apple', baseValuationLow: 95000, baseValuationHigh: 115000 },
  { name: 'iPhone 15', brand: 'Apple', baseValuationLow: 75000, baseValuationHigh: 90000 },
  { name: 'iPhone 14 Pro Max', brand: 'Apple', baseValuationLow: 85000, baseValuationHigh: 105000 },
  { name: 'iPhone 14 Pro', brand: 'Apple', baseValuationLow: 75000, baseValuationHigh: 92000 },
  { name: 'iPhone 14', brand: 'Apple', baseValuationLow: 60000, baseValuationHigh: 72000 },
  { name: 'iPhone 13 Pro Max', brand: 'Apple', baseValuationLow: 65000, baseValuationHigh: 80000 },
  { name: 'iPhone 13 Pro', brand: 'Apple', baseValuationLow: 55000, baseValuationHigh: 68000 },
  { name: 'iPhone 13', brand: 'Apple', baseValuationLow: 45000, baseValuationHigh: 55000 },
  { name: 'iPhone 12 Pro Max', brand: 'Apple', baseValuationLow: 45000, baseValuationHigh: 58000 },
  { name: 'iPhone 12', brand: 'Apple', baseValuationLow: 32000, baseValuationHigh: 42000 },
  { name: 'iPhone 11', brand: 'Apple', baseValuationLow: 22000, baseValuationHigh: 30000 },
  
  // Samsung
  { name: 'Galaxy S24 Ultra', brand: 'Samsung', baseValuationLow: 95000, baseValuationHigh: 120000 },
  { name: 'Galaxy S23 Ultra', brand: 'Samsung', baseValuationLow: 70000, baseValuationHigh: 88000 },
  { name: 'Galaxy S22 Ultra', brand: 'Samsung', baseValuationLow: 50000, baseValuationHigh: 65000 },
  { name: 'Galaxy Z Fold 5', brand: 'Samsung', baseValuationLow: 85000, baseValuationHigh: 110000 },
  { name: 'Galaxy Z Flip 5', brand: 'Samsung', baseValuationLow: 45000, baseValuationHigh: 60000 },
  { name: 'Other Flagship / Android', brand: 'Other', baseValuationLow: 20000, baseValuationHigh: 45000 }
];

const conditions = [
  { id: 'flawless', label: 'Flawless (Grade A+)', desc: 'Zero scratches, 90%+ battery, never opened, full box', multiplier: 1.0 },
  { id: 'good', label: 'Good (Minor wear)', desc: 'Light micro-scratches on bezel, 80%+ battery, everything works', multiplier: 0.88 },
  { id: 'cracked_glass', label: 'Cracked Front/Back Glass', desc: 'Display touch works, but glass is fractured', multiplier: 0.65 },
  { id: 'heavy_wear', label: 'Heavy Wear / Functional Issue', desc: 'Battery service needed, dents, or sensor failure', multiplier: 0.45 }
];

export const ExchangeSection: React.FC<ExchangeSectionProps> = ({
  onOpenWhatsApp,
  targetProduct,
}) => {
  const [selectedModel, setSelectedModel] = useState<TradeInModel>(tradeInModels[0]);
  const [selectedCondition, setSelectedCondition] = useState(conditions[0]);
  const [activeStep, setActiveStep] = useState(1);

  const estimatedLow = Math.round(selectedModel.baseValuationLow * selectedCondition.multiplier / 1000) * 1000;
  const estimatedHigh = Math.round(selectedModel.baseValuationHigh * selectedCondition.multiplier / 1000) * 1000;

  const handleWhatsAppExchange = () => {
    const text = `Hello Apple Guru! I want to trade in my ${selectedModel.name} in ${selectedCondition.label} condition.${targetProduct ? ` I am looking to upgrade to ${targetProduct.name}.` : ''} Please provide an appraisal consultation at your Chitwan showroom.`;
    onOpenWhatsApp(text);
  };

  return (
    <section id="exchange-section" className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Background Watermark */}
      <div className="bg-word">UPGRADE</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="artistic-tag mb-4 justify-center">
            <div className="line" />
            <span>Chitwan’s Most Competitive Trade-In Values</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            TRADE IN.<br />
            <span className="font-serif-artistic italic font-light text-[#D4AF37]">LEVEL UP.</span>
          </h2>

          <p className="text-base sm:text-xl text-zinc-300 font-light mt-4 leading-relaxed max-w-2xl mx-auto text-balance">
            Bring your current phone to Apple Guru. After assessment, its exchange value can be deducted directly from your new phone purchase.
          </p>
        </div>

        {/* Visual Transformation Flow: OLD PHONE -> ASSESSMENT -> EXCHANGE VALUE -> NEW PHONE */}
        <div className="glass-surface p-6 sm:p-10 rounded-2xl border border-white/10 mb-16 shadow-2xl">
          <div className="artistic-tag mb-8 justify-center">
            <div className="line" />
            <span>The Visual Upgrade Transformation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* 01 OLD PHONE */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col items-center text-center relative group hover:border-[#D4AF37]/30 transition-all">
              <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-[#D4AF37] font-mono text-base font-bold">
                01
              </div>
              <h4 className="text-base font-bold text-white mb-1 uppercase tracking-wider">Old Phone</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Bring your current iPhone, Samsung, or Android device in any working state.
              </p>
              <div className="mt-4 text-[9px] uppercase font-mono tracking-widest text-zinc-400 bg-white/5 px-2.5 py-1 rounded-none border border-white/10">
                Physical Hand-In
              </div>
            </div>

            {/* 02 ASSESSMENT */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col items-center text-center relative group hover:border-[#D4AF37]/30 transition-all">
              <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-[#D4AF37] font-mono text-base font-bold">
                02
              </div>
              <h4 className="text-base font-bold text-white mb-1 uppercase tracking-wider">Assessment</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                10-minute diagnostic for screen, battery cycle health, cameras, and housing.
              </p>
              <div className="mt-4 text-[9px] uppercase font-mono tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-none border border-[#D4AF37]/30">
                10 Min Verification
              </div>
            </div>

            {/* 03 EXCHANGE VALUE */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col items-center text-center relative group hover:border-[#D4AF37]/30 transition-all">
              <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-[#D4AF37] font-mono text-base font-bold">
                03
              </div>
              <h4 className="text-base font-bold text-white mb-1 uppercase tracking-wider">Exchange Value</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Instant valuation based on real-time market secondary rates applied as instant credit.
              </p>
              <div className="mt-4 text-[9px] uppercase font-mono tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-none border border-[#D4AF37]/30">
                Instant Credit
              </div>
            </div>

            {/* 04 NEW PHONE */}
            <div className="p-6 rounded-xl bg-[#D4AF37]/[0.06] border border-[#D4AF37]/40 flex flex-col items-center text-center relative shadow-lg">
              <div className="w-12 h-12 rounded-sm bg-[#D4AF37] text-[#050505] flex items-center justify-center mb-4 font-mono text-base font-black shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                04
              </div>
              <h4 className="text-base font-bold text-white mb-1 uppercase tracking-wider">New Flagship</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Walk out with your sealed iPhone 16 Pro, S25 Ultra, or Mac with full data transferred.
              </p>
              <div className="mt-4 text-[9px] uppercase font-mono tracking-widest text-[#050505] bg-[#D4AF37] px-2.5 py-1 rounded-none font-bold">
                Upgraded & Protected
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Trade-In Calculator */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Left: Input Selection */}
          <div className="lg:col-span-7 glass-surface p-6 sm:p-8 rounded-xl border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-lg uppercase tracking-wider font-bold text-white">
                Interactive Trade-In Value Estimator
              </h3>
            </div>

            {/* Step A: Select Device */}
            <div className="mb-6">
              <label className="block text-[10px] uppercase tracking-[2px] text-zinc-400 font-bold mb-2">
                Step 1: Select Your Current Device
              </label>
              <select
                id="tradein-device-select"
                value={selectedModel.name}
                onChange={(e) => {
                  const found = tradeInModels.find(m => m.name === e.target.value);
                  if (found) setSelectedModel(found);
                }}
                className="w-full bg-[#111116] border border-white/15 rounded-sm px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              >
                {tradeInModels.map((m) => (
                  <option key={m.name} value={m.name} className="bg-zinc-900 text-white">
                    {m.brand}: {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Step B: Select Condition */}
            <div>
              <label className="block text-[10px] uppercase tracking-[2px] text-zinc-400 font-bold mb-2.5">
                Step 2: Device Physical Condition
              </label>
              <div className="space-y-2.5">
                {conditions.map((cond) => (
                  <button
                    key={cond.id}
                    id={`condition-radio-${cond.id}`}
                    onClick={() => setSelectedCondition(cond)}
                    className={`w-full p-3.5 rounded-sm text-left border transition-all flex items-start justify-between ${
                      selectedCondition.id === cond.id
                        ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white'
                        : 'bg-white/[0.02] border-white/10 text-zinc-300 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold">{cond.label}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">{cond.desc}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-none border mt-1 shrink-0 ${
                      selectedCondition.id === cond.id ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-zinc-500'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Calculated Valuation Output & Action */}
          <div className="lg:col-span-5 glass-surface p-6 sm:p-8 rounded-xl border border-white/15 relative shadow-2xl">
            <span className="text-[9px] uppercase font-bold tracking-[2px] text-[#D4AF37]">
              Estimated In-Store Credit
            </span>

            <div className="mt-4 p-6 rounded-sm bg-white/[0.03] border border-white/10 text-center">
              <p className="text-xs text-zinc-400 font-medium">Estimated Trade-In Range</p>
              <p className="text-3xl sm:text-4xl font-bold text-[#D4AF37] mt-1 tracking-tight font-mono">
                Rs. {(estimatedLow).toLocaleString()} – Rs. {(estimatedHigh).toLocaleString()}
              </p>
              <p className="text-[11px] text-zinc-400 mt-2">
                Deductible immediately against any new phone at our Chitwan showroom
              </p>
            </div>

            <div className="mt-6 space-y-3 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Zero hassle: We handle 100% encrypted data transfer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Transparent physical inspection right in front of you</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Full device sanitization and factory reset guarantee</span>
              </div>
            </div>

            {/* Conversion CTA (Artistic Flair Button) */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <button
                id="exchange-start-cta-btn"
                onClick={handleWhatsAppExchange}
                className="btn-artistic btn-artistic-accent w-full justify-center rounded-none sm:rounded-sm shadow-xl"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>CLAIM VALUATION ON WHATSAPP</span>
              </button>

              <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 text-center">
                Showroom: Indra Dev Marga, Chitwan · 9821552339
              </p>
            </div>
          </div>
        </div>

        {/* 4-Step Walkthrough Details */}
        <div className="border-t border-white/10 pt-16">
          <div className="max-w-3xl mb-12">
            <div className="artistic-tag mb-3">
              <div className="line" />
              <span>Step-By-Step Procedure</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              HOW IT <span className="font-serif-artistic italic font-light text-[#D4AF37]">WORKS.</span>
            </h3>
            <p className="text-zinc-400 text-sm mt-1">
              A frictionless 4-step path from your current device to your next flagship.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 rounded-sm glass-surface border border-white/10 hover:border-[#D4AF37]/40 transition-all">
              <span className="font-mono text-xs text-[#D4AF37] font-bold">01</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mt-2">Bring your phone</h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Visit our Indra Dev Marga showroom with your device, cable, or original box if available.
              </p>
            </div>

            <div className="p-6 rounded-sm glass-surface border border-white/10 hover:border-[#D4AF37]/40 transition-all">
              <span className="font-mono text-xs text-[#D4AF37] font-bold">02</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mt-2">Device assessment</h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Our technicians test the OLED panel, battery degradation, and motherboard health in 10 minutes.
              </p>
            </div>

            <div className="p-6 rounded-sm glass-surface border border-white/10 hover:border-[#D4AF37]/40 transition-all">
              <span className="font-mono text-xs text-[#D4AF37] font-bold">03</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mt-2">Receive valuation</h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                We provide a clear, fair cash-equivalent value based on current Chitwan market prices.
              </p>
            </div>

            <div className="p-6 rounded-sm glass-surface border border-[#D4AF37]/40 bg-[#D4AF37]/[0.03]">
              <span className="font-mono text-xs text-[#D4AF37] font-bold">04</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mt-2">Upgrade instantly</h4>
              <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                Pay only the difference and enjoy your new sealed flagship device with full support.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
