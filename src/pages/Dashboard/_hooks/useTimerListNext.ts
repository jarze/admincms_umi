import { useEffect, useMemo } from 'react';
import useTimerChange from './useTimerChange';

const useTimerListNext = ({ interval = 6000, data, current, toNext, keyKey = 'key' }: any) => {
  const [change] = useTimerChange({
    /** 有切换项且定时器时 开启自动切换并且设置最小切换时长6000 */
    interval: data?.length > 1 && interval ? Math.max(interval / 2, 3000) : null,
    reset: data,
  });
  const keys = useMemo(() => data?.map?.(i => i[keyKey]), [data]);

  useEffect(() => {
    // 通过change跳过 第一次更改
    if (!keys?.length || !change) return;

    const currentIndex = current ? keys?.indexOf(current) : 0;
    const next = currentIndex + 1 >= keys?.length ? 0 : currentIndex + 1;
    toNext?.(data?.[next]?.[keyKey]);
  }, [change]);
};

export default useTimerListNext;
