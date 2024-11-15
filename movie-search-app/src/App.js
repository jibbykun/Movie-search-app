import React, { useState, useEffect } from 'react';
import SearchBar from './Components/SearchBar';
import MovieCard from './Components/MovieCard';
import './App.css'

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch favorites from localStorage when the app loads
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Function to fetch movies
  const fetchMovies = async (searchTerm) => {
    setLoading(true);
    setError('');
    const apiKey = 'fec938ea';
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error);
      }
    } catch (error) {
      setError('Failed to fetch data');
    }
    setLoading(false);
  };

  // Function to add or remove a movie from favorites
  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
    let updatedFavorites;
    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, movie];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 className='center-heading'>Movie Search App</h1>
      <SearchBar onSearch={fetchMovies} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} toggleFavorite={toggleFavorite} isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)} />
        ))}
      </div>
      <h2>Your Favorites</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {favorites.length === 0 && <p>No favorite movies added yet.</p>}
        {favorites.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} toggleFavorite={toggleFavorite} isFavorite={true} />
        ))}
      </div>
    </div>
  );
};

export default App;
