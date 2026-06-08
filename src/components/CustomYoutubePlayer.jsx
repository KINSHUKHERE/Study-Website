import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';

export default function CustomYoutubePlayer({ youtubeId, onProgressUpdate }) {
  const containerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);
  
  // Custom states for seeking & feedback
  const [seekFeedback, setSeekFeedback] = useState({ show: false, direction: 'left' });
  const feedbackTimeoutRef = useRef(null);
  const lastClickTimeRef = useRef(0);
  const clickTimeoutRef = useRef(null);

  // Quality Adjust States
  const [availableQualities, setAvailableQualities] = useState([]);
  const [currentQuality, setCurrentQuality] = useState('auto');
  const [showQualityMenu, setShowQualityMenu] = useState(false);

  // Initialize YouTube player using Iframe API
  useEffect(() => {
    // Make sure we clear any existing player container contents
    const playerContainer = document.getElementById('yt-player-container-el');
    if (playerContainer) {
      playerContainer.innerHTML = '<div id="yt-player-element"></div>';
    }

    let ytPlayer = null;

    function createPlayer() {
      ytPlayer = new window.YT.Player('yt-player-element', {
        height: '100%',
        width: '100%',
        videoId: youtubeId,
        playerVars: {
          controls: 0,            // Hide native controls
          disablekb: 1,           // Disable keyboard controls
          modestbranding: 1,      // Remove YouTube logo
          rel: 0,                 // Hide related videos
          showinfo: 0,
          fs: 0,                  // Disable fullscreen button
          iv_load_policy: 3
        },
        events: {
          onReady: (event) => {
            setPlayer(event.target);
            setDuration(event.target.getDuration());
            event.target.playVideo();
            setIsPlaying(true);
            
            // Get available qualities
            if (event.target.getAvailableQualityLevels) {
              setAvailableQualities(event.target.getAvailableQualityLevels() || []);
            }
            if (event.target.getPlaybackQuality) {
              setCurrentQuality(event.target.getPlaybackQuality() || 'auto');
            }
          },
          onStateChange: (event) => {
            // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
            if (event.data === 1) {
              setIsPlaying(true);
              // Update qualities in case they load later
              if (event.target.getAvailableQualityLevels) {
                setAvailableQualities(event.target.getAvailableQualityLevels() || []);
              }
              if (event.target.getPlaybackQuality) {
                setCurrentQuality(event.target.getPlaybackQuality() || 'auto');
              }
            } else if (event.data === 2 || event.data === 0) {
              setIsPlaying(false);
            }
          }
        }
      });
    }

    if (!window.YT) {
      // Load YouTube API script
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => createPlayer();
    } else {
      // If already loaded
      if (window.YT.Player) {
        createPlayer();
      } else {
        // Wait just in case script is loading
        const interval = setInterval(() => {
          if (window.YT && window.YT.Player) {
            clearInterval(interval);
            createPlayer();
          }
        }, 100);
      }
    }

    return () => {
      if (ytPlayer && ytPlayer.destroy) {
        try {
          ytPlayer.destroy();
        } catch (e) {
          console.log('Player cleanup handled');
        }
      }
    };
  }, [youtubeId]);

  // Track progress and trigger parent callback
  useEffect(() => {
    if (!player || !isPlaying) return;

    const interval = setInterval(() => {
      try {
        const currTime = player.getCurrentTime();
        const dur = player.getDuration();
        setCurrentTime(currTime);
        setDuration(dur);

        if (onProgressUpdate) {
          onProgressUpdate(currTime, dur);
        }
      } catch (err) {
        // Avoid throwing errors during state updates
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player, isPlaying, onProgressUpdate]);

  // Handle controls visibility timer
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2500);
  };

  // Listen to keyboard shortcuts (Left/Right Arrow to seek, F to fullscreen, Space to play/pause)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in a search or form input
      if (document.activeElement && (
        document.activeElement.tagName === 'INPUT' || 
        document.activeElement.tagName === 'TEXTAREA'
      )) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'arrowleft':
          e.preventDefault();
          handleSeekSeconds(-5);
          break;
        case 'arrowright':
          e.preventDefault();
          handleSeekSeconds(5);
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [player, duration, isPlaying]);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const togglePlay = () => {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
      setIsPlaying(false);
    } else {
      player.playVideo();
      setIsPlaying(true);
    }
    handleMouseMove();
  };

  const triggerSeekFeedback = (direction) => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }
    setSeekFeedback({ show: true, direction });
    feedbackTimeoutRef.current = setTimeout(() => {
      setSeekFeedback({ show: false, direction });
    }, 600);
  };

  const handleSeekSeconds = (seconds) => {
    if (!player) return;
    const direction = seconds < 0 ? 'left' : 'right';
    const curr = player.getCurrentTime();
    const newTime = curr + seconds;
    const targetTime = Math.max(0, Math.min(duration, newTime));
    player.seekTo(targetTime, true);
    setCurrentTime(targetTime);
    triggerSeekFeedback(direction);
    handleMouseMove();
  };

  const handleSeek = (e) => {
    if (!player) return;
    const seekVal = parseFloat(e.target.value);
    player.seekTo(seekVal, true);
    setCurrentTime(seekVal);
  };

  const toggleMute = () => {
    if (!player) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
    handleMouseMove();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen();
    }
    handleMouseMove();
  };

  const handleSetQuality = (quality) => {
    if (player && player.setPlaybackQuality) {
      player.setPlaybackQuality(quality);
      setCurrentQuality(quality);
    }
    setShowQualityMenu(false);
  };

  const mapQualityName = (q) => {
    switch (q) {
      case 'highres': return 'Original';
      case 'hd2160': return '2160p (4K)';
      case 'hd1440': return '1440p (2K)';
      case 'hd1080': return '1080p';
      case 'hd720': return '720p';
      case 'large': return '480p';
      case 'medium': return '360p';
      case 'small': return '240p';
      case 'tiny': return '144p';
      case 'auto': return 'Auto';
      default: return q;
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleOverlayClick = (e, side) => {
    e.preventDefault();
    e.stopPropagation();
    const currentTimeMs = Date.now();
    const delay = 250; // ms to detect double click
    
    if (currentTimeMs - lastClickTimeRef.current < delay) {
      // Double click
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }
      if (side === 'left') {
        handleSeekSeconds(-5);
      } else {
        handleSeekSeconds(5);
      }
      lastClickTimeRef.current = 0;
    } else {
      // Single click
      lastClickTimeRef.current = currentTimeMs;
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      clickTimeoutRef.current = setTimeout(() => {
        // Single tap behavior: toggle controls if hidden, or play/pause if shown
        if (!showControls) {
          setShowControls(true);
          handleMouseMove();
        } else {
          togglePlay();
        }
        clickTimeoutRef.current = null;
      }, delay);
    }
  };

  const timeRemaining = duration - currentTime;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (isPlaying) setShowControls(false);
        setShowQualityMenu(false);
      }}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        aspectRatio: '16/9',
        borderRadius: 'var(--border-radius-md)',
        background: '#000',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)'
      }}
    >
      {/* 1. YouTube API Target Container */}
      <div id="yt-player-container-el" style={{ width: '100%', height: '100%', pointerEvents: 'none' }} />

      {/* 2. Clickable Video Overlay (divided into left/right halves for tap/double-tap) */}
      <div 
        onClick={(e) => handleOverlayClick(e, 'left')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: 'calc(100% - 60px)', // Exclude controls area
          zIndex: 10,
          cursor: 'pointer'
        }}
      />
      <div 
        onClick={(e) => handleOverlayClick(e, 'right')}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '50%',
          height: 'calc(100% - 60px)', // Exclude controls area
          zIndex: 10,
          cursor: 'pointer'
        }}
      />

      {/* Double Tap Seek Feedback Overlay */}
      {seekFeedback.show && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: seekFeedback.direction === 'left' ? 0 : '50%',
          width: '50%',
          height: 'calc(100% - 60px)',
          background: 'linear-gradient(to ' + (seekFeedback.direction === 'left' ? 'right' : 'left') + ', rgba(255, 255, 255, 0.15), transparent)',
          borderRadius: seekFeedback.direction === 'left' ? '12px 0 0 12px' : '0 12px 12px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 15,
          pointerEvents: 'none',
          animation: 'fade-in-out 0.6s ease-out forwards'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ display: 'flex', gap: '2px' }} className={seekFeedback.direction === 'left' ? 'seek-arrows-left' : 'seek-arrows-right'}>
              {seekFeedback.direction === 'left' ? (
                <>
                  <span className="seek-chevron">◀</span>
                  <span className="seek-chevron delay-1">◀</span>
                  <span className="seek-chevron delay-2">◀</span>
                </>
              ) : (
                <>
                  <span className="seek-chevron delay-2">▶</span>
                  <span className="seek-chevron delay-1">▶</span>
                  <span className="seek-chevron">▶</span>
                </>
              )}
            </div>
            <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              {seekFeedback.direction === 'left' ? '5 seconds back' : '5 seconds forward'}
            </span>
          </div>
        </div>
      )}

      {/* 3. Custom Controls Overlay */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to top, rgba(7, 9, 19, 0.9) 0%, rgba(7, 9, 19, 0.4) 70%, transparent 100%)',
        padding: '1.5rem 1.25rem 1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        zIndex: 20,
        opacity: showControls ? 1 : 0,
        transform: showControls ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        pointerEvents: showControls ? 'auto' : 'none'
      }}>
        
        {/* Timeline Slider & Time Labels */}
        <div className="flex items-center gap-4" style={{ width: '100%' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', minWidth: '40px' }}>
            {formatTime(currentTime)}
          </span>
          
          <input 
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            style={{
              flexGrow: 1,
              height: '4px',
              borderRadius: '2px',
              background: 'rgba(255, 255, 255, 0.25)',
              outline: 'none',
              cursor: 'pointer',
              accentColor: 'var(--primary)',
              WebkitAppearance: 'none'
            }}
            className="player-slider"
          />

          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', minWidth: '80px', textAlign: 'right' }}>
            -{formatTime(timeRemaining)}
          </span>
        </div>

        {/* Buttons Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Rewind 5s */}
            <button 
              onClick={() => handleSeekSeconds(-5)} 
              title="Rewind 5s"
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <RotateCcw size={18} />
            </button>

            {/* Play/Pause */}
            <button 
              onClick={togglePlay} 
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 0.25rem' }}
            >
              {isPlaying ? <Pause size={22} fill="#fff" /> : <Play size={22} fill="#fff" />}
            </button>

            {/* Forward 5s */}
            <button 
              onClick={() => handleSeekSeconds(5)} 
              title="Forward 5s"
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <RotateCw size={18} />
            </button>

            {/* Mute/Volume Toggle */}
            <button 
              onClick={toggleMute} 
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: '0.5rem' }}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Quality Adjust Settings */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowQualityMenu(!showQualityMenu)} 
                title="Quality"
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <Settings size={18} />
              </button>
              
              {showQualityMenu && (
                <div style={{
                  position: 'absolute',
                  bottom: '30px',
                  right: '0',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius-sm)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '0.4rem 0',
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: '110px',
                  zIndex: 30
                }}>
                  {(availableQualities.length > 0 ? availableQualities : ['auto', 'hd1080', 'hd720', 'medium', 'small']).map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSetQuality(q)}
                      className={`player-quality-item ${currentQuality === q ? 'active' : ''}`}
                      style={{
                        border: 'none',
                        color: '#fff',
                        padding: '0.4rem 0.8rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      {mapQualityName(q)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen */}
            <button 
              onClick={toggleFullscreen} 
              title="Fullscreen"
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Styled range slider and double tap feedback styles */}
      <style>{`
        .player-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--primary);
          transition: transform 0.15s ease;
        }
        .player-slider::-webkit-slider-thumb:hover {
          transform: scale(1.3);
        }
        
        @keyframes fade-in-out {
          0% { opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        .seek-chevron {
          font-size: 1.25rem;
          color: #ffffff;
          display: inline-block;
          animation: seek-pulse 0.6s infinite;
        }

        .delay-1 {
          animation-delay: 0.15s;
        }

        .delay-2 {
          animation-delay: 0.3s;
        }

        @keyframes seek-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        .seek-arrows-left {
          display: flex;
          align-items: center;
        }

        .seek-arrows-right {
          display: flex;
          align-items: center;
        }

        .player-quality-item {
          background: none;
          font-weight: 400;
          transition: background var(--transition-fast);
        }
        .player-quality-item:hover {
          background: rgba(255, 255, 255, 0.08) !important;
        }
        .player-quality-item.active {
          background: var(--primary) !important;
          font-weight: 600 !important;
        }
        .player-quality-item.active:hover {
          background: var(--primary) !important;
        }
      `}</style>
    </div>
  );
}
