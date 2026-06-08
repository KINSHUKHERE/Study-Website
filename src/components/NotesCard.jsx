import React from 'react';
import { FileDown, Calendar, Send, ExternalLink } from 'lucide-react';
import { getDirectDownloadUrl } from '../services/sheetsService';

export default function NotesCard({ note }) {
  const getBadgeClass = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('matr') || cat.includes('calc')) return 'badge-primary';
    if (cat.includes('lde') || cat.includes('diff')) return 'badge-purple';
    return 'badge-green';
  };

  return (
    <div className="glass-panel flex flex-col" style={{
      padding: '1.5rem',
      height: '100%',
      justifyContent: 'space-between',
      position: 'relative'
    }}>
      <div className="flex flex-col gap-3">
        {/* Top bar with category and date */}
        <div className="flex items-center justify-between">
          <span className={`badge ${getBadgeClass(note.category)}`}>
            {note.category}
          </span>
          <div className="flex items-center gap-1" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <Calendar size={12} />
            <span>{note.date}</span>
          </div>
        </div>

        {/* Icon & Title Row */}
        <div className="flex items-start gap-3" style={{ marginTop: '0.5rem' }}>
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            color: 'var(--accent-green)',
            padding: '0.75rem',
            borderRadius: 'var(--border-radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileDown size={24} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              lineHeight: 1.4,
              marginBottom: '0.25rem'
            }}>
              {note.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          margin: '0.5rem 0 1rem 0',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {note.description}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
        <a 
          href={getDirectDownloadUrl(note.url)} 
          download
          target="_blank" 
          rel="noreferrer"
          className="btn btn-primary" 
          style={{ 
            flex: 2, 
            padding: '0.6rem 1rem', 
            fontSize: '0.875rem',
            background: 'var(--accent-green)',
            borderColor: 'var(--accent-green)',
            boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.3)'
          }}
          onMouseOver={(e) => e.target.style.background = '#059669'}
          onMouseOut={(e) => e.target.style.background = 'var(--accent-green)'}
        >
          <FileDown size={14} /> Download PDF
        </a>
        
        {note.secondaryUrl && (
          <a 
            href={note.secondaryUrl} 
            target="_blank" 
            rel="noreferrer"
            className="btn btn-outline" 
            style={{ 
              flex: 1, 
              padding: '0.6rem 1rem', 
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem'
            }}
            title="View Notes on Telegram"
          >
            <Send size={14} /> Telegram
          </a>
        )}
      </div>
    </div>
  );
}
