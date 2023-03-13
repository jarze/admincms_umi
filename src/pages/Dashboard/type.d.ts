import { BaseFormProps } from '@/components/comm/Form';

export type SCREEN_COMPONENT_TYPE =
  | 'PIE_CHART'
  | 'LINE_CHART'
  | 'BAR_CHART'
  | 'PROGRESS_CHART'
  | 'SINGLE_DATA'
  | 'CUSTOM_HTML'
  | 'RANKING_LIST'
  | 'SCROLL_LIST';

export interface SCREEN_COMPONENT_PROPS {
  /** 图表类型 */
  type?: SCREEN_COMPONENT_TYPE;
  /** 图表配置 */
  setting?: any;
  /** 图表title */
  title?: string;
  /** 标题位置
   * @default left
   */
  titlePosition?: 'left' | 'center' | 'right';
  /** 特殊边框的方向
   * @default none
   */
  background?:
    | 'bg0-none'
    | 'bg1-topLeft'
    | 'bg1-topRight'
    | 'bg1-bottomLeft'
    | 'bg1-bottomRight'
    | 'bg1-border'
    | 'bg1-corner'
    | 'bg1-leftTop'
    | 'bg1-rightTop'
    | 'bg1-leftBottom'
    | 'bg1-rightBottom'
    | 'bg2-zhutai';
  /** 数据源id */
  sourceId?: string;
}

type LineBarResponseType = Array<{
  /** tab项 */
  name: string;
  key: string;
  /** 总计 */
  total?: number;
  /** 单位 */
  unit?: string;
  data: {
    /** x轴数据 */
    xAxis: {
      data: Array<string>;
    };
    /** 多线/柱 数据 */
    data: Array<{
      name: string;
      data: Array<number | null>;
    }>;
  };
}>;

type PieResponseType = Array<{
  name: string;
  key: string;
  unit?: string;
  data: Array<{
    name: string;
    value: number;
    /** 0-100 */
    percent?: number;
  }>;
}>;

type SingleDataResponseType = {
  name: string;
  value?: any;
  unit?: string;
};

type ProgressResponseType = Array<{
  name: string;
  key: string;
  unit?: string;
  data: {
    name: string;
    value: number;
    total: number;
    percent: number;
  };
}>;

type ScrollsListResponseType = Array<{
  name: string;
  key: string;
  unit?: string;
  data?: {
    titles: Record<'name' | 'value' | 'ranking', any>;
    data: Array<{
      name: string;
      value: number;
      total: number;
      ranking: number;
    }>;
  };
}>;

export type ResponseOfComponentType<T extends SCREEN_COMPONENT_TYPE> = T extends 'PIE_CHART'
  ? PieResponseType
  : T extends 'LINE_CHART' | 'BAR_CHART'
  ? LineBarResponseType
  : T extends 'SINGLE_DATA'
  ? SingleDataResponseType
  : T extends 'PROGRESS_CHART'
  ? ProgressResponseType
  : T extends 'SCROLL_LIST' | 'RANKING_LIST'
  ? ScrollsListResponseType
  : any;

export interface SCREEN_COMPONENT_ITEM_SETTING<T extends SCREEN_COMPONENT_TYPE> {
  /** 组件 */
  Component: any;
  fetch?: (
    component?: SCREEN_COMPONENT_TYPE,
    id?: string,
  ) => Promise<null | ResponseOfComponentType<T>>;
  /**TODO: 需要调整支持数据结构 */
  items?: BaseFormProps['items'];
  /** 是否需要绑定数据源 默认true */
  bindSource?: boolean;
}
