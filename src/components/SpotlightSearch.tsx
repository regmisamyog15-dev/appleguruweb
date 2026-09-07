import React, { useState, useEffect, useRef } from 'react';
import { products } from '../data/products';
import { repairServices } from '../data/repairServices';
import { blogPosts } from '../data/blogPosts';
import { funFacts } from '../data/funFacts';
import { Product, BlogPost, RepairService, PageView } from '../types';
import { 
  Search, 
  X, 
  Smartphone, 
  Wrench, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  MapPin
} from 'lucide-react';

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectArticle: (article: BlogPost) => void;
  onSelectService: (service: RepairService) => void;
  onNavigate: (page: PageView) => void;
}

type SearchItem = 
  | { type: 'product'; data: Product }
  | { type: 'service'; data: RepairService }
  | { type: 'article'; data: BlogPost }
  | { type: 'fact'; title: string; category: string; text: string }
  | { type: 'action'; title: string; description: string; page: PageView };

export const SpotlightSearch: React.FC<SpotlightSearchProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectArticle,
  onSelectService,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isOpen]);

  // Global Esc and Cmd+K handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter items
  const cleanQuery = query.toLowerCase().trim();

  const filteredItems: SearchItem[] = cleanQuery === '' 
    ? [
        { type: 'action', title: 'Explore Flagship Devices', description: 'Browse Apple, Samsung, and Mac collection', page: 'phones' },
        { type: 'action', title: 'Device Exchange Calculator', description: 'Evaluate trade-in credit for your old phone', page: 'exchange' },
        { type: 'action', title: 'Precision Repair Lab', description: 'Screen, battery, and logic board micro-soldering', page: 'repair' },
        { type: 'action', title: 'Original Showroom Chitwan', description: 'Indra Dev Marga address & Google Maps directions', page: 'showroom' },
        { type: 'action', title: 'Apple Guru Insights', description: 'Expert guides on iPhone models, battery care, and specs', page: 'insights' }
      ]
    : [
        ...products
          .filter(p => 
            p.name.toLowerCase().includes(cleanQuery) || 
            p.brand.toLowerCase().includes(cleanQuery) ||
            p.category.toLowerCase().includes(cleanQuery) ||
            p.description.toLowerCase().includes(cleanQuery)
          )
          .map(p => ({ type: 'product' as const, data: p })),

        ...repairServices
          .filter(s => 
            s.title.toLowerCase().includes(cleanQuery) || 
            s.shortDesc.toLowerCase().includes(cleanQuery) ||
            s.symptoms.some(sym => sym.toLowerCase().includes(cleanQuery))
          )
          .map(s => ({ type: 'service' as const, data: s })),

        ...blogPosts
          .filter(b => 
            b.title.toLowerCase().includes(cleanQuery) || 
            b.category.toLowerCase().includes(cleanQuery) ||
            b.excerpt.toLowerCase().includes(cleanQuery) ||
            b.tags.some(t => t.toLowerCase().includes(cleanQuery))
          )
          .map(b => ({ type: 'article' as const, data: b })),

        ...funFacts
          .filter(f => 
            f.headline.toLowerCase().includes(cleanQuery) || 
            f.fact.toLowerCase().includes(cleanQuery)
          )
          .map(f => ({ type: 'fact' as const, title: f.headline, category: f.category, text: f.fact }))
      ].slice(0, 8);

  const handleSelect = (item: SearchItem) => {
    onClose();
    if (item.type === 'product') {
      onSelectProduct(item.data);
    } else if (item.type === 'service') {
      onSelectService(item.data);
    } else if (item.type === 'article') {
      onSelectArticle(item.data);
    } else if (item.type === 'action') {
      onNavigate(item.page);
    } else if (item.type === 'fact') {
      onNavigate('facts');
    }
  };

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="spotlight-overlay"
      className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-2xl flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="spotlight-modal"
        className="w-full max-w-2xl bg-[#0a0a0d] border border-white/10 rounded-xl shadow-2xl overflow-hidden text-left flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownList}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-white/10 p-4 sm:p-5 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#D4AF37] shrink-0 ml-1" />
          <input
            ref={inputRef}
            id="spotlight-input-field"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search Apple, Samsung, screen repair, exchange..."
            className="w-full bg-transparent text-white text-base sm:text-lg focus:outline-none placeholder:text-zinc-600 font-medium font-sans"
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-sm text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider text-zinc-400 hover:text-[#D4AF37] px-2.5 py-1 bg-white/5 border border-white/10 font-mono"
          >
            Esc
          </button>
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 divide-y divide-white/[0.04]">
          {filteredItems.length === 0 ? (
            <div className="text-center py-14 px-4 text-zinc-500">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30 text-[#D4AF37]" />
              <p className="text-sm font-medium text-zinc-400 font-mono">No matching devices or services found</p>
              <p className="text-xs text-zinc-600 mt-1">Try searching "iPhone 16 Pro", "Screen", "Trade In", or "Battery"</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={index}
                  id={`search-result-${index}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-sm text-left transition-all ${
                    isSelected ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-white' : 'text-zinc-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-9 h-9 rounded-sm flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#D4AF37] text-black font-bold' : 'bg-white/5 text-zinc-400 border border-white/10'
                    }`}>
                      {item.type === 'product' && <Smartphone className="w-4 h-4" />}
                      {item.type === 'service' && <Wrench className="w-4 h-4" />}
                      {item.type === 'article' && <BookOpen className="w-4 h-4" />}
                      {item.type === 'fact' && <Sparkles className="w-4 h-4" />}
                      {item.type === 'action' && <ArrowRight className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold truncate text-white">
                          {item.type === 'product' && item.data.name}
                          {item.type === 'service' && item.data.title}
                          {item.type === 'article' && item.data.title}
                          {item.type === 'fact' && item.title}
                          {item.type === 'action' && item.title}
                        </span>
                        <span className="text-[9px] uppercase font-mono tracking-wider px-1.5 py-0.5 bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                          {item.type === 'product' && item.data.brand}
                          {item.type === 'service' && 'Lab Repair'}
                          {item.type === 'article' && 'Guide'}
                          {item.type === 'fact' && 'Trivia'}
                          {item.type === 'action' && 'Direct Link'}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 truncate mt-0.5 font-light">
                        {item.type === 'product' && `${item.data.priceRange} · ${item.data.tagline}`}
                        {item.type === 'service' && item.data.shortDesc}
                        {item.type === 'article' && item.data.excerpt}
                        {item.type === 'fact' && item.text}
                        {item.type === 'action' && item.description}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#D4AF37] shrink-0 ml-3" />
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-black/40 border-t border-white/5 px-4 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="bg-white/10 px-1 py-0.5 text-[#D4AF37]">↑</kbd> <kbd className="bg-white/10 px-1 py-0.5 text-[#D4AF37]">↓</kbd> to navigate</span>
            <span><kbd className="bg-white/10 px-1 py-0.5 text-[#D4AF37]">↵</kbd> to select</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <MapPin className="w-3 h-3 text-[#D4AF37]" />
            <span>Indra Dev Marga, Chitwan</span>
          </div>
        </div>
      </div>
    </div>
  );
};
