import React, { useState, useMemo } from 'react';
import TabRatio from '../TabRadio';
import useTimerListNext from '../../_hooks/useTimerListNext';
import useTimerChange from '../../_hooks/useTimerChange';
import useRequest from '../../_hooks/useRequest';

type GetArrayItem<T> = T extends Array<infer A> ? A : never;

export default function useIntervalRequestChange<
  T extends Array<any>,
  P extends { data: Array<any> } = GetArrayItem<T>,
>({
  interval = null,
  timer = false,
  tabAutoChange = true,
  fetch,
  animationHighlightDuration = 5000,
}): {
  dataSource?: P;
  filterData?: T;
  search?: React.ReactNode;
  data: T;
  loading?: boolean;
  params: { key?: string };
} {
  // TODO: fetch
  const [params, setParams] = useState<{ key?: string }>({});

  const [change] = useTimerChange({ interval });

  const { data, loading } = useRequest<T>({
    fetchData: fetch,
    params: change,
  });

  const [dataSource, filterData] = useMemo(
    () => [data?.find?.(i => i.key === params?.key) || data?.[0] || {}, data],
    [data, params],
  );

  useTimerListNext({
    data: filterData,
    interval: tabAutoChange
      ? timer !== false
        ? +dataSource?.data?.length * animationHighlightDuration
        : animationHighlightDuration
      : null,
    toNext: key => setParams({ key }),
    current: params.key || filterData?.[0]?.key,
  });

  const search = useMemo(
    () =>
      filterData?.length > 1 && (
        <TabRatio
          data={filterData}
          activeKey={params.key || filterData?.[0]?.key}
          onChange={key => setParams({ key })}
        />
      ),
    [filterData, params],
  );
  return { dataSource, filterData, search, data, loading, params };
}
