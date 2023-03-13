import { useEffect, useRef, useState, useMemo } from 'react';

const useScroll = ({ animationDuration, data }) => {
  const [scroll, setScroll] = useState(false);

  const ref = useRef<any>();

  useEffect(() => {
    if (ref?.current?.scrollHeight > ref?.current?.clientHeight) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }, [data]);

  const duration = useMemo(
    () => (scroll && animationDuration ? `${data?.length * animationDuration + 500}ms` : '0s'),
    [scroll, data, animationDuration],
  );

  return { ref, duration, scroll };
};

export default useScroll;
