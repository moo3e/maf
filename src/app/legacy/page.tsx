'use client';

import React from 'react';

export default function LegacyPage() {
  return (
    <div>
      <style>{`
        :root {
          --bg-color: #141414;
          --card-bg: #222;
          --text-color: #fff;
          --accent-color: #e50914;
          --hover-shadow: rgba(229, 9, 20, 0.4);
        }
        .legacy-body {
          font-family: 'Roboto', sans-serif;
          background-color: var(--bg-color);
          color: var(--text-color);
          margin: 0;
          padding: 0;
          line-height: 1.6;
          min-height: 100vh;
        }
        .legacy-header {
          background-color: var(--bg-color);
          padding: 20px 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #333;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .legacy-logo {
          font-size: 2em;
          font-weight: 700;
          color: var(--accent-color);
        }
        .legacy-nav a {
          color: var(--text-color);
          text-decoration: none;
          margin-left: 25px;
          font-size: 1.1em;
          transition: color 0.3s ease;
        }
        .legacy-nav a:hover { color: var(--accent-color); }
        .container { max-width: 1200px; margin: auto; padding: 20px; }
        .hero {
          background: url('/images/hero.jpg') no-repeat center center/cover;
          height: 500px; display: flex; align-items: flex-end; padding: 50px; color: var(--text-color);
        }
        .hero-content h1 { font-size: 3em; margin-bottom: 10px; }
        .hero-content p { font-size: 1.2em; width: 50%; }
        .btn { background-color: var(--accent-color); color: var(--text-color); padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight:700; margin-top:15px; display:inline-block; }
        .btn:hover { background-color: #f40612; }
        .category-section { margin-top: 40px; }
        .category-section h2 { font-size: 2em; margin-bottom: 20px; }
        .media-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
        .media-card { background-color: var(--card-bg); border-radius: 8px; overflow: hidden; text-align:center; cursor:pointer; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .media-card:hover { transform: translateY(-5px); box-shadow: 0 5px 15px var(--hover-shadow); }
        .media-card img { width: 100%; height: 300px; object-fit: cover; display:block; }
        .media-card h3 { margin: 15px 0; font-size: 1.2em; }
        footer { text-align:center; padding:20px; margin-top:40px; border-top:1px solid #333; color:#888; }
        .overlay { position: fixed; top:0; left:0; width:100%; height:100%; background-color: rgba(0,0,0,0.9); display:none; justify-content:center; align-items:center; z-index:2000; }
        .video-container { position:relative; width:80%; max-width:1200px; }
        .video-container video { width:100%; height:auto; }
        .close-btn { position:absolute; top:20px; right:20px; font-size:2em; color:var(--text-color); cursor:pointer; }
        .video-details { padding:20px; text-align:center; }
        .video-details h2 { margin-top:0; }
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
                <a href="#movies" className="btn">Browse Now</a>
              </div>
            </div>
          </section>

          <div className="container">
            <section id="movies" className="category-section">
              <h2>Movies</h2>
              <div className="media-grid" id="movie-grid"></div>
            </section>

            <section id="tv_shows" className="category-section">
              <h2>TV Shows</h2>
              <div className="media-grid" id="tv-grid"></div>
            </section>
          </div>
        </main>

        <footer>
          <p>&copy; 2025 Mashows. All Rights Reserved. For personal use only.</p>
        </footer>

        <div id="video-overlay" className="overlay">
          <span className="close-btn">&times;</span>
          <div className="video-container">
            <video id="media-player" controls autoPlay></video>
            <div className="video-details">
              <h2 id="media-title"></h2>
            </div>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            const mediaData = {
              movies: [
                { title: "Movie Title 1", image: "https://via.placeholder.com/200x300.png?text=Movie+1", video: "media/movies/movie1.mp4" },
                { title: "Movie Title 2", image: "https://via.placeholder.com/200x300.png?text=Movie+2", video: "media/movies/movie2.mp4" }
              ],
              tv_shows: [
                { title: "TV Show Title 1", image: "https://via.placeholder.com/200x300.png?text=Show+1", video: "media/tv_shows/tv_show1.mp4" },
                { title: "TV Show Title 2", image: "https://via.placeholder.com/200x300.png?text=Show+2", video: "media/tv_shows/tv_show2.mp4" }
              ]
            };

            function createMediaCard(item) {
              const card = document.createElement('div');
              card.className = 'media-card';
              card.innerHTML = '<img src="' + item.image + '" alt="' + item.title + '"><h3>' + item.title + '</h3>';
              card.addEventListener('click', function(){ playMedia(item); });
              return card;
            }

            function populateGrid(gridElement, data){
              gridElement.innerHTML = '';
              data.forEach(function(item){ gridElement.appendChild(createMediaCard(item)); });
            }

            function playMedia(item){
              var mediaPlayer = document.getElementById('media-player');
              var mediaTitle = document.getElementById('media-title');
              var videoOverlay = document.getElementById('video-overlay');
              mediaPlayer.src = item.video;
              mediaTitle.textContent = item.title;
              videoOverlay.style.display = 'flex';
              mediaPlayer.play();
            }

            document.querySelector('.close-btn').addEventListener('click', function(){
              var mediaPlayer = document.getElementById('media-player');
              var videoOverlay = document.getElementById('video-overlay');
              mediaPlayer.pause();
              videoOverlay.style.display = 'none';
            });

            populateGrid(document.getElementById('movie-grid'), mediaData.movies);
            populateGrid(document.getElementById('tv-grid'), mediaData.tv_shows);
          })();
        `}} />
      </div>
    </div>
  );
}
