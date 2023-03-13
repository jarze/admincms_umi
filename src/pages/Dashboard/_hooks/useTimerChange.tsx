import { useState, useRef, useEffect } from 'react';

const useTimerChange = ({ interval = 60000, reset = null }: any) => {
  const [change, setChange] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (!interval) return;
    timer.current = setInterval(() => {
      setChange(p => !p);
    }, interval);
    return () => {
      clearInterval(timer.current);
    };
  }, [reset, interval]);
  return [change, setChange];
};

export default useTimerChange;
