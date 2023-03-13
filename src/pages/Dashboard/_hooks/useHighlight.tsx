import { useEffect, useCallback, useRef, useMemo } from 'react';
export interface useHighlightProps {
  data;
  ref: any;
  gap?: number;
  /** 图表index */
  seriesIndex?: number;
  /** 定时切换 */
  timer?: boolean;
  /** 切换间隔 */
  animationHighlightDuration?: number;
  /** echarts配置 legendId */
  legendId?: string;
  /** 高亮回调 */
  onHighlightChange?: (
    /** 当前高亮 */
    index: number | null,
    /** echarts */
    instance: any,
    /** 高亮样式 legend.data. textStyle */
    hightLightTextStyle?: any,
  ) => void;
}

export default function useHighlight({
  ref,
  data,
  gap = 2,
  seriesIndex = 0,
  timer = true,
  animationHighlightDuration = 3000,
  legendId = 'pie',
  onHighlightChange = null,
}: useHighlightProps): [any, any] {
  const timerRef = useRef<any>({ timer: null, selectedIndex: 0, timerOut: null, stop: false });
  const chartRef = useRef(ref);
  const len = data?.length || 0;

  useEffect(() => {
    const el = chartRef?.current?.echartsElement?.parentElement;
    if (!el) return;
    el.onmouseover = e => {
      e?.stopPropagation?.();
      timerRef.current.stop = true;
    };
    el.onmouseout = e => {
      e?.stopPropagation?.();
      timerRef.current.stop = false;
    };
  }, [chartRef?.current]);

  const chartToIndex = useCallback(
    index => {
      timerRef.current.selectedIndex = Math.ceil(index);
      const instance = chartRef?.current?.getEchartsInstance?.();
      if (!instance) return;
      onHighlightChange?.(index, instance);
      // 取消高亮
      instance.dispatchAction?.({ type: 'downplay' });
      if (index === null) return;
      instance.dispatchAction?.({
        type: 'highlight',
        seriesIndex: seriesIndex,
        dataIndex: timerRef.current.selectedIndex * (gap || 1),
      });
      instance.dispatchAction?.({
        type: 'legendScroll',
        scrollDataIndex: timerRef.current.selectedIndex,
        legendId,
      });
    },
    [chartRef?.current, timerRef],
  );

  const chartHighlightIndex = useCallback(
    (index, reset = false) => {
      if (!reset && timerRef.current.stop) {
        return;
      } else {
        timerRef.current.selectedIndex = Math.ceil(index);
      }
      clearTimeout(timerRef.current.timerOut);
      timerRef.current.timerOut = setTimeout(() => {
        chartToIndex(index);
      }, 400);
    },
    [chartRef?.current, timerRef],
  );

  const onEvents = useMemo(() => {
    const mouseChange = e => {
      const index = Math.ceil((e?.dataIndex ?? 0) / (gap || 1));
      if (timerRef.current.selectedIndex === index) {
        return;
      }
      chartToIndex(index);
    };
    return {
      // 鼠标进入
      mouseover: mouseChange,
      // 鼠标移出
      mouseout: () => {
        !timer && chartToIndex(null);
      },
    };
  }, [chartRef?.current]);

  useEffect(() => {
    if (timer) {
      chartHighlightIndex(0, true);
      if (len < 2) return;
      timerRef.current.timer = setInterval(() => {
        const p = timerRef.current.selectedIndex;
        const next = p >= len - 1 ? 0 : p + 1;
        chartHighlightIndex(next);
      }, animationHighlightDuration);
    } else {
      chartHighlightIndex(0, true);
    }
    return () => {
      clearInterval(timerRef.current.timer);
      clearTimeout(timerRef.current.timerOut);
    };
  }, [data, chartHighlightIndex, animationHighlightDuration, timer]);

  return [chartRef, onEvents];
}
