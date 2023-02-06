import React from 'react';

const MovieSearch = ({movie}) => {
    const d = new Date(movie.release_date);
    return (
      <div className="results">
        <p>Title: {movie.title}</p>
        <p>{movie.overview}</p>
        <p>Release Date: {d.toLocaleDateString()}</p>
      </div>
    );
  };
  

export default MovieSearch;