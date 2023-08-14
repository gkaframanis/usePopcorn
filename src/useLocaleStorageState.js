import { useState, useEffect } from 'react';

export const useLocaleStorageState = (initialState, key) => {
  // The callback needs to be pure, no arguments and will be called of course only at the initial render.
  // Pass a function that React can call later.
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
