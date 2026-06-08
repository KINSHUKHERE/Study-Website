import React from 'react';
import { Play, FileText, Calendar } from 'lucide-react';

export default function VideoCard({ video, onWatch, onSelectNotes, progress }) {
  const thumbnail = video.youtubeId 
    ? `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`
    : 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=400'; // Fallback math background image

  const getBadgeClass = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('matr') || cat.includes('calc')) return 'badge-primary';
    if (cat.includes('lde') || cat.includes('diff')) return 'badge-purple';
    return 'badge-green';
  };

  return (
    <div className="glass-panel flex flex-col" style={{
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Thumbnail Container */}
      <div 
        style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9', cursor: 'pointer' }} 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onWatch(video); }}
        onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); onWatch(video); }}
      >
        <img 
          src={thumbnail} 
          alt={video.title} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--transition-normal)'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10, 14, 26, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity var(--transition-fast)'
        }} className="play-overlay">
          <div style={{
            background: 'var(--primary)',
            color: '#fff',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <Play size={20} fill="#fff" style={{ marginLeft: '2px' }} />
          </div>
        </div>

        {/* Watch Progress Bar (YouTube Style) */}
        {progress && progress.percentage > 0 && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'rgba(255, 255, 255, 0.3)',
            zIndex: 15
          }}>
            <div style={{
              width: `${progress.percentage}%`,
              height: '100%',
              background: '#ef4444',
              transition: 'width 0.3s ease'
            }} />
          </div>
        )}
      </div>

      {/* Content Container */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
          <span className={`badge ${getBadgeClass(video.category)}`}>
            {video.category}
          </span>
          <div className="flex items-center gap-1" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <Calendar size={12} />
            <span>{video.date}</span>
          </div>
        </div>

        <h3 
          onClick={(e) => { e.preventDefault(); onWatch(video); }}
          onTouchEnd={(e) => { e.preventDefault(); onWatch(video); }}
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            marginBottom: '0.5rem',
            cursor: 'pointer',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
          onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
          onMouseOut={(e) => e.target.style.color = 'var(--text-primary)'}
        >
          {video.title}
        </h3>

        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          marginBottom: '1.25rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          marginTop: 'auto'
        }}>
          {video.description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2" style={{ marginTop: 'auto' }}>
          <button 
            onClick={() => onWatch(video)}
            className="btn btn-primary" 
            style={{ flex: 1, padding: '0.6rem 1rem', fontSize: '0.875rem' }}
          >
            <Play size={14} fill="#fff" /> Watch
          </button>
          
          {video.secondaryUrl && (
            <button 
              onClick={() => onSelectNotes(video.secondaryUrl)}
              className="btn btn-outline" 
              style={{ padding: '0.6rem', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="View Notes on Telegram"
            >
              <FileText size={16} />
            </button>
          )}
        </div>
      </div>

      <style>{`
        .play-overlay {
          opacity: 0.8;
        }
        .play-overlay:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
