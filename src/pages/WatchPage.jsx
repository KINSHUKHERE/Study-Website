import React from 'react';
import { ChevronLeft, Calendar, FileText } from 'lucide-react';
import Youtube from '../components/YoutubeIcon';
import CustomYoutubePlayer from '../components/CustomYoutubePlayer';
import VideoCard from '../components/VideoCard';
import { motion } from 'framer-motion';

export default function WatchPage({ videos, activeVideo, watchProgress, onProgressUpdate, navigateTo }) {
  if (!activeVideo) return null;

  // Parse the source parameter from the URL to handle dynamic back button routing
  const params = new URLSearchParams(window.location.search);
  const from = params.get('from') || 'lectures';
  const playlistName = params.get('name') || '';

  const getBackLabel = () => {
    if (from === 'home') return 'Back to Home';
    if (from === 'playlist' && playlistName) return `Back to Playlist`;
    return 'Back to Lectures';
  };

  const handleBackClick = () => {
    if (from === 'home') {
      navigateTo('home');
    } else if (from === 'playlist' && playlistName) {
      window.history.pushState(null, '', `/playlist?name=${encodeURIComponent(playlistName)}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateTo('lectures');
    }
  };

  // Filter suggested videos from the same playlist/category
  const suggestedVideos = videos.filter(v => v.category === activeVideo.category && v.id !== activeVideo.id);
  const finalSuggestions = suggestedVideos.length > 0 
    ? suggestedVideos.slice(0, 3) 
    : videos.filter(v => v.id !== activeVideo.id).slice(0, 3);

  const handleSuggestedClick = (video) => {
    // Navigate in same tab by pushing state, preserving original source query params
    let newUrl = `/watch?v=${video.id}`;
    if (params.get('from')) {
      newUrl += `&from=${params.get('from')}`;
      if (params.get('name')) {
        newUrl += `&name=${encodeURIComponent(params.get('name'))}`;
      }
    }
    window.history.pushState(null, '', newUrl);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div 
      className="container section-padding"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ paddingTop: '2.5rem' }}
    >
      {/* Back Button */}
      <button 
        onClick={handleBackClick}
        className="btn-back-ghost" 
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-primary)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.5rem 1rem 0.5rem 0.75rem',
          borderRadius: 'var(--border-radius-md)',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.18s ease-in-out',
          marginBottom: '1.75rem'
        }}
        title={getBackLabel()}
      >
        <ChevronLeft 
          size={18} 
          className="back-arrow"
          style={{
            transition: 'transform 0.18s ease-in-out'
          }}
        />
        {getBackLabel()}
      </button>

      {/* Video Player Frame */}
      <div style={{
        position: 'relative',
        borderRadius: 'var(--border-radius-md)',
        background: '#000',
        overflow: 'hidden',
        width: '100%',
        aspectRatio: '16/9',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        marginBottom: '2rem'
      }} className="video-player-container">
        <CustomYoutubePlayer 
          youtubeId={activeVideo.youtubeId} 
          onProgressUpdate={(currTime, dur) => onProgressUpdate(activeVideo.id, currTime, dur)}
        />
      </div>

      {/* Video Caption & Metadata */}
      <div className="flex justify-between items-start" style={{ flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.75rem' }}>
        <div style={{ flex: '1 1 500px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>{activeVideo.category}</span>
          <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 800, lineHeight: 1.3, color: 'var(--text-primary)' }}>
            {activeVideo.title}
          </h1>
          <div className="flex items-center gap-4" style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-1"><Calendar size={14} /> Published: {activeVideo.date}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
          <a 
            href={activeVideo.url} 
            target="_blank" 
            rel="noreferrer"
            className="btn btn-outline"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#ef4444',
              fontSize: '0.875rem',
              fontWeight: 600,
              background: 'rgba(239, 68, 68, 0.08)',
              padding: '0.6rem 1.25rem',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid rgba(239, 68, 68, 0.15)'
            }}
          >
            <Youtube size={14} fill="#ef4444" /> Watch on YouTube
          </a>

          {activeVideo.secondaryUrl && (
            <a 
              href={activeVideo.secondaryUrl} 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-primary btn-accent-green"
              style={{
                padding: '0.6rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                borderRadius: 'var(--border-radius-md)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <FileText size={14} /> Download Notes
            </a>
          )}
        </div>
      </div>

      {/* Description Panel */}
      {activeVideo.description && (
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius-md)',
          padding: '1.25rem 1.5rem',
          marginBottom: '3.5rem',
          textAlign: 'left'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            About this lecture
          </h3>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-line', margin: 0 }}>
            {activeVideo.description}
          </p>
        </div>
      )}

      {/* Suggested Videos Grid */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem', textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          Suggested Lectures
        </h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {finalSuggestions.map(video => (
            <VideoCard 
              key={video.id} 
              video={video} 
              onWatch={handleSuggestedClick} 
              onSelectNotes={(url) => window.open(url, '_blank')}
              progress={watchProgress ? watchProgress[video.id] : null}
            />
          ))}
        </div>
      </div>

      <style>{`
        .btn-back-ghost:hover {
          background: var(--primary-glow) !important;
          color: var(--primary) !important;
        }
        .btn-back-ghost:hover .back-arrow {
          transform: translateX(-4px);
        }
      `}</style>
    </motion.div>
  );
}
