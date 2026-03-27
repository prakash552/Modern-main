import { useState } from 'react';
import { IoPlay, IoPause, IoVolumeMute, IoVolumeHigh } from 'react-icons/io5';
import './Video.css';

export default function Video() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgress = (e) => {
    setProgress((e.currentTarget.currentTime / e.currentTarget.duration) * 100);
  };

  return (
    <section className="video-section">
      <div className="video-container">
        {/* Video Content */}
        <div className="video-wrapper">
          <video
            className="video-player"
            autoPlay
            loop
            muted={isMuted}
            controls={false}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={handleProgress}
          >
            <source
              src="https://www.pexels.com/download/video/10050969/"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Video Overlay */}
          <div className="video-overlay"></div>

          {/* Video Content Text */}
          <div className="video-content">
            <div className="video-header">
              <span className="video-tag">LIMITLESS EXPLORATION</span>
              <div className="tag-line"></div>
            </div>
            <h2 className="video-title">
              <span>BEYOND</span>
              <span>BOUNDARIES</span>
            </h2>
            <p className="video-subtitle">Defining the future of contemporary fashion through visual storytelling.</p>
            <div className="video-cta-wrapper">
              <button className="video-cta">
                <span className="cta-text">DISCOVER THE FILM</span>
                <span className="cta-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Custom Controls */}
          <div className="video-controls">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="controls-bottom">
              <button
                className="control-btn play-btn"
                onClick={handlePlayPause}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <IoPause /> : <IoPlay />}
              </button>

              <button
                className="control-btn mute-btn"
                onClick={handleMute}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <IoVolumeMute /> : <IoVolumeHigh />}
              </button>

              <div className="video-info">
                Premium Clothing Collection 2025
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="video-decoration left"></div>
      <div className="video-decoration right"></div>
    </section>
  );
}
