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
            <h2 className="video-title">ELEVATE YOUR STYLE</h2>
            <p className="video-subtitle">Experience the Art of Fashion</p>
            <button className="video-cta">EXPLORE COLLECTION</button>
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
