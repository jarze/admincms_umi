import { merge, mergeWith, isArray, isObject, cloneDeep } from 'lodash';
import { themeInstance as theme } from '../Theme/_theme';
import Color from 'color';

// 色盘
const getRotateColors = (color, dge = -162, rotate = 0) => {
  return new Array(10).fill(dge).map((i, j) => {
    const c = Color(color).rotate((i * j) % 360);
    return [
      c.string(),
      c
        .rotate(rotate * (j % 2))
        .darken(0.33)
        .desaturate(0.05)
        .string(),
    ];
  });
};

// echarts 渐变色
export const getLinearGradient = (c: Array<string>, orient = { x: 0, y: 0, x2: 1, y2: 0 }): any => {
  if (c?.length < 2) return c?.[0];
  const s = new Array(c.length).fill(c.length - 1).map((len, i) => ({
    offset: (1.0 / len) * i,
    color: c[i],
  }));
  return {
    type: 'linear',
    ...orient,
    colorStops: s,
  };
};

// export const CHART_CONST = {
//   themeColor: '#24FCFF',
//   themeColor1: '#05B8BB',
//   themeOpacityBgColor: 'rgba(36, 252, 255, 0.15)',
//   themeOpacityColor: 'rgba(36, 252, 255, 0.5)',
//   bgColor: '#0058BC',
//   fontSize: 20,
//   fontSizeMiddle: 18,
//   fontSizeSmall: 14,
//   fontSizeXS: 12,
//   fontSizeLarge: 24,
//   color: '#fff',
//   secondColor: 'rgba(255,255,255,0.85)',
//   fontFamily: 'DIN-Regular',
//   upColor: 'rgb(243 64 0)',
//   downColor: '#21E897',
//   axisSplitColor: 'rgba(255, 255, 255, .2)',
//   axisLabelColor: 'rgba(255, 255, 255, .45)',
//   legendTextColor: 'rgba(255, 255, 255, .8)',
// };

export const ChartIconMap = {
  line: 'M1.19694305,10.2914863 C1.62719581,9.6590509 2.83321045,7.508 5.54070823,7.508 C9.27692772,7.508 9.81611087,11.5149889 12,11.5149889 C14.1729711,11.5149889 14.9116706,9.96232504 15.4626329,9.05118966 C15.7427236,8.58799897 16.2639001,8.09885094 16.7238845,8.36336852 C17.0305408,8.53971357 17.1051866,8.85391264 16.9478219,9.30596572 C15.8593971,11.818637 14.2101231,13.0749726 12,13.0749726 C8.9488875,13.0749726 8.30660169,9.05118966 5.54070823,9.05118966 C3.53913493,9.05118966 2.59630684,11.0033242 2.3432282,11.2591566 C2.09014956,11.5149889 1.71887157,12.0143782 1.19694305,11.7646836 C0.675014537,11.5149889 0.856059445,10.7925565 1.19694305,10.2914863 Z',
};

export const pageIconsVertical = [
  'M0,0L2,0L10,-8L18,0L20,0L10,-10z',
  'M0,0L2,0L10,8L18,0L20,0L10,10z',
];

//将图表属性 object 合并进 Array 的每项里，数组concat合并
const optionMergeCustomizer = (object, sources, key): any => {
  if (object && key === 'series') {
    if (isArray(sources) && isObject(object) && !isArray(object)) {
      return sources.map(i => ({ ...object, ...i }));
    }
    if (isArray(object) && isObject(sources) && !isArray(sources)) {
      return object.map(i => ({ ...i, ...sources }));
    }
    if (isArray(object) && isArray(sources)) {
      return object.concat(sources);
    }
  }
};

export const optionsMergeWith = (object, source) => {
  return mergeWith(cloneDeep(object), source, optionMergeCustomizer);
};
export const placeSeriesItem = {
  /** process 补位 考虑已大等于100就不需要补位 */
  processSuffix: (pie, v = pie) =>
    v <= 0
      ? []
      : [
          {
            value: v || 100,
            pie: pie || 100,
            itemStyle: { opacity: 0 },
            label: { show: false },
            emphasis: { label: { show: false } },
          },
        ],
  /** 间隔空隙 */
  splitItem: (len, sum = 100.0, split = 2) => ({
    value: (((split * 100.0) / (100.0 - split * len)) * sum) / 100.0,
    itemStyle: { color: 'transparent' },
  }),
};

