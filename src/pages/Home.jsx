import React, { useState } from 'react';
import { Search, Send, ArrowRight, BookOpen, Award } from 'lucide-react';
import Youtube from '../components/YoutubeIcon';
import VideoCard from '../components/VideoCard';
import NotesCard from '../components/NotesCard';

export default function Home({ videos, notes, onWatchVideo, setCurrentTab, setNotesSearchQuery, watchProgress }) {
  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!localSearch.trim()) return;
    
    // Check if there are matches in notes, redirect to notes tab
    const notesMatch = notes.some(n => 
      n.title.toLowerCase().includes(localSearch.toLowerCase()) || 
      n.description.toLowerCase().includes(localSearch.toLowerCase())
    );

    if (notesMatch) {
      setNotesSearchQuery(localSearch);
      setCurrentTab('notes');
    } else {
      setNotesSearchQuery(localSearch);
      setCurrentTab('lectures');
    }
  };

  return (
    <div className="animate-fade">
      {/* Hero Section */}
      <section className="section-padding" style={{
        position: 'relative',
        background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.1), transparent 40%)',
        overflow: 'hidden'
      }}>
        <div className="container flex flex-col items-center justify-between" style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '3rem'
        }}>
          {/* Hero Left */}
          <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="flex items-center gap-2">
              <span className="badge badge-primary">Free Study Material</span>
              <span className="badge badge-purple">Telegram Updates</span>
            </div>
            
            <h1 className="gradient-text" style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1.15,
              fontWeight: 800,
            }}>
              Master Mathematics & Coding Conceptually
            </h1>
            
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '540px' }}>
              Your ultimate resource hub for high-quality mathematical video lectures and beautifully drafted handwritten revision notes. Direct from YouTube and Telegram!
            </p>

            {/* Search Bar Form */}
            <form onSubmit={handleSearchSubmit} className="glass-panel" style={{
              display: 'flex',
              padding: '0.4rem',
              borderRadius: 'var(--border-radius-md)',
              maxWidth: '500px',
              borderWidth: '1px'
            }}>
              <div className="flex items-center gap-2" style={{ flexGrow: 1, padding: '0 0.75rem' }}>
                <Search size={20} color="var(--text-muted)" />
                <input 
                  type="text" 
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search for 'Integration', 'Matrices'..." 
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-body)'
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
                Search
              </button>
            </form>

            {/* CTA Buttons */}
            <div className="flex gap-4" style={{ marginTop: '0.5rem' }}>
              <button onClick={() => setCurrentTab('lectures')} className="btn btn-primary">
                Explore Lectures <ArrowRight size={16} />
              </button>
              <button onClick={() => setCurrentTab('notes')} className="btn btn-secondary">
                Download Notes
              </button>
            </div>
          </div>

          {/* Hero Right / Channels cards */}
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="animate-slide-up">
            <a href="https://www.youtube.com/@TrigTechSolutions/" target="_blank" rel="noreferrer" className="glass-panel flex items-center gap-4" style={{
              padding: '1.5rem',
              cursor: 'pointer'
            }}>
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                padding: '1rem',
                borderRadius: 'var(--border-radius-md)'
              }}>
                <Youtube size={32} fill="#ef4444" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>TrigTech Solutions</h3>
                <p style={{ fontSize: '0.85rem' }}>Subscribe on YouTube for video tutorials</p>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.4rem' }}>
                  Visit Channel <ArrowRight size={12} />
                </span>
              </div>
            </a>

            <a href="https://t.me/TrigTechMath" target="_blank" rel="noreferrer" className="glass-panel flex items-center gap-4" style={{
              padding: '1.5rem',
              cursor: 'pointer'
            }}>
              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
                padding: '1rem',
                borderRadius: 'var(--border-radius-md)'
              }}>
                <Send size={32} fill="#3b82f6" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>TrigTech Math</h3>
                <p style={{ fontSize: '0.85rem' }}>Join our Telegram channel for handwritten PDFs</p>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.4rem' }}>
                  Join Telegram <ArrowRight size={12} />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section style={{ background: 'var(--bg-secondary)', padding: '3rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container grid" style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          textAlign: 'center',
          gap: '2.5rem'
        }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>50+</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '0.25rem' }}>Video Lectures</p>
          </div>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-green)' }}>30+</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '0.25rem' }}>Handwritten Notes</p>
          </div>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ef4444' }}>5K+</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '0.25rem' }}>YouTube Subscribers</p>
          </div>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#3b82f6' }}>2K+</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '0.25rem' }}>Telegram Members</p>
          </div>
        </div>
      </section>

      {/* Recent Lectures Section */}
      <section className="section-padding">
        <div className="container">
          <div className="flex justify-between items-center" style={{ marginBottom: '2.5rem' }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>Learn Live</span>
              <h2 style={{ fontSize: '2rem' }}>Recent Video Lectures</h2>
            </div>
            <button onClick={() => setCurrentTab('lectures')} className="btn btn-secondary">
              View All <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {videos.slice(0, 3).map(video => (
              <div key={video.id}>
                <VideoCard 
                  video={video} 
                  onWatch={onWatchVideo}
                  onSelectNotes={(url) => {
                    window.open(url, '_blank');
                  }}
                  progress={watchProgress ? watchProgress[video.id] : null}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Notes Section */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-xl) var(--border-radius-xl) 0 0' }}>
        <div className="container">
          <div className="flex justify-between items-center" style={{ marginBottom: '2.5rem' }}>
            <div>
              <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Quick Revision</span>
              <h2 style={{ fontSize: '2rem' }}>Recent Handwritten Notes</h2>
            </div>
            <button onClick={() => setCurrentTab('notes')} className="btn btn-secondary">
              View All Notes <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {notes.slice(0, 3).map(note => (
              <div key={note.id}>
                <NotesCard note={note} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
