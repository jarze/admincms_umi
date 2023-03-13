import React, { forwardRef, memo, useMemo } from 'react';
import EchartsReact from 'echarts-for-react';
import useIntervalRequestChange from '../useIntervalRequestChange';
import { ResponseOfComponentType } from '../../../type';
import ChartConfig from '../config';

interface LineProps {
  /** 请求数据 返回[图表数据，搜索项] */
  fetch?: (params?: any) => Promise<ResponseOfComponentType<'LINE_CHART'>>;
  /** 刷新接口请求频率， 若为空或0 不做定时刷新 */
  interval?: number;
  /** 边距 */
  grid?: {
    left?: any;
    right?: any;
    top?: any;
    bottom?: any;
  };
  /** 图表定义 */
  // option?: Record<string, any>;
  [key: string]: any;
}

const Line = memo<LineProps>(
  forwardRef<any, LineProps>((params, ref) => {
    const { fetch, smooth, interval, stack, grid } = params;
    const { dataSource, loading, search } = useIntervalRequestChange<
      ResponseOfComponentType<'LINE_CHART'>
    >({
      fetch,
      interval,
    });

    const handler = useMemo(() => {
      const { data, unit } = (dataSource as any) || {};
      return ChartConfig.chartOptionMergeDefault('line', {
        series:
          data?.data?.map?.(i => ({ smooth, ...(stack ? { stack: 'line' } : {}), ...i })) || [],
        xAxis: data?.xAxis,
        yAxis: { name: unit },
        grid,
      });
    }, [dataSource, smooth, stack, grid]);
    return (
      <>
        {search}
        {/* <div>{`总计:${dataSource?.total} ${dataSource?.unit}`}</div> */}
        <EchartsReact
          ref={ref as any}
          option={handler}
          showLoading={loading}
          loadingOption={ChartConfig.loadingOption}
          notMerge={true}
          lazyUpdate={true}
          style={{ height: search ? 'calc(100% - 2em)' : '100%' }}
          opts={{ devicePixelRatio: 2 }}
        />
      </>
    );
  }),
);

//@ts-ignore
Line.defaultProps = {
  smooth: true,
  stack: false,
  interval: null,
  grid: {
    top: 40,
    bottom: 40,
    left: '10%',
    right: '10%',
  },
};

export default Line;
