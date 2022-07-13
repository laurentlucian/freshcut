import { MutableRefObject, useEffect, useState } from 'react';

const useOnScreen = <T extends Element>(ref: MutableRefObject<T>, rootMargin = '0px'): boolean => {
  // state and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []); // empty array ensures that effect is only run on mount and unmount
  return isIntersecting;
};

export default useOnScreen;
