import React from 'react';

const MovieCard = ({ movie, toggleFavorite, isFavorite }) => {
  return (
    <div
      style={{
        width: '200px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
        alt={movie.Title}
        style={{ width: '100%', borderRadius: '10px' }}
      />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <button
        onClick={() => toggleFavorite(movie)}
        style={{
          padding: '5px 10px',
          marginTop: '10px',
          backgroundColor: isFavorite ? 'red' : 'lightgray',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default MovieCard;