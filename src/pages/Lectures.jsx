import React, { useState, useEffect } from 'react';
import { Search, Play, Folder, ChevronLeft, Calendar, Video, X, BookOpen, Layers } from 'lucide-react';
import VideoCard from '../components/VideoCard';
import Youtube from '../components/YoutubeIcon';
import CustomYoutubePlayer from '../components/CustomYoutubePlayer';

export default function Lectures({ videos, activeVideo, setActiveVideo, selectedPlaylist, setSelectedPlaylist, initialSearchQuery, clearSearchQuery, watchProgress, onProgressUpdate }) {
  const [search, setSearch] = useState(initialSearchQuery || '');

  useEffect(() => {
    if (initialSearchQuery) {
      setSearch(initialSearchQuery);
      // If there's an active search, clear selected playlist to show search results globally
      setSelectedPlaylist(null);
    }
  }, [initialSearchQuery]);

  // Group videos by category (Playlist)
  const playlistNames = [...new Set(videos.map(v => v.category))];
  
  const playlists = playlistNames.map(name => {
    const playlistVideos = videos.filter(v => v.category === name);
    return {
      name,
      videos: playlistVideos,
      count: playlistVideos.length,
      latestDate: playlistVideos.sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date || ''
    };
  });

  // Filter logic
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(search.toLowerCase()) || 
                          video.description.toLowerCase().includes(search.toLowerCase());
    const matchesPlaylist = !selectedPlaylist || video.category === selectedPlaylist;
    return matchesSearch && matchesPlaylist;
  });

  const handleWatch = (video) => {
    setActiveVideo(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to assign a clean icon to different playlist topics
  const getPlaylistIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('matrix')) return <Layers size={32} color="var(--primary)" />;
    if (n.includes('diff') || n.includes('calc')) return <BookOpen size={32} color="var(--accent-purple)" />;
    return <Video size={32} color="var(--accent-green)" />;
  };

  return (
    <div className="container section-padding animate-fade" style={{ paddingTop: '2.5rem' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Mathematics & Tech Lectures</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Access structured course playlists, differential equation series, and coding automation guides.
        </p>
      </div>

      {/* Global Search (Active on all views) */}
      <div className="glass-panel" style={{
        padding: '1rem 1.5rem',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '500px' }}>
          <input 
            type="text" 
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (clearSearchQuery) clearSearchQuery();
              if (e.target.value) setSelectedPlaylist(null); // Clear active playlist to show search matches
            }}
            placeholder="Search all lectures by keyword..."
            className="input-field"
            style={{ paddingLeft: '2.75rem' }}
          />
          <Search 
            size={18} 
            color="var(--text-muted)" 
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} 
          />
        </div>
        
        {selectedPlaylist && (
          <button 
            onClick={() => { setSelectedPlaylist(null); setSearch(''); }} 
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            Show All Playlists
          </button>
        )}
      </div>

      {/* Theater Video Player (Always shown at top if a video is active) */}
      {activeVideo && (
        <div className="glass-panel animate-slide-up" style={{
          padding: '1.5rem',
          marginBottom: '3rem',
          borderWidth: '1px',
          boxShadow: 'var(--shadow-glow)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {/* Header Close button */}
          <div className="flex justify-between items-center" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <span className="badge badge-primary">{activeVideo.category}</span>
            <button 
              onClick={() => setActiveVideo(null)}
              className="btn btn-outline" 
              style={{ padding: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}
              title="Close Player"
            >
              <X size={18} />
            </button>
          </div>

          {/* Player Container - Full Width in Theater style */}
          <div style={{
            position: 'relative',
            borderRadius: 'var(--border-radius-md)',
            background: '#000',
            overflow: 'hidden',
            width: '100%',
            aspectRatio: '16/9',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
          }} className="video-player-container">
            <CustomYoutubePlayer 
              youtubeId={activeVideo.youtubeId} 
              onProgressUpdate={(currTime, dur) => onProgressUpdate(activeVideo.id, currTime, dur)}
            />
          </div>

          {/* Premium Video Player Details (YouTube Style) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Title */}
            <h2 style={{ fontSize: '1.65rem', fontWeight: 700, lineHeight: 1.3, color: 'var(--text-primary)' }}>
              {activeVideo.title}
            </h2>

            {/* Profile & Action Row */}
            <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
              {/* Profile Details */}
              <div className="flex items-center gap-3">
                <div style={{
                  width: '2.75rem',
                  height: '2.75rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary), var(--accent-purple))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: '#fff',
                  border: '2px solid rgba(255,255,255,0.1)'
                }}>
                  TT
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>TrigTech Solutions</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>5K+ subscribers</p>
                </div>
                
                {/* Subscribe Button */}
                <a 
                  href="https://www.youtube.com/@Trigtechsolutions?sub_confirmation=1" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn"
                  style={{
                    background: '#ff0000',
                    color: '#fff',
                    padding: '0.45rem 1.15rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    borderRadius: '20px',
                    marginLeft: '0.75rem',
                    boxShadow: '0 4px 12px rgba(255, 0, 0, 0.2)'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#cc0000'}
                  onMouseOut={(e) => e.target.style.background = '#ff0000'}
                >
                  Subscribe
                </a>
              </div>

              {/* Action Buttons */}
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
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    background: 'rgba(239, 68, 68, 0.08)',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px solid rgba(239, 68, 68, 0.15)',
                    cursor: 'pointer'
                  }}
                >
                  <Youtube size={14} fill="#ef4444" /> Watch on YouTube
                </a>

                {activeVideo.secondaryUrl && (
                  <a 
                    href={activeVideo.secondaryUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn"
                    style={{
                      background: 'var(--accent-green)',
                      borderColor: 'var(--accent-green)',
                      color: '#fff',
                      padding: '0.5rem 1.25rem',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      borderRadius: 'var(--border-radius-md)',
                      boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    Download Lecture Notes
                  </a>
                )}
              </div>
            </div>

            {/* Grey Description Drawer */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-md)',
              padding: '1rem 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Published: {activeVideo.date} &nbsp;•&nbsp; Category: {activeVideo.category}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                {activeVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {search ? (
        // Search View: Shows flat search results
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Search Results ({filteredVideos.length})</h2>
          {filteredVideos.length > 0 ? (
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              {filteredVideos.map(video => (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  onWatch={handleWatch} 
                  onSelectNotes={(url) => window.open(url, '_blank')} 
                  progress={watchProgress ? watchProgress[video.id] : null}
                />
              ))}
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <Play size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No matching lectures</h3>
              <p style={{ color: 'var(--text-muted)' }}>Try typing other keywords or clearing the search query.</p>
            </div>
          )}
        </div>
      ) : selectedPlaylist ? (
        // Playlist Lectures List View
        <div className="animate-fade">
          {/* Back Navigation Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <button 
              onClick={() => {
                setSelectedPlaylist(null);
                setActiveVideo(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="btn btn-secondary" 
              style={{ padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', borderRadius: '50%' }}
              title="Back to Playlists"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '0.25rem' }}>Playlist Course</span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{selectedPlaylist}</h2>
            </div>
          </div>

          {/* Videos under this playlist */}
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {filteredVideos.map(video => (
              <VideoCard 
                key={video.id} 
                video={video} 
                onWatch={handleWatch} 
                onSelectNotes={(url) => window.open(url, '_blank')} 
                progress={watchProgress ? watchProgress[video.id] : null}
              />
            ))}
          </div>
        </div>
      ) : (
        // Default View: Playlist Courses Grid (Udemy Style)
        <div className="animate-fade">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Browse by Subject Playlist</h2>
          
          <div className="grid grid-cols-1" style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {playlists.map((playlist, idx) => (
              <div 
                key={idx} 
                onClick={() => {
                  setSelectedPlaylist(playlist.name);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="glass-panel" 
                style={{
                  padding: '2rem 1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  height: '100%',
                  justifyContent: 'space-between',
                  border: '1px solid var(--border-color)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Accent glow on card hover */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: 'var(--primary)'
                }} />

                <div className="flex flex-col gap-3">
                  {/* Icon */}
                  <div style={{
                    background: 'var(--bg-tertiary)',
                    padding: '0.85rem',
                    borderRadius: 'var(--border-radius-md)',
                    width: 'fit-content',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-color)'
                  }}>
                    {getPlaylistIcon(playlist.name)}
                  </div>

                  {/* Info */}
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    lineHeight: 1.3,
                    color: 'var(--text-primary)',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {playlist.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {playlist.count} Lectures
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={12} /> {playlist.latestDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .video-player-container {
          aspect-ratio: 16/9;
          height: auto !important;
          padding-bottom: 0 !important;
          flex-grow: 2;
        }
      `}</style>
    </div>
  );
}
