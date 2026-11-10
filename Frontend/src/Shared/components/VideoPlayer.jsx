import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Settings, 
  RotateCcw, 
  RotateCw,
  Captions
} from "lucide-react";

const getEmbedUrl = (url, startTime = 0) => {
  if (!url) return null;

  // 1. Already an embed URL or Cloudinary Player
  if (url.includes("player.cloudinary.com")) {
    return url; 
  }

  // 2. YouTube
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = null;
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else {
      try {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get("v");
      } catch (e) {}
    }
    if (videoId) {
      // Added autoplay=1
      return `https://www.youtube.com/embed/${videoId}?start=${Math.floor(startTime)}&autoplay=1`;
    }
  }

  // 3. Vimeo
  if (url.includes("vimeo.com/") && !isNaN(url.split("vimeo.com/")[1]?.split("?")[0])) {
    const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
    // Added autoplay=1
    return `https://player.vimeo.com/video/${videoId}?autoplay=1#t=${Math.floor(startTime)}`;
  }

  return null;
};

const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds)) return "0:00";
  const m = Math.floor(timeInSeconds / 60);
  const s = Math.floor(timeInSeconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

const VideoPlayer = ({ src, title = "Video", className = "", captionsSrc = "" }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const embedUrl = getEmbedUrl(src);
  const isDirectVideo = !embedUrl && src;

  // Reset state when video source changes
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    
    if (videoRef.current) {
      videoRef.current.load(); // Force reload of new src
    }
  }, [src]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    setCurrentTime(current);
    setProgress((current / videoRef.current.duration) * 100);

    // Save progress every 5 seconds
    if (Math.floor(current) % 5 === 0) {
      localStorage.setItem(`video_progress_${src}`, current.toString());
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    videoRef.current.playbackRate = playbackRate;
    videoRef.current.volume = volume;

    // Resume Logic
    const savedTime = localStorage.getItem(`video_progress_${src}`);
    if (savedTime && parseFloat(savedTime) > 5) {
      videoRef.current.currentTime = parseFloat(savedTime);
      setCurrentTime(parseFloat(savedTime));
    }

    // Attempt AutoPlay
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Browser blocked autoplay (usually due to sound)
        setIsPlaying(false);
      });
    }
  };

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
    setProgress(pos * 100);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (videoRef.current) videoRef.current.volume = val;
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const changeSpeed = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackRate(speed);
    }
    setShowSpeedMenu(false);
  };

  const skipTime = (amount) => {
    if (videoRef.current) {
      videoRef.current.currentTime += amount;
    }
  };

  const handleKeyDown = useCallback((e) => {
    if (!isDirectVideo) return;
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    switch (e.key.toLowerCase()) {
      case " ":
      case "k":
        e.preventDefault();
        togglePlay();
        break;
      case "arrowright":
        e.preventDefault();
        skipTime(5);
        break;
      case "arrowleft":
        e.preventDefault();
        skipTime(-5);
        break;
      case "arrowup":
        e.preventDefault();
        const newVolUp = Math.min(1, volume + 0.1);
        setVolume(newVolUp);
        if (videoRef.current) videoRef.current.volume = newVolUp;
        break;
      case "arrowdown":
        e.preventDefault();
        const newVolDown = Math.max(0, volume - 0.1);
        setVolume(newVolDown);
        if (videoRef.current) videoRef.current.volume = newVolDown;
        break;
      case "f":
        e.preventDefault();
        toggleFullscreen();
        break;
      case "m":
        e.preventDefault();
        toggleMute();
        break;
      default:
        break;
    }
  }, [isDirectVideo, isPlaying, volume, togglePlay]);

  if (embedUrl) {
    return (
      <iframe
        src={embedUrl}
        title={title}
        className={className}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  if (!isDirectVideo) return null;

  return (
    <div 
      ref={containerRef}
      className={`relative group bg-black flex items-center justify-center overflow-hidden ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => !isPlaying && setShowControls(true)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ outline: "none" }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        className="w-full h-full object-contain cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        playsInline
      >
        {captionsSrc && (
          <track kind="captions" src={captionsSrc} srcLang="en" label="English" default />
        )}
      </video>

      {/* CONTROLS OVERLAY */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pb-3 px-4 transition-opacity duration-300 flex flex-col gap-2 z-10 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div 
          className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer relative group/progress"
          onClick={handleSeek}
        >
          <div 
            className="absolute top-0 left-0 h-full bg-[#D48C70] rounded-full group-hover/progress:bg-[#c07a5e] transition-colors"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/progress:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="hover:text-[#D48C70] transition-colors">
              {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
            </button>
            <button onClick={() => skipTime(-10)} className="hover:text-[#D48C70] transition-colors" title="Rewind 10s">
              <RotateCcw className="h-4 w-4" />
            </button>
            <button onClick={() => skipTime(10)} className="hover:text-[#D48C70] transition-colors" title="Forward 10s">
              <RotateCw className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 group/volume">
              <button onClick={toggleMute} className="hover:text-[#D48C70] transition-colors">
                {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              <input 
                type="range" min="0" max="1" step="0.05" 
                value={isMuted ? 0 : volume} 
                onChange={handleVolumeChange}
                className="w-0 group-hover/volume:w-20 transition-all duration-300 accent-[#D48C70] cursor-pointer"
              />
            </div>
            <span className="text-xs font-medium font-mono text-neutral-300 ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3 relative">
            {captionsSrc && (
              <button className="hover:text-[#D48C70] transition-colors" title="Captions">
                <Captions className="h-5 w-5" />
              </button>
            )}
            <div className="relative">
              <button 
                onClick={() => setShowSpeedMenu(!showSpeedMenu)} 
                className="flex items-center gap-1 hover:text-[#D48C70] transition-colors text-xs font-bold"
              >
                <Settings className="h-4 w-4" /> {playbackRate}x
              </button>
              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-[#1A1816] border border-[#EBE5D9] rounded-lg shadow-xl py-1 flex flex-col min-w-[80px]">
                  {[0.5, 1, 1.25, 1.5, 2].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => changeSpeed(speed)}
                      className={`px-4 py-1.5 text-xs font-bold text-left hover:bg-[#333] transition-colors ${playbackRate === speed ? "text-[#D48C70]" : "text-white"}`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={toggleFullscreen} className="hover:text-[#D48C70] transition-colors">
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;