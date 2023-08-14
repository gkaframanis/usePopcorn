import { useEffect } from 'react';

// Every time the component mounts a new event listener is being added!!!
// We need to clean up our event listeners.
export const useKey = (key, action) => {
  useEffect(() => {
    const callback = e => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };

    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [action, key]);
};
