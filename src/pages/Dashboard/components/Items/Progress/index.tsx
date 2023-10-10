import React, { memo, forwardRef, useMemo } from 'react'
import EchartsReact from 'echarts-for-react'
import useIntervalRequestChange from '../useIntervalRequestChange'
import { ResponseOfComponentType } from '../../../type'

import ChartConfig, { parseSeriesData } from '../config'

type ProgressDataType = ResponseOfComponentType<'PROGRESS_CHART'>

interface ProgressProps {
  /** 请求数据 返回[图表数据，搜索项] */
  fetch?: (params?: any) => Promise<ProgressDataType>
  /** 刷新接口请求频率， 若为空或0 不做定时刷新 */
  interval?: number
  /** 搜索项自动切换, 默认false */
  tabAutoChange?: boolean
  /** TODO: */
  [key: string]: any
}

const Progress = forwardRef<any, ProgressProps>(
  (
    {
      fetch,
      interval,
      tabAutoChange = true,
      showLegend,
      title,
      color = ChartConfig.CHART_CONST.themeColor
    },
    ref
  ) => {
    const { dataSource, loading, search } = useIntervalRequestChange<ProgressDataType>({
      fetch,
      interval,
      tabAutoChange,
      timer: false,
      animationHighlightDuration: 3000
    })

    const option = useMemo(() => {
      const center = showLegend ? ['25%', '50%'] : ['50%', '50%']
      const text =
        showLegend &&
        `总计：{value|${dataSource?.data?.total || ''} ${dataSource?.unit ||
          ''}}\n\n当前：{value|${dataSource?.data?.value || ''} ${dataSource?.unit || ''}}`

      const radius = 60,
        centerPieOffset = 22,
        radiusOffset = 8
      const { CHART_CONST, rich, chartOptionMergeDefault } = ChartConfig
      return chartOptionMergeDefault('progress', {
        color: [color],
        title: { show: Boolean(text), text },
        series: [
          {
            type: 'pie',
            center,
            radius: [`${radius}%`, `${radius - centerPieOffset}%`],
            minAngle: 1,
            label: {
              show: true,
              position: 'center',
              lineHeight: CHART_CONST.fontSize * 1.5,
              fontSize: CHART_CONST.fontSize,
              rich,
              formatter: title || `{text|{b}}\n{value| {c} ${dataSource?.unit || ''}}\n{value|{d}%}`
            },
            data: dataSource?.data && parseSeriesData([dataSource?.data], true),
            z: 2,
            hoverAnimation: false
          },
          //中心圆环
          {
            type: 'pie',
            silent: true,
            center,
            itemStyle: { color: CHART_CONST.bgColor, opacity: 0.2 },
            radius: [0, `${radius - centerPieOffset}%`],
            data: [{ value: 1 }],
            z: -1,
            animation: false
          },
          {
            type: 'pie',
            silent: true,
            center,
            radius: [`${radius}%`, `${radius - radiusOffset}%`],
            itemStyle: { color, opacity: 0.25 },
            label: { show: false },
            data: [1],
            z: -2,
            animation: false
          }
        ]
      })
    }, [dataSource, color, showLegend, title])

    return (
      <>
        {search}
        <EchartsReact
          ref={ref as any}
          option={option as any}
          showLoading={loading}
          notMerge={true}
          lazyUpdate={true}
          loadingOption={ChartConfig.loadingOption}
          style={{ height: search ? 'calc(100% - 2em)' : '100%' }}
          opts={{ devicePixelRatio: 2 }}
        />
      </>
    )
  }
)

export default memo<ProgressProps>(Progress)
