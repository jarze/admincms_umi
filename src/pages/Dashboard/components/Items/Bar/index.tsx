import React, { forwardRef, memo, useMemo, Fragment } from 'react';
import EchartsReact from 'echarts-for-react';
import { isNil } from 'lodash';
import useIntervalRequestChange from '../useIntervalRequestChange';
import { ResponseOfComponentType } from '../../../type';
import ChartConfig from '../config';

interface BarProps {
  /** 请求数据 返回[图表数据，搜索项] */
  fetch?: (params?: any) => Promise<ResponseOfComponentType<'BAR_CHART'>>;
  /** 刷新接口请求频率， 若为空或0 不做定时刷新 */
  interval?: number;
  /** 边距 */
  grid?: {
    left?: any;
    right?: any;
    top?: any;
    bottom?: any;
  };
  // /** 图表定义 */
  // option?: Record<string, any>;
  /** 显示总计 */
  total?: boolean;
  [key: string]: any;
}

const Total = ({ value, unit }) => {
  return isNil(value) ? (
    <Fragment />
  ) : (
    <div style={{ ...ChartConfig.rich.text, height: '3em', lineHeight: '3em' }}>
      总计:&nbsp;&nbsp;
      <span style={ChartConfig.rich.value}>{value ?? '--'}</span>
      <span style={{ ...ChartConfig.rich.value, fontSize: ChartConfig.rich.text.fontSize }}>
        {' '}
        {unit || ''}
      </span>
    </div>
  );
};

const Bar = memo<BarProps>(
  forwardRef<any, BarProps>((params, ref) => {
    const { fetch, stack, interval, total, grid } = params;

    const { dataSource, loading, search } = useIntervalRequestChange<
      ResponseOfComponentType<'BAR_CHART'>
    >({
      fetch,
      interval,
    });

    const handler = useMemo(() => {
      const { data, unit } = (dataSource as any) || {};
      return ChartConfig.chartOptionMergeDefault('bar', {
        series:
          data?.data?.map?.(i => ({
            stack: stack ? 'bar' : undefined,
            ...i,
          })) || [],
        xAxis: data?.xAxis,
        yAxis: { name: unit },
        grid,
      });
    }, [dataSource, stack, grid]);

    const h = `${(total ? 3 : 0) + (search ? 2 : 0)}em`;
    return (
      <>
        {search}
        {total && <Total value={dataSource?.total} unit={dataSource?.unit} />}
        <EchartsReact
          ref={ref as any}
          option={handler}
          showLoading={loading}
          loadingOption={ChartConfig.loadingOption}
          notMerge={true}
          lazyUpdate={true}
          style={{ height: h ? `calc(100% - ${h})` : '100%' }}
          opts={{ devicePixelRatio: 2 }}
        />
      </>
    );
  }),
);

//@ts-ignore
Bar.defaultProps = {
  total: false,
  stack: false,
  interval: null,
  grid: {
    top: 40,
    bottom: 40,
    left: '10%',
    right: '10%',
  },
};

export default Bar;
