import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import {
  Search,
  Menu,
  X,
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Smartphone,
  RefreshCcw,
  Wrench,
  BookOpen,
  Sparkles
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
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'home',     label: 'Overview',   icon: <Sparkles className="w-4 h-4" /> },
    { id: 'phones',   label: 'Devices',    icon: <Smartphone className="w-4 h-4" /> },
    { id: 'exchange', label: 'Exchange',   icon: <RefreshCcw className="w-4 h-4" /> },
    { id: 'repair',   label: 'Repair',     icon: <Wrench className="w-4 h-4" /> },
    { id: 'insights', label: 'Insights',   icon: <BookOpen className="w-4 h-4" /> },
    { id: 'showroom', label: 'Showroom',   icon: <MapPin className="w-4 h-4" /> },
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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 0.4s ease, border-color 0.4s ease',
          background: scrolled
            ? 'rgba(0,0,0,0.85)'
            : 'rgba(0,0,0,0.0)',
          backdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
          borderBottom: scrolled
            ? '0.5px solid rgba(255,255,255,0.12)'
            : '0.5px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: '1080px',
            margin: '0 auto',
            padding: '0 22px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          {/* Brand */}
          <button
            id="navbar-brand-logo"
            onClick={() => handleNavClick('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                background: '#fff',
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '10px',
                letterSpacing: '-0.02em',
                flexShrink: 0,
              }}
            >
              AG
            </div>
            <span
              style={{
                fontSize: '17px',
                fontWeight: 600,
                color: '#f5f5f7',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              Apple Guru
            </span>
          </button>

          {/* Desktop Nav — Apple's clean centered links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
              flex: 1,
              justifyContent: 'center',
            }}
            className="hidden lg:flex"
          >
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 0',
                    fontSize: '12px',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                    color: isActive ? '#f5f5f7' : 'rgba(245,245,247,0.72)',
                    transition: 'color 0.2s',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#f5f5f7'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,245,247,0.72)'; }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-1px',
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: '#f5f5f7',
                        borderRadius: '1px',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            {/* Search */}
            <button
              id="search-trigger-btn"
              onClick={onOpenSearch}
              title="Search (⌘K)"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(245,245,247,0.72)',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = '#f5f5f7'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,245,247,0.72)'}
            >
              <Search style={{ width: '15px', height: '15px' }} />
            </button>

            {/* Phone — desktop only */}
            <a
              id="navbar-call-btn"
              href="tel:9821552339"
              className="hidden sm:flex"
              style={{
                fontSize: '12px',
                fontWeight: 400,
                color: 'rgba(245,245,247,0.72)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#f5f5f7'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(245,245,247,0.72)'}
            >
              <Phone style={{ width: '13px', height: '13px' }} />
              <span>9821552339</span>
            </a>

            {/* WhatsApp CTA */}
            <button
              id="navbar-whatsapp-cta"
              onClick={() => onOpenWhatsApp('Hello Apple Guru! I would like to inquire about devices and services.')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '7px 14px',
                borderRadius: '980px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#f5f5f7',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                letterSpacing: '-0.01em',
                transition: 'background 0.2s',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.16)'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.10)'}
            >
              <MessageCircle style={{ width: '13px', height: '13px', color: '#4ade80' }} />
              <span>WhatsApp</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(245,245,247,0.72)',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen
                ? <X style={{ width: '18px', height: '18px' }} />
                : <Menu style={{ width: '18px', height: '18px' }} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu — full screen, Apple-style */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            background: 'rgba(0,0,0,0.96)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            paddingTop: '70px',
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingBottom: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto',
            animation: 'fade-in 0.25s ease both',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <p style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'rgba(245,245,247,0.4)',
              fontWeight: 600,
              padding: '0 8px',
              marginBottom: '12px',
            }}>
              Navigation
            </p>
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: isActive ? '#f5f5f7' : 'rgba(245,245,247,0.72)',
                    fontSize: '17px',
                    fontWeight: isActive ? 500 : 400,
                    letterSpacing: '-0.02em',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: isActive ? '#d4af37' : 'rgba(245,245,247,0.4)' }}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight
                    style={{
                      width: '16px', height: '16px',
                      color: isActive ? 'rgba(245,245,247,0.6)' : 'rgba(245,245,247,0.2)',
                    }}
                  />
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '0.5px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(245,245,247,0.5)', fontSize: '13px', marginBottom: '8px' }}>
              <MapPin style={{ width: '14px', height: '14px' }} />
              <span>Indra Dev Marga, Bharatpur, Chitwan</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(245,245,247,0.5)', fontSize: '13px', marginBottom: '20px' }}>
              <ShieldCheck style={{ width: '14px', height: '14px', color: '#4ade80' }} />
              <span>3+ Years of Verified Service</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <a
                href="tel:9821552339"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px',
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#f5f5f7',
                  fontSize: '15px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                }}
              >
                <Phone style={{ width: '16px', height: '16px' }} />
                Call
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsApp('Hello Apple Guru! Inquiring from Chitwan.');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px',
                  borderRadius: '14px',
                  background: '#16a34a',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                }}
              >
                <MessageCircle style={{ width: '16px', height: '16px' }} />
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
