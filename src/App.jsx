import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Lectures from './pages/Lectures';
import Notes from './pages/Notes';
import Contact from './pages/Contact';
import { fetchDataFromSheet } from './services/sheetsService';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [loading, setLoading] = useState(true);
  
  // Data States
  const [videos, setVideos] = useState([]);
  const [notes, setNotes] = useState([]);
  
  // Interaction States
  const [activeVideo, setActiveVideo] = useState(null);
  const [notesSearchQuery, setNotesSearchQuery] = useState('');
  
  // Watch Progress Tracker (stored in localStorage)
  const [watchProgress, setWatchProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('trigtech_watch_progress');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const handleProgressUpdate = (videoId, currentTime, duration) => {
    const percentage = Math.min(100, Math.floor((currentTime / duration) * 100));
    setWatchProgress(prev => {
      const updated = {
        ...prev,
        [videoId]: { currentTime, duration, percentage }
      };
      localStorage.setItem('trigtech_watch_progress', JSON.stringify(updated));
      return updated;
    });
  };

  // Initial Data Fetch
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchDataFromSheet();
        setVideos(data.videos);
        setNotes(data.notes);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Hash-based Routing Engine
  useEffect(() => {
    if (loading || videos.length === 0) return;

    const parseHash = () => {
      const hash = window.location.hash || '#home';
      
      if (hash === '#home') {
        setCurrentTab('home');
        setActiveVideo(null);
      } else if (hash === '#lectures') {
        setCurrentTab('lectures');
        setActiveVideo(null);
      } else if (hash === '#notes') {
        setCurrentTab('notes');
        setActiveVideo(null);
      } else if (hash === '#contact') {
        setCurrentTab('contact');
        setActiveVideo(null);
      } else if (hash.startsWith('#watch?v=')) {
        const videoId = hash.replace('#watch?v=', '');
        const video = videos.find(v => v.id === videoId);
        if (video) {
          setCurrentTab('lectures');
          setActiveVideo(video);
        } else {
          setCurrentTab('lectures');
          setActiveVideo(null);
        }
      }
    };

    // Listen for hash changes (for back/forward browser navigation)
    window.addEventListener('hashchange', parseHash);
    
    // Parse initially on load
    parseHash();

    return () => window.removeEventListener('hashchange', parseHash);
  }, [loading, videos]);

  // Navigation Trigger helper
  const navigateTo = (tabId) => {
    window.location.hash = `#${tabId}`;
  };

  const handleWatchVideo = (video) => {
    window.location.hash = `#watch?v=${video.id}`;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Background ambient radial circles */}
      <div style={{
        position: 'fixed',
        top: '-10%',
        left: '-10%',
        width: '50vw',
        height: '50vw',
        background: 'radial-gradient(circle, var(--ambient-glow-1) 0%, transparent 70%)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'fixed',
        bottom: '-10%',
        right: '-10%',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, var(--ambient-glow-2) 0%, transparent 70%)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      {/* Navigation */}
      <Navbar currentTab={currentTab} navigateTo={navigateTo} />

      {/* Main Page Layout */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {loading ? (
          <div style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '4rem 0'
          }}>
            <Loader2 className="animate-spin" size={40} color="var(--primary)" />
            <p style={{ color: 'var(--text-secondary)', fontWeight: 500, animation: 'pulse 1.5s infinite' }}>
              Fetching study materials...
            </p>
          </div>
        ) : (
          <>
            {currentTab === 'home' && (
              <Home 
                videos={videos} 
                notes={notes} 
                onWatchVideo={handleWatchVideo} 
                setCurrentTab={navigateTo}
                setNotesSearchQuery={setNotesSearchQuery}
                watchProgress={watchProgress}
              />
            )}
            
            {currentTab === 'lectures' && (
              <Lectures 
                videos={videos} 
                activeVideo={activeVideo} 
                setActiveVideo={(video) => {
                  if (video) {
                    window.location.hash = `#watch?v=${video.id}`;
                  } else {
                    window.location.hash = '#lectures';
                  }
                }}
                initialSearchQuery={notesSearchQuery}
                clearSearchQuery={() => setNotesSearchQuery('')}
                watchProgress={watchProgress}
                onProgressUpdate={handleProgressUpdate}
              />
            )}
            
            {currentTab === 'notes' && (
              <Notes 
                notes={notes} 
                initialSearchQuery={notesSearchQuery}
                clearSearchQuery={() => setNotesSearchQuery('')}
              />
            )}
            
            {currentTab === 'contact' && (
              <Contact />
            )}
          </>
        )}
      </main>

       {/* Footer */}
      <Footer setCurrentTab={navigateTo} />

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919413436533" 
        target="_blank" 
        rel="noreferrer"
        title="Chat on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 999,
          background: '#25D366',
          color: '#fff',
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(37, 211, 102, 0.4)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          cursor: 'pointer'
        }}
        className="btn-whatsapp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.449 5.376 0 9.738-4.364 9.742-9.75.002-2.61-1.01-5.064-2.85-6.906C16.328 2.099 13.89 1.085 11.996 1.085c-5.385 0-9.754 4.373-9.758 9.76-.002 1.8.484 3.486 1.472 4.966L2.684 20.89l4.963-1.736zm10.74-4.854c-.299-.149-1.764-.87-2.037-.967-.272-.098-.47-.147-.667.149-.196.297-.762.967-.934 1.165-.173.197-.346.223-.645.074-.3-.149-1.265-.466-2.41-1.487-.89-.794-1.49-1.774-1.664-2.072-.173-.299-.018-.46.131-.608.135-.133.299-.347.448-.52.149-.173.197-.297.299-.495.101-.197.05-.371-.025-.52-.075-.149-.667-1.609-.913-2.204-.24-.577-.48-.498-.667-.508l-.57-.01c-.197 0-.518.074-.79.37-.272.296-1.037 1.013-1.037 2.47 0 1.458 1.061 2.864 1.209 3.062.149.198 2.09 3.193 5.064 4.48 2.476 1.07 2.98.858 3.518.808.538-.05 1.764-.72 2.012-1.412.247-.69.247-1.282.173-1.411-.074-.131-.272-.206-.57-.355z"/>
        </svg>
      </a>

      {/* Injecting keyframe animations and styles */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        .btn-whatsapp:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(37, 211, 102, 0.6) !important;
        }
      `}</style>
    </div>
  );
}
