import { forwardRef, useEffect, useState, useRef, cloneElement } from 'react';

// 缓存数据
const FetchWrapperCache = {};

interface FetchSelectPros {
  fetch?: () => Promise<any>;
  /** 缓存Key 注意项目唯一 */
  cacheKey?: 'KA' | string;
  render: (data: any, loading: boolean) => React.ReactElement;
  [key: string]: any;
}

export default forwardRef((props: FetchSelectPros, ref) => {
  const { fetch, cacheKey, render, ...restProps } = props;
  const [data, setData] = useState([] as any);
  const [loading, setLoading] = useState(false as any);
  const mounted = useRef(true);

  useEffect(() => {
    if (cacheKey && FetchWrapperCache[cacheKey]?.length > 0) {
      setData(FetchWrapperCache[cacheKey] || []);
      return;
    }
    if (!fetch) return;
    setLoading({ delay: 200 });
    fetch()
      .then(res => {
        mounted.current && setData(res || []);
        cacheKey && res && (FetchWrapperCache[cacheKey] = res);
      })
      .finally(() => {
        mounted.current && setLoading(false);
      });
    return () => {
      mounted.current = false;
    };
  }, []);
  return cloneElement(render(data, loading), { ref, ...restProps });
});
