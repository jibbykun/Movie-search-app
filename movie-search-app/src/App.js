import React, { useState } from 'react';
import SearchBar from './Components/SearchBar.js';
import MovieCard from './Components/MovieCard';

//main function, defines use states
//e.g: movies is current state, setMovies is the function to update state 
const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovies = async (searchTerm) => {
    setLoading(true);
    setError('');

    //we are using an api so there is no need to store the movies in a list ourselves
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

  return (
    <div style={{ padding: '20px' }}>
      <h1>Movie Search App</h1>
      <SearchBar onSearch={fetchMovies} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default App;
