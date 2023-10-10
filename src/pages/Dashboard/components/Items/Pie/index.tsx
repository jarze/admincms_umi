import React, { forwardRef } from 'react'
import useIntervalRequestChange from '../useIntervalRequestChange'
import { ResponseOfComponentType } from '../../../type'
import EchartsReact from 'echarts-for-react'
import useHighlight, { useHighlightProps } from '../../../_hooks/useHighlight'
import { merge } from 'lodash'
import ChartConfig from '../config'
import { useChartPieOption } from './_logic'

type SearchPieDataType = ResponseOfComponentType<'PIE_CHART'>

interface SearchPieProps {
  /** 请求数据 返回[图表数据，搜索项] */
  fetch?: (params?: any) => Promise<SearchPieDataType>
  /** 刷新接口请求频率， 若为空或0 不做定时刷新 */
  interval?: number
  // /** 搜索项自动切换, 默认false */
  // tabAutoChange?: boolean;

  /** 右侧text显示 */
  text?: string
  /** 中心固定文案显示 */
  title?: string
  /** series-pie.label. formatter 中心圆显示 */
  formatter?: string | ((params: any) => string)
  /** 定时切换highlight */
  timer?: boolean
  /** 是否显示右侧legend */
  showLegend?: boolean
  /** 图表定义 */
  option?: Record<string, any>
  /** 数据 */
  data?: Array<{ name: string; value?: number | string }>
  /** 1- 100 */
  radius?: number
  /** 圆环宽度 */
  radiusOffset?: number
  /** 中心圆相对 */
  centerPieOffset?: number
  colors?: Array<string | Array<string>>
  /** 空隙 1 - 100 */
  split?: number | null
  /** timer时有效， 自动切换高亮动画时长=3000 */
  animationHighlightDuration?: number
  /** 高亮切换回调 */
  onHighlightChange?: useHighlightProps['onHighlightChange']
  [key: string]: any
}

const SearchPie = forwardRef<any, SearchPieProps>(
  (
    {
      fetch,
      interval = null,
      animationHighlightDuration = 3000,
      // tabAutoChange = true,
      className,
      timer,
      onHighlightChange,
      option,
      ...props
    },
    ref
  ) => {
    const { dataSource, loading, search } = useIntervalRequestChange<SearchPieDataType>({
      fetch,
      interval,
      tabAutoChange: timer,
      timer: timer,
      animationHighlightDuration
    })

    const { split = 2 } = props

    const [chartRef, onEvents] = useHighlight({
      ref,
      data: dataSource?.data,
      timer,
      gap: split ? 2 : 1,
      animationHighlightDuration,
      onHighlightChange
    })

    // 图表尺寸
    const size = [
      chartRef?.current?.getEchartsInstance?.()?.getWidth?.() || 0,
      chartRef?.current?.getEchartsInstance?.()?.getHeight?.() || 0
    ]
    //@ts-ignore
    const opt = useChartPieOption({ ...props, data: dataSource?.data }, Math.min(...size), size[0])

    return (
      <>
        {search}
        <EchartsReact
          ref={chartRef}
          loadingOption={ChartConfig.loadingOption}
          onEvents={onEvents}
          notMerge={true}
          lazyUpdate={true}
          showLoading={loading}
          option={merge(opt, { ...option }) as any}
          style={{ height: search ? 'calc(100% - 2em)' : '100%' }}
          opts={{ devicePixelRatio: 2 }}
        />
      </>
    )
  }
)

SearchPie.defaultProps = {
  showLegend: false,
  timer: true,
  radius: 60,
  centerPieOffset: 22,
  radiusOffset: 8
}
export default SearchPie
