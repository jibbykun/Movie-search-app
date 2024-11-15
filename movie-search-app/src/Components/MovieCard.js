import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div
      style={{
        width: '200px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        textAlign: 'center',
      }}
    >
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
        alt={movie.Title}
        style={{ width: '100%', borderRadius: '10px' }}
      />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </div>
  );
};

export default MovieCard;