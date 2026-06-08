import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Send } from 'lucide-react';
import Youtube from './YoutubeIcon';

export default function Navbar({ currentTab }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('trigtech_theme') || 'dark';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('trigtech_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'lectures', label: 'Lectures' },
    { id: 'notes', label: 'Notes & PDFs' },
    { id: 'contact', label: 'Contact & Links' },
  ];

  return (
    <nav className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderRadius: '0 0 var(--border-radius-md) var(--border-radius-md)',
      borderWidth: '0 0 1px 0',
      background: 'var(--nav-bg)'
    }}>
      <div className="container flex items-center justify-between" style={{ height: '4.5rem' }}>
        {/* Logo */}
        <a 
          href="#home"
          className="flex items-center gap-2" 
          style={{ cursor: 'pointer' }}
        >
          <img 
            src="https://yt3.googleusercontent.com/HR9TME950hcIfNzKe45NwttDPPfPtDWg2XjDJEmtdE-6lzof4UrCY3hDoubInSs70ieF9bZX=s160-c-k-c0x00ffffff-no-rj" 
            alt="TrigTech Logo" 
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--primary)'
            }}
          />
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.4rem',
            letterSpacing: '-0.5px'
          }}>
            Trig<span style={{ color: 'var(--primary)' }}>Tech</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <div className="nav-desktop flex items-center gap-6">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                color: currentTab === item.id ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: currentTab === item.id ? 600 : 500,
                fontSize: '0.95rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                position: 'relative',
                padding: '0.5rem 0',
                transition: 'color var(--transition-fast)'
              }}
            >
              {item.label}
              {currentTab === item.id && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--primary)',
                  borderRadius: '2px'
                }} />
              )}
            </a>
          ))}
          
          <div style={{ width: '1px', height: '1.5rem', background: 'var(--border-color)' }} />
          
          {/* Quick social links */}
          <a href="https://www.youtube.com/@TrigTechSolutions/" target="_blank" rel="noreferrer" className="btn-social" style={{ color: '#ef4444' }}>
            <Youtube size={20} />
          </a>
          <a href="https://t.me/TrigTechMath" target="_blank" rel="noreferrer" className="btn-social" style={{ color: '#3b82f6' }}>
            <Send size={18} />
          </a>

          {/* Theme Switcher */}
          <button onClick={toggleTheme} className="btn-outline" style={{
            padding: '0.5rem',
            borderRadius: 'var(--border-radius-sm)',
            cursor: 'pointer',
            background: 'none',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="nav-mobile-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'none'
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* CSS overrides inside style tag to handle display toggle on resize */}
      <style>{`
        .nav-desktop {
          display: flex;
        }
        .nav-mobile-btn {
          display: none;
        }
        .btn-social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.2rem;
          height: 2.2rem;
          border-radius: var(--border-radius-sm);
          transition: background-color var(--transition-fast);
        }
        .btn-social:hover {
          background-color: var(--bg-tertiary);
        }
        
        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile-btn {
            display: block !important;
          }
        }
      `}</style>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="glass-panel" style={{
          position: 'absolute',
          top: '4.5rem',
          left: 0,
          right: 0,
          borderWidth: '0 0 1px 0',
          borderRadius: 0,
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          background: 'var(--bg-secondary)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: currentTab === item.id ? 'var(--primary)' : 'var(--text-primary)',
                fontWeight: currentTab === item.id ? 600 : 500,
                fontSize: '1.1rem',
                cursor: 'pointer',
                textAlign: 'left',
                padding: '0.5rem 0'
              }}
            >
              {item.label}
            </a>
          ))}
          <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.5rem 0' }} />
          <div className="flex items-center gap-4">
            <a href="https://www.youtube.com/@TrigTechSolutions/" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ flex: 1, gap: '0.5rem' }}>
              <Youtube size={18} color="#ef4444" /> YouTube
            </a>
            <a href="https://t.me/TrigTechMath" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ flex: 1, gap: '0.5rem' }}>
              <Send size={16} color="#3b82f6" /> Telegram
            </a>
          </div>
          <button onClick={() => { toggleTheme(); setMobileMenuOpen(false); }} className="btn btn-outline" style={{ justifyContent: 'center' }}>
            {theme === 'dark' ? <><Sun size={18} /> Light Mode</> : <><Moon size={18} /> Dark Mode</>}
          </button>
        </div>
      )}
    </nav>
  );
}
