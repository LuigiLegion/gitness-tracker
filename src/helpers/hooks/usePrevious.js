// Imports
import { useEffect, useRef } from 'react';

// Custom Hook
const usePrevious = value => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

// Exports
export default usePrevious;
