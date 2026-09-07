import React, { useState } from 'react';
import { funFacts } from '../data/funFacts';
import { FunFact } from '../types';
import { 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  HelpCircle, 
  ChevronRight,
  Lightbulb
} from 'lucide-react';

export const FunFactsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const categories = ['All', '📱 Smartphone', '🍎 Apple', '📷 Camera', '🔋 Battery', '🌐 Technology'];

  const filteredFacts = funFacts.filter(
    (f) => selectedCategory === 'All' || f.category === selectedCategory
  );

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyFact = (fact: FunFact, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Did you know? ${fact.headline} - ${fact.fact} (Source: Apple Guru Chitwan)`;
    navigator.clipboard.writeText(text);
    setCopiedId(fact.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareFact = (fact: FunFact, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Did you know? ${fact.headline} - ${fact.fact}`;
    if (navigator.share) {
      navigator.share({
        title: 'Tech Fact from Apple Guru',
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopyFact(fact, e);
    }
  };

  return (
    <section id="fun-facts-section" className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Background Watermark */}
      <div className="bg-word">TRIVIA</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="artistic-tag mb-4 justify-center">
            <div className="line" />
            <span>Interactive Tech Trivia & Secrets</span>
          </div>

          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-tight">
            DID YOU <span className="font-serif-artistic italic font-light text-[#D4AF37]">KNOW?</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-light mt-4 leading-relaxed max-w-2xl mx-auto">
            Fascinating engineering realities, historical milestones, and optical secrets powering the devices in your pocket. Click any card to dive deeper.
          </p>

          {/* Category Chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`facts-filter-${cat.replace(/[^a-zA-Z]/g, '').toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs uppercase font-mono tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFacts.map((fact) => {
            const isFlipped = !!flippedCards[fact.id];
            const isCopied = copiedId === fact.id;
            return (
              <div
                key={fact.id}
                id={`fact-card-${fact.id}`}
                onClick={() => toggleFlip(fact.id)}
                className="glass-surface rounded-xl p-8 border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden min-h-[320px] shadow-lg hover:shadow-2xl"
              >
                {/* Top Bar: Number & Category */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-white/30 group-hover:text-[#D4AF37] transition-colors">
                      0{fact.id < 10 ? `0${fact.id}` : fact.id}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 bg-black/80 text-[#D4AF37] border border-[#D4AF37]/20">
                      {fact.category}
                    </span>
                  </div>

                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] font-mono mb-2">
                    DID YOU KNOW?
                  </p>

                  <h3 className="text-xl font-bold text-white tracking-tight leading-snug group-hover:text-zinc-100">
                    {fact.headline}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed font-light">
                    {fact.fact}
                  </p>

                  {/* Revealed Detail on click */}
                  {isFlipped && (
                    <div className="mt-4 p-4 rounded-sm bg-[#09090b] border border-[#D4AF37]/30 text-xs text-zinc-300 animate-in fade-in duration-300">
                      <p className="font-bold text-[#D4AF37] uppercase font-mono tracking-wider mb-1">Deeper Context:</p>
                      <p>{fact.detail}</p>
                    </div>
                  )}
                </div>

                {/* Bottom Bar: Stat Highlight & Share Actions */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  {fact.highlightStat ? (
                    <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 border border-[#D4AF37]/30">
                      {fact.highlightStat}
                    </span>
                  ) : (
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {isFlipped ? 'Click to minimize' : 'Click to reveal'}
                    </span>
                  )}

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleCopyFact(fact, e)}
                      title="Copy fact to clipboard"
                      className="p-2 rounded-sm hover:bg-white/10 text-zinc-400 hover:text-[#D4AF37] transition-colors"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={(e) => handleShareFact(fact, e)}
                      title="Share fact"
                      className="p-2 rounded-sm hover:bg-white/10 text-zinc-400 hover:text-[#D4AF37] transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 text-center text-xs text-zinc-500 font-mono uppercase tracking-wider">
          Showing {filteredFacts.length} verified technology facts · Knowledge curated by Apple Guru Chitwan
        </div>

      </div>
    </section>
  );
};
