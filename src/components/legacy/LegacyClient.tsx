"use client";

import React from "react";
import Link from "next/link";

type MediaItem = {
  title: string;
  image: string;
  video: string;
};

const mediaData: { movies: MediaItem[]; tv_shows: MediaItem[] } = {
  movies: [
    {
      title: "Movie Title 1",
      image: "https://via.placeholder.com/200x300.png?text=Movie+1",
      video: "media/movies/movie1.mp4",
    },
    {
      title: "Movie Title 2",
      image: "https://via.placeholder.com/200x300.png?text=Movie+2",
      video: "media/movies/movie2.mp4",
    },
  ],
  tv_shows: [
    {
      title: "TV Show Title 1",
      image: "https://via.placeholder.com/200x300.png?text=Show+1",
      video: "media/tv_shows/tv_show1.mp4",
    },
    {
      title: "TV Show Title 2",
      image: "https://via.placeholder.com/200x300.png?text=Show+2",
      video: "media/tv_shows/tv_show2.mp4",
    },
  ],
};

export default function LegacyClient() {
  const [overlayOpen, setOverlayOpen] = React.useState(false);
  const [currentVideo, setCurrentVideo] = React.useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = React.useState<string>('');
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const playMedia = (item: MediaItem) => {
    setCurrentVideo(item.video);
    setCurrentTitle(item.title);
    setOverlayOpen(true);
    // play will be triggered in effect when src updates
  };

  const closeOverlay = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setOverlayOpen(false);
    setCurrentVideo(null);
    setCurrentTitle('');
  };

  React.useEffect(() => {
    if (overlayOpen && videoRef.current && currentVideo) {
      // small timeout to ensure video element has mounted
      const p = videoRef.current.play();
      if (p && p.catch) p.catch(() => {});
    }
  }, [overlayOpen, currentVideo]);

  return (
    <div>
      <style>{`
        :root{--bg-color:#141414;--card-bg:#222;--text-color:#fff;--accent-color:#e50914;--hover-shadow:rgba(229,9,20,0.4)}
        .legacy-body{font-family:Roboto, sans-serif;background-color:var(--bg-color);color:var(--text-color);margin:0;padding:0;line-height:1.6;min-height:100vh}
        .legacy-header{background-color:var(--bg-color);padding:20px 50px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #333;position:sticky;top:0;z-index:1000}
        .legacy-logo{font-size:2em;font-weight:700;color:var(--accent-color)}
        .legacy-nav a{color:var(--text-color);text-decoration:none;margin-left:25px;font-size:1.1em;transition:color .3s}
        .legacy-nav a:hover{color:var(--accent-color)}
        .hero{background:url('/images/hero.jpg') no-repeat center center/cover;height:500px;display:flex;align-items:flex-end;padding:50px;color:var(--text-color)}
        .hero-content h1{font-size:3em;margin-bottom:10px}
        .hero-content p{font-size:1.2em;width:50%}
        .btn{background-color:var(--accent-color);color:var(--text-color);padding:10px 20px;text-decoration:none;border-radius:5px;font-weight:700;margin-top:15px;display:inline-block}
        .btn:hover{background-color:#f40612}
        .category-section{margin-top:40px}
        .category-section h2{font-size:2em;margin-bottom:20px}
        .media-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:20px}
        .media-card{background-color:var(--card-bg);border-radius:8px;overflow:hidden;text-align:center;cursor:pointer;transition:transform .3s,box-shadow .3s}
        .media-card:hover{transform:translateY(-5px);box-shadow:0 5px 15px var(--hover-shadow)}
        .media-card img{width:100%;height:300px;object-fit:cover;display:block}
        .media-card h3{margin:15px 0;font-size:1.2em}
        footer{text-align:center;padding:20px;margin-top:40px;border-top:1px solid #333;color:#888}
        .overlay{position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.9);display:flex;justify-content:center;align-items:center;z-index:2000}
        .video-container{position:relative;width:80%;max-width:1200px}
        .video-container video{width:100%;height:auto}
        .close-btn{position:absolute;top:20px;right:20px;font-size:2em;color:var(--text-color);cursor:pointer}
        .video-details{padding:20px;text-align:center}
      `}</style>

      <div className="legacy-body">
        <header className="legacy-header">
          <div className="legacy-logo">MafShows</div>
          <nav className="legacy-nav">
            <a href="/">Home</a>
            <a href="/movies">Movies</a>
            <a href="/tv-shows">TV Shows</a>
          </nav>
        </header>

        <main>
          <section id="home">
            <div className="hero">
              <div className="hero-content">
                <h1>Your Personal Media Hub</h1>
                <p>Stream movies and TV shows.</p>
                <Link href="/home" className="btn">Browse Now</Link>
              </div>
            </div>
          </section>

          {/* Movies and TV Shows sections removed as requested - keeping only the hero */}
        </main>

        <footer>
          <p>&copy; 2025 MafShows. All Rights Reserved. For personal use only.</p>
        </footer>

        {overlayOpen && (
          <div id="video-overlay" className="overlay" onClick={closeOverlay}>
            <div className="video-container" onClick={(e) => e.stopPropagation()}>
              <span className="close-btn" onClick={closeOverlay}>&times;</span>
              <video ref={videoRef} id="media-player" controls src={currentVideo ?? undefined} />
              <div className="video-details">
                <h2 id="media-title">{currentTitle}</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
