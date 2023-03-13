import { useMemo } from 'react';
import ChartConfig, { parseSeriesData } from '../config';
import { subString, parsePie } from '../_utils';

export const useChartPieOption = (
  {
    data,
    title,
    text,
    formatter,
    showLegend = false,
    // colors,
    radius = 60,
    centerPieOffset = 22,
    radiusOffset = 8,
    split = 2,
  },
  size,
  width,
) => {
  // 百分比自定义计算显示计算
  const [handlerData, dataMap] = useMemo(() => {
    const d = parseSeriesData(data, false, split);
    return [
      d,
      d?.reduce?.(
        (r, { name: k, pie, value: v }) => (!k ? r : { ...r, [k]: pie === null ? null : pie }),
        {},
      ) || {},
    ];
  }, [data, split]);

  const center = showLegend || Boolean(text) ? ['25%', '50%'] : ['50%', '50%'];

  // const color = useMemo(
  //   () =>
  //     (colors?.length > 1
  //       ? [...colors, ...ChartConfig.PIE_COLORS.slice(colors?.length - 1)]
  //       : ChartConfig.PIE_COLORS
  //     )?.map(i => getLinearGradient(Array.isArray(i) ? i : [i])),
  //   [colors],
  // );
  const option = useMemo(() => {
    const { chartOptionMergeDefault, CHART_CONST, rich } = ChartConfig;

    const legendWidth = Math.max(
      Math.min(CHART_CONST.fontSizeSmall * 11, width * 0.5 - CHART_CONST.fontSizeSmall * 6),
      CHART_CONST.fontSizeSmall * 4,
    );
    const num = Math.floor(legendWidth / CHART_CONST.fontSizeSmall) * 2 - 2;

    return chartOptionMergeDefault('pie', {
      // color,
      title: { show: Boolean(text), text },
      legend: {
        show: showLegend && !Boolean(text),
        type: data?.length > 5 ? 'scroll' : 'plain',
        formatter: name => `{text|${subString(name, num)}}{value|${parsePie(dataMap[name])}}`,
        data: data || [],
        textStyle: {
          rich: {
            text: {
              width: legendWidth,
            },
          },
        },
      },
      series: [
        {
          type: 'pie',
          center,
          selectedOffset: 20,
          hoverOffset: -Math.floor(
            Math.max(size * (((centerPieOffset - radiusOffset) * 0.5) / 100.0), 14),
          ),
          radius: [`${radius}%`, `${radius - radiusOffset}%`],
          // value 为 null 不会画出来，需为0
          minAngle: 1,
          label: {
            show: false,
            position: 'center',
            lineHeight: CHART_CONST.fontSize * 1.5,
            fontSize: CHART_CONST.fontSize,
            rich,
            formatter:
              title ||
              formatter ||
              (({ data, name }) =>
                name ? `{text|${subString(name, 14)}}\n{value|${parsePie(data?.pie)}}` : ''),
          },
          labelLine: { show: false },
          data: handlerData,
          emphasis: { label: { show: !Boolean(title) } },
          z: 2,
          hoverAnimation: true,
          legendHoverLink: false,
          // silent: true,
        },
        //中心圆环
        {
          type: 'pie',
          silent: true,
          center,
          itemStyle: { color: CHART_CONST.bgColor, opacity: 0.2 },
          radius: [0, `${radius - centerPieOffset}%`],
          data: [{ name: title, value: 1 }],
          label: {
            show: true,
            position: 'center',
            ...rich.value,
          },
          labelLine: { show: false },
          z: -1,
          animation: false,
        },
      ],
    });
  }, [
    showLegend,
    radius,
    radiusOffset,
    centerPieOffset,
    title,
    text,
    formatter,
    // color,
    handlerData,
  ]);
  return option;
};
