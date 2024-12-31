import React, { useState } from 'react';
import './App.css';

// Sample movie data
const movieData = [
  { id: 1, title: 'Inception', genre: 'Sci-Fi', year: 2010 },
  { id: 2, title: 'The Dark Knight', genre: 'Action', year: 2008 },
  { id: 3, title: 'Interstellar', genre: 'Sci-Fi', year: 2014 },
  { id: 4, title: 'Parasite', genre: 'Thriller', year: 2019 },
  { id: 5, title: 'The Shawshank Redemption', genre: 'Drama', year: 1994 },
];

function App() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  
  // Filter movies based on genre
  const filteredMovies = selectedGenre === 'All' 
    ? movieData 
    : movieData.filter(movie => movie.genre === selectedGenre);

  return (
    <div className="app">
      <h1>Movie Recommendation</h1>

      <div className="genre-filter">
        <label htmlFor="genre-select">Filter by Genre:</label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Drama">Drama</option>
          <option value="Thriller">Thriller</option>
        </select>
      </div>

      <div className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              <p>Genre: {movie.genre}</p>
              <p>Year: {movie.year}</p>
            </div>
          ))
        ) : (
          <p>No movies available for this genre.</p>
        )}
      </div>
    </div>
  );
}

export default App;
