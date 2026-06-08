import React from 'react';
import { Send, Mail } from 'lucide-react';
import Youtube from './YoutubeIcon';

export default function Footer({ setCurrentTab }) {
  return (
    <footer className="glass-panel" style={{
      marginTop: 'auto',
      borderWidth: '1px 0 0 0',
      borderRadius: 'var(--border-radius-md) var(--border-radius-md) 0 0',
      background: 'var(--bg-secondary)',
      padding: '4rem 0 2rem 0'
    }}>
      <div className="container grid grid-cols-1" style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '3rem',
        marginBottom: '3rem'
      }}>
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img 
              src="https://yt3.googleusercontent.com/HR9TME950hcIfNzKe45NwttDPPfPtDWg2XjDJEmtdE-6lzof4UrCY3hDoubInSs70ieF9bZX=s160-c-k-c0x00ffffff-no-rj" 
              alt="TrigTech Logo" 
              style={{
                width: '2.2rem',
                height: '2.2rem',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--primary)'
              }}
            />
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.25rem',
              letterSpacing: '-0.5px'
            }}>
              Trig<span style={{ color: 'var(--primary)' }}>Tech</span>
            </span>
          </div>
          <p style={{ fontSize: '0.9rem', maxWidth: '300px' }}>
            Empowering students to master mathematics and technology through concise lectures, detailed handwritten notes, and active community discussion.
          </p>
          <div className="flex gap-3">
            <a href="https://www.youtube.com/@TrigTechSolutions/" target="_blank" rel="noreferrer" className="btn-social" style={{ color: '#ef4444' }}>
              <Youtube size={18} />
            </a>
            <a href="https://t.me/TrigTechMath" target="_blank" rel="noreferrer" className="btn-social" style={{ color: '#3b82f6' }}>
              <Send size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col gap-4">
          <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
            <li>
              <button onClick={() => setCurrentTab('home')} className="footer-link">
                Home Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('lectures')} className="footer-link">
                Mathematics Lectures
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('notes')} className="footer-link">
                Handwritten Notes & PDFs
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('contact')} className="footer-link">
                Contact Creator
              </button>
            </li>
          </ul>
        </div>

        {/* Study Portals Column */}
        <div className="flex flex-col gap-4">
          <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>Our Platforms</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
            <li>
              <a href="https://www.youtube.com/@TrigTechSolutions/" target="_blank" rel="noreferrer" className="footer-link" style={{ gap: '0.5rem' }}>
                <Youtube size={16} /> TrigTech Solutions (YouTube)
              </a>
            </li>
            <li>
              <a href="https://t.me/TrigTechMath" target="_blank" rel="noreferrer" className="footer-link" style={{ gap: '0.5rem' }}>
                <Send size={14} /> TrigTech Math (Telegram Channel)
              </a>
            </li>
            <li>
              <a href="mailto:contact@trigtech.in" className="footer-link" style={{ gap: '0.5rem' }}>
                <Mail size={16} /> Support Mail
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Divider */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
        <div className="container flex flex-col items-center justify-between gap-4" style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          fontSize: '0.875rem',
          color: 'var(--text-muted)'
        }}>
          <p>© {new Date().getFullYear()} TrigTech. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Made with <span style={{ color: '#ef4444' }}>❤️</span> for students
          </p>
        </div>
      </div>

      <style>{`
        .btn-social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.2rem;
          height: 2.2rem;
          border-radius: var(--border-radius-sm);
          background-color: var(--bg-tertiary);
          transition: background-color var(--transition-fast), transform var(--transition-fast);
        }
        .btn-social:hover {
          background-color: var(--border-color);
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
}
