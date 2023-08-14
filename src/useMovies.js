import { useState, useEffect } from 'react';

const KEY = '62a442e7';

export const useMovies = (query, callback) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // callback?.();
    // To avoid the race condition between the api calls when we type to the search input.
    // Browser API
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal } // connect the AbortController with our fetch
        );
        if (!res.ok)
          throw new Error('Something went wrong with fetching movies');

        const data = await res.json();
        if (data.Response === 'False') throw new Error('Movie not found');

        setMovies(data.Search);
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    fetchMovies();

    return () => {
      // With each keystroke we have a re-render and the cleanup function gets called.
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
};
