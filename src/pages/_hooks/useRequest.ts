import { useEffect, useState, useRef } from 'react';

export default function useRequest<T extends any>({
  fetchData,
  params = null,
  handlerData = null,
}) {
  const [loading, setLoading] = useState(false);
  const mounted = useRef<boolean>(true);
  const [data, setData] = useState<T>();

  useEffect(
    () => () => {
      mounted.current = false;
    },
    [],
  );

  useEffect(() => {
    if (!fetchData) return;
    setLoading(true);
    fetchData(params)
      .then(res => {
        mounted.current && setData(handlerData ? handlerData(res) : res);
      })
      .finally(() => {
        mounted.current && setLoading(false);
      });
  }, [fetchData, params]);

  return { data, loading, setData };
}