const getItemPie = i => {
  return i?.percent ?? i?.rate ?? i?.value;
};

// 通过插入透明项数据实现间隔 ，so不能直接使用 图表的百分比
export const parseSeriesData = (data, isProcess = false, split = 2, decimal = 2) => {
  if (data?.length < 2) {
    if (isProcess) {
      if (!data?.length) {
        return placeSeriesItem.processSuffix(100);
      }

      const pie = getItemPie(data?.[0]) || 0;
      const place = (data?.[0].value / pie) * (100.0 - pie);
      return [{ ...data[0], pie }, ...placeSeriesItem.processSuffix?.(Number(100 - pie), place)];
    }
    // 只有一个数据不需要插入间隙
    return (data || [])?.map(i => ({ ...i, pie: i?.value === null ? null : 100 }));
  }

  const sum = data?.reduce?.((s, c) => s + +(c.value ?? 0), 0);
  const len = data?.length;

  let current = 0.0;
  // 计算占比 直接取percent||rate 或 通过sum 计算
  const pies = data?.map?.((i, index) => {
    const pie = ((i?.percent ?? i?.rate ?? i?.value / sum) * 100.0).toFixed(decimal);
    if (index === len - 1) {
      return i?.value === null
        ? null
        : Number(i?.percent || i?.rate ? (i?.percent || i?.rate) * 100 : 100.0 - current).toFixed(
            decimal,
          );
    }
    current += Number(pie);
    return i?.value === null ? null : pie;
  });

  if (split) {
    // split 项插入  pie 占比数据插入
    return new Array((data?.length || 0) * 2)
      .fill(placeSeriesItem.splitItem(data?.length, sum, split))
      .map((item, i) =>
        i % 2
          ? item
          : {
              ...data[i / 2],
              pie: pies[i / 2],
              value: data[i / 2].value || 0 /** value null 重置为0 */,
            },
      );
  } else {
    return data?.map((item, i) => ({ ...item, pie: pies[i] }));
  }
};

// const c = [
//   '#33CCCC',
//   '#5B8FF9',
//   '#5D7092',
//   '#F6BD16',
//   '#E8684A',
//   '#6DC8EC',
//   '#2BA880',
//   '#2592CB',
//   '#A920EC',
//   '#F28A1B',
//   '#EC4521',
//   '#D60C78',
//   '#A8E563',
//   '#52E5A0',
//   '#D461E1',
// ];
export class ChartConfig {
  // constructor() {}

