import React from 'react';
import {
  HiLightBulb,
  HiShieldCheck,
  HiSupport,
  HiDatabase,
  HiSwitchHorizontal,
} from 'react-icons/hi';

export default function Features() {
  return (
    <section className="section-padding" style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        {/* Title */}
        <h2 style={{
          fontSize: 'clamp(2.2rem, 5vw, 2.75rem)',
          fontWeight: 800,
          marginBottom: '2.25rem',
        maxWidth: '750px',
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: 1.15
      }} className="gradient-text">
        Learn Mathematics & Technology Conceptually, Anywhere
      </h2>

      {/* Grid */}
      <div className="features-grid">
        {/* Card 1: Conceptual Lectures */}
        <div className="glass-panel feature-card" style={{ padding: '2rem', textAlign: 'left' }}>
          <div className="icon-wrapper">
            <div className="icon-inner">
              <HiLightBulb className="icon-main" style={{ color: '#f97316' }} />
            </div>
          </div>
          <h3 className="feature-title">Conceptual Math Lectures</h3>
          <p className="feature-desc">
            Master engineering and school math from the ground up, skipping rote memorization and formula charts.
          </p>
          <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>Concept-Driven</span>
        </div>

        {/* Card 2: Structured Playlists */}
        <div className="glass-panel feature-card" style={{ padding: '2rem', textAlign: 'left' }}>
          <div className="icon-wrapper">
            <div className="icon-inner">
              <HiDatabase className="icon-main" style={{ color: '#a855f7' }} />
            </div>
          </div>
          <h3 className="feature-title">Structured Playlists</h3>
          <p className="feature-desc">
            Access organized, syllabus-aligned courses for B.Tech semester exams, NEET math prep, and high school algebra.
          </p>
          <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>Syllabus Aligned</span>
        </div>

        {/* Card 3: Handwritten revision PDFs (Tall card spanning 2 rows on desktop) */}
        <div className="glass-panel feature-card tall-card" style={{ padding: '2rem', textAlign: 'left' }}>
          <div>
            <div className="icon-wrapper" style={{ marginBottom: '1.25rem' }}>
              <div className="icon-inner">
                <HiShieldCheck className="icon-main" style={{ color: '#10b981' }} />
              </div>
            </div>
            <h3 className="feature-title" style={{ marginBottom: '0.5rem' }}>
              Handwritten Class Notes
            </h3>
            <p className="feature-desc" style={{ marginBottom: '1.5rem' }}>
              Beautifully drafted class PDFs and quick-revision formula sheets built specifically for exam revisions.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div className="list-item">
                <span className="list-label">Study Notes</span>
                <span className="list-value">Handwritten PDFs</span>
              </div>
              <div className="list-item">
                <span className="list-label">Resource Access</span>
                <span className="list-value">100% Free</span>
              </div>
              <div className="list-item">
                <span className="list-label">Target Audience</span>
                <span className="list-value">RTU Kota & NEET</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>Direct Downloads</span>
          </div>
        </div>

        {/* Card 4: Task Automation */}
        <div className="glass-panel feature-card" style={{ padding: '2rem', textAlign: 'left' }}>
          <div className="icon-wrapper">
            <div className="icon-inner">
              <HiSwitchHorizontal className="icon-main" style={{ color: '#ec4899' }} />
            </div>
          </div>
          <h3 className="feature-title">Practical Task Automation</h3>
          <p className="feature-desc">
            Boost your daily workflow efficiency with practical Python scripting guides, Excel shortcuts, and automation tools.
          </p>
          <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>Practical Skills</span>
        </div>

        {/* Card 5: Always-On Support */}
        <div className="glass-panel feature-card" style={{ padding: '2rem', textAlign: 'left' }}>
          <div className="icon-wrapper">
            <div className="icon-inner">
              <HiSupport className="icon-main" style={{ color: '#3b82f6' }} />
            </div>
          </div>
          <h3 className="feature-title">Dedicated Support Group</h3>
          <p className="feature-desc">
            Clear your doubts, ask questions, and share study materials inside our active Telegram channel and group.
          </p>
          <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>Active Community</span>
        </div>
      </div>

      {/* Local styles mapping Tailwind parameters to premium glassmorphism */}
      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          width: 100%;
          max-width: 1140px;
          margin: 0 auto;
        }
        .feature-card {
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
        }
        .feature-card:hover {
          border-color: rgba(99, 102, 241, 0.4);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg), var(--shadow-glow);
        }
        .tall-card {
          grid-row: span 2;
          justify-content: space-between;
        }
        .icon-wrapper {
          width: fit-content;
          padding: 1px;
          border-radius: var(--border-radius-sm);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
        }
        .icon-inner {
          display: flex;
          height: 2.5rem;
          width: 2.5rem;
          align-items: center;
          justify-content: center;
          border-radius: var(--border-radius-sm);
          background: rgba(255, 255, 255, 0.05);
        }
        .icon-main {
          height: 1.25rem;
          width: 1.25rem;
        }
        .feature-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }
        .feature-desc {
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--text-secondary);
          margin: 0;
        }
        .list-item {
          display: flex;
          justify-content: space-between;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          padding: 0.5rem 0.75rem;
          font-size: 0.8rem;
        }
        .list-label {
          color: var(--text-secondary);
        }
        .list-value {
          font-weight: 600;
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .feature-card {
            padding: 1.5rem !important;
          }
          .tall-card {
            grid-row: auto;
          }
        }
      `}</style>
      </div>
    </section>
  );
}
