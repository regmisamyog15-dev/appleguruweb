import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { 
  Smartphone, 
  RefreshCcw, 
  Wrench, 
  BookOpen, 
  Sparkles, 
  MapPin, 
  Search, 
  Menu, 
  X, 
  Phone, 
  MessageCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenSearch: () => void;
  onOpenWhatsApp: (message?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenWhatsApp,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Overview', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'phones', label: 'Devices', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'exchange', label: 'Exchange', icon: <RefreshCcw className="w-4 h-4" /> },
    { id: 'repair', label: 'Repair Lab', icon: <Wrench className="w-4 h-4" /> },
    { id: 'insights', label: 'Insights', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'facts', label: 'Did You Know', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'showroom', label: 'Showroom', icon: <MapPin className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/[0.08] ${
          scrolled
            ? 'bg-[#050505]/95 backdrop-blur-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.9)] py-3.5'
            : 'bg-[#050505]/80 backdrop-blur-md py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Brand Identity */}
          <button
            id="navbar-brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-sm bg-white text-black flex items-center justify-center font-bold text-xs shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              AG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans font-black tracking-[-0.5px] uppercase text-white text-base">
                  APPLE GURU
                </span>
                <span className="text-[9px] uppercase font-bold tracking-[1.5px] px-1.5 py-0.5 rounded-none bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                  Original
                </span>
              </div>
              <p className="text-[9px] text-zinc-400 uppercase tracking-[2px] font-medium">
                Indra Dev Marga · Chitwan
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links (Artistic Flair) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 text-[11px] uppercase tracking-[2px] font-bold transition-all duration-300 focus:outline-none ${
                    isActive
                      ? 'text-[#D4AF37] opacity-100'
                      : 'text-white opacity-60 hover:opacity-100 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D4AF37]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Direct CTA */}
          <div className="flex items-center gap-3">
            {/* Spotlight Search Trigger */}
            <button
              id="search-trigger-btn"
              onClick={onOpenSearch}
              title="Search Apple Guru (Cmd+K)"
              className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-zinc-300 hover:text-white transition-all text-[10px] uppercase tracking-[1.5px] font-semibold focus:outline-none group"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#D4AF37] transition-colors" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline text-[9px] bg-white/10 px-1 py-0.5 rounded-none border border-white/10 text-zinc-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Direct Phone Call */}
            <a
              id="navbar-call-btn"
              href="tel:9821552339"
              title="Call Apple Guru Chitwan: 9821552339"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-transparent hover:bg-white/[0.04] border border-white/15 text-zinc-300 hover:text-[#D4AF37] text-[10px] uppercase tracking-[1.5px] font-semibold transition-all font-mono"
            >
              <Phone className="w-3 h-3 text-[#D4AF37]" />
              <span>9821552339</span>
            </a>

            {/* Quick WhatsApp CTA (Artistic Flair Outline Style) */}
            <button
              id="navbar-whatsapp-cta"
              onClick={() => onOpenWhatsApp('Hello Apple Guru! I would like to inquire about devices and services.')}
              className="flex items-center gap-2 px-4 py-2 rounded-sm border border-white/20 hover:border-[#D4AF37] bg-transparent text-white hover:text-[#D4AF37] text-[10px] font-bold uppercase tracking-[2px] transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-sm bg-white/[0.05] text-zinc-300 hover:text-white border border-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl lg:hidden pt-24 px-6 pb-10 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-300"
        >
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold mb-4 px-2">
              Navigation
            </p>
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-sm text-left text-sm uppercase tracking-[2px] font-bold transition-all ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#050505] shadow-lg'
                      : 'text-zinc-300 hover:bg-white/[0.05] hover:text-[#D4AF37]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-[#050505]' : 'text-[#D4AF37]'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#050505]' : 'text-zinc-600'}`} />
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-zinc-400 text-xs">
              <MapPin className="w-4 h-4 text-white" />
              <span>Indra Dev Marga, Bharatpur, Chitwan</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>3+ Years of Verified Heritage</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href="tel:9821552339"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-sm font-semibold hover:bg-white/20 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsApp('Hello Apple Guru! Inquiring from Chitwan.');
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