  static get CHART_CONST() {
    return {
      themeColor: theme.vars.themeColor,
      themeColor1: theme.vars.themeColor1,
      themeOpacityBgColor: theme.vars.themeColorA15,
      themeOpacityColor: theme.vars.themeColorA50,
      bgColor: theme.vars.themeBgColor1,
      fontSize: +theme.vars.fontSize + 6,
      fontSizeMiddle: +theme.vars.fontSize + 4,
      fontSizeSmall: +theme.vars.fontSize,
      fontSizeXS: +theme.vars.fontSize - 2,
      fontSizeLarge: +theme.vars.fontSize + 10,
      color: theme.vars.textColor,
      secondColor: theme.vars.textColorA85,
      fontFamily: 'DIN-Regular',
      upColor: theme.vars.upColor,
      downColor: theme.vars.downColor,
      axisSplitColor: theme.vars.textColorA20,
      axisLabelColor: theme.vars.textColorA45,
      legendTextColor: theme.vars.textColorA80,
    };
  }
  static get loadingOption() {
    const CHART_CONST = ChartConfig.CHART_CONST;
    return {
      text: '',
      color: CHART_CONST.axisLabelColor,
      textColor: CHART_CONST.color,
      maskColor: 'transparent',
    };
  }
  static get rich() {
    const CHART_CONST = ChartConfig.CHART_CONST;
    return {
      text: {
        color: CHART_CONST.color,
        textShadowBlur: 0,
        fontWeight: 600,
        fontSize: CHART_CONST.fontSizeSmall,
      },
      value: {
        textShadowColor: CHART_CONST.themeColor,
        textShadowBlur: 4,
        color: CHART_CONST.themeColor,
        fontWeight: 700,
        fontFamily: CHART_CONST.fontFamily,
        fontSize: CHART_CONST.fontSize,
      },
      up: {
        fontFamily: 'sans-serif',
        color: CHART_CONST.upColor,
        fontSize: CHART_CONST.fontSizeSmall,
        fontWeight: 500,
        width: 16,
        verticalAlign: 'bottom',
        backgroundColor: {
          image: require('./assets/up.png'),
        },
      },
      down: {
        fontFamily: 'sans-serif',
        color: CHART_CONST.downColor,
        fontSize: CHART_CONST.fontSizeSmall,
        fontWeight: 500,
        width: 16,
        verticalAlign: 'bottom',
        backgroundColor: {
          image: require('./assets/down.png'),
        },
      },
    };
  }
  static get AxisOption() {
    const CHART_CONST = ChartConfig.CHART_CONST;
    return {
      textStyle: { color: CHART_CONST.axisLabelColor, fontSize: CHART_CONST.fontSizeSmall },
      tooltip: { trigger: 'axis', textStyle: { fontSize: CHART_CONST.fontSizeSmall } },
      grid: { top: 40, bottom: 40 },
      legend: {
        show: true,
        right: 0,
        top: 6,
        itemWidth: 14,
        itemHeight: 10,
        textStyle: { color: CHART_CONST.legendTextColor, fontSize: CHART_CONST.fontSizeXS },
      },
      xAxis: {
        type: 'category',
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: { fontSize: CHART_CONST.fontSizeXS },
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: CHART_CONST.color, opacity: 0.2, width: 0.5 } },
        axisLabel: { fontSize: CHART_CONST.fontSizeXS },
        axisTick: { show: false },
        axisLine: { show: false },
      },
    };
  }
  static get DefaultLineOptions() {
    return merge(
      {
        legend: { icon: `path://${ChartIconMap.line}` },
        color: ChartConfig.BAR_COLORS?.map(i =>
          Array.isArray(i) ? getLinearGradient(i, { x: 0, y: 0, x2: 0, y2: 1 }) : i,
        ),
        //  默认样式特殊合并
        series: { type: 'line' },
      },
      ChartConfig.AxisOption,
    );
  }
  static get DefaultBarOptions() {
    return merge(
      {
        tooltip: { axisPointer: { type: 'shadow' } },
        color: ChartConfig.BAR_COLORS?.map(i =>
          Array.isArray(i) ? getLinearGradient(i, { x: 0, y: 0, x2: 0, y2: 1 }) : i,
        ),
        series: {
          type: 'bar',
          barCategoryGap: '60%',
          itemStyle: { barBorderRadius: 10 },
        },
      },
      ChartConfig.AxisOption,
    );
  }
  static get DefaultPieOptions() {
    const CHART_CONST = ChartConfig.CHART_CONST;
    return {
      color: ChartConfig.PIE_COLORS.map(i => getLinearGradient(Array.isArray(i) ? i : [i])),
      textStyle: {
        color: CHART_CONST.color,
        fontSize: CHART_CONST.fontSize,
        fontFamily: CHART_CONST.fontFamily,
      },
      tooltip: { show: false },
      title: {
        textStyle: {
          fontWeight: 400,
          fontSize: CHART_CONST.fontSize,
          color: CHART_CONST.color,
          rich: merge(ChartConfig.rich, {
            text: { fontWeight: 400 },
            value: { fontSize: CHART_CONST.fontSizeLarge + 8, textShadowBlur: 0 },
          }),
        },
        top: 'middle',
        left: '56%',
      },
      legend: {
        orient: 'vertical',
        id: 'pie',
        padding: [30, 5],
        pageTextStyle: { color: CHART_CONST.secondColor },
        pageFormatter: '',
        pageIcons: { vertical: pageIconsVertical },
        pageIconColor: CHART_CONST.themeOpacityColor,
        left: '50%',
        top: 'center',
        icon: 'circle',
        itemWidth: 8,
        itemGap: CHART_CONST.fontSize,
        selectedMode: false,
        textStyle: {
          color: CHART_CONST.color,
          fontSize: CHART_CONST.fontSizeSmall,
          rich: merge(ChartConfig.rich, {
            text: {
              width: CHART_CONST.fontSizeSmall * 11,
              color: CHART_CONST.secondColor,
              fontSize: CHART_CONST.fontSizeSmall,
            },
            value: {
              width: CHART_CONST.fontSizeSmall * 4,
              fontSize: CHART_CONST.fontSizeSmall,
              align: 'right',
            },
          }),
        },
      },
    };
  }
  static get DefaultProgressOptions() {
    const CHART_CONST = ChartConfig.CHART_CONST;
    return {
      textStyle: {
        color: CHART_CONST.color,
        fontSize: CHART_CONST.fontSize,
        fontFamily: CHART_CONST.fontFamily,
      },
      tooltip: { show: false },
      title: {
        textStyle: {
          fontWeight: 400,
          fontSize: CHART_CONST.fontSize,
          color: CHART_CONST.color,
          rich: ChartConfig.rich,
        },
        top: 'middle',
        left: '56%',
      },
      series: { type: 'pie', labelLine: { show: false } },
    };
  }
  static get PIE_COLORS() {
    const CHART_CONST = ChartConfig.CHART_CONST;
    return getRotateColors(CHART_CONST.themeColor);
    // return [
    //   CHART_CONST.themeColor,
    //   ['#FA4929', '#DD6C29'],
    //   '#52C41A',
    //   '#D0021B',
    //   '#A920EC',
    //   '#F28A1B',
    //   '#EC4521',
    //   '#D60C78',
    //   '#A8E563',
    //   '#52E5A0',
    //   '#D461E1',
    // ];
  }
  static get BAR_COLORS() {
    const CHART_CONST = ChartConfig.CHART_CONST;
    return getRotateColors(CHART_CONST.themeColor, -134, -25);
    // const CHART_CONST = ChartConfig.CHART_CONST;
    // return [
    //   [CHART_CONST.themeColor, CHART_CONST.themeColor1],
    //   ['#FAD961', '#F76B1C'],
    //   // ['#FA4929', '#DD6C29'],
    //   '#52C41A',
    //   '#D0021B',
    //   '#A920EC',
    //   '#F28A1B',
    //   '#EC4521',
    //   '#D60C78',
    //   '#A8E563',
    //   '#52E5A0',
    //   '#D461E1',
    // ];
  }

  static chartOptionMergeDefault = (chart: 'line' | 'bar' | 'pie' | 'progress', source) => {
    switch (chart) {
      case 'line':
        return optionsMergeWith({ ...ChartConfig.DefaultLineOptions }, source);
      case 'bar':
        return optionsMergeWith({ ...ChartConfig.DefaultBarOptions }, source);
      case 'progress':
        return optionsMergeWith({ ...ChartConfig.DefaultProgressOptions }, source);
      case 'pie':
        return optionsMergeWith({ ...ChartConfig.DefaultPieOptions }, source);
      default:
        return source;
    }
  };

  static get hightLightTextStyle() {
    const CHART_CONST = ChartConfig.CHART_CONST;
    return {
      rich: {
        text: {
          color: CHART_CONST.themeColor,
          textShadowColor: CHART_CONST.themeColor,
          textShadowBlur: 6,
          fontWeight: 600,
        },
        value: {
          color: CHART_CONST.themeColor,
          textShadowBlur: 6,
        },
      },
    };
  }
  static onHighlightLegendChange({
    index,
    instance,
    hightLightTextStyle = ChartConfig.hightLightTextStyle,
  }) {
    const options = instance?.getOption?.();
    if (!options) return;
    // 更改当前高亮legend样式
    options.legend = options.legend?.map?.(i => ({
      ...i,
      data: i?.data?.map?.((k, j) => ({
        ...k,
        textStyle: index === j ? hightLightTextStyle : {},
      })),
    }));
    instance?.setOption?.(options);
  }
}

export default ChartConfig;
