import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import MovieSearch from "./MovieSearch";

const API_URL = "https://api.themoviedb.org/3";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (searchKey) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=2869ae2de4d84a2a08c4525dca867ccd&language=en-US&page=1&include_adult=false`,
         {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
          query: searchKey,
          language: 'en-US',
          page: 1,
          include_adult: false
        }
      });

      const { results } = response.data;
      setMovies(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const renderMovies = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (movies.length === 0) {
      return <p>Sorry, movie not found.</p>;
    }

    return (
      <MovieSearch key={movies[0].id} movie={movies[0]} />
    );
};


  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMovies(searchKey);
    setSearchKey('');
  };

  return (
    <div className="App">
      <header>
        <h1>Search Movie</h1>

        <SearchForm
          value={searchKey}
          onChange={setSearchKey}
          onSubmit={handleSubmit}
        />
      </header>

      <div className="container">
        {renderMovies()}
      </div>
    </div>
  );
}

function SearchForm({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={(event) => onChange(event.target.value)} />
      <button type="submit">🔍</button>
    </form>
  );
}

export default App;

