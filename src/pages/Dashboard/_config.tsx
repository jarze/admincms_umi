import React from 'react';
import { Radio, Icon } from 'antd';
import { SCREEN_COMPONENT_TYPE } from './type';
export { default as ChartConfigMap } from './_Config/index';
export { config as baseConfig } from './_Config/_base';

export const ScreenComponentsTypes: Array<{ label: string; value: SCREEN_COMPONENT_TYPE }> = [
  {
    label: '饼图',
    value: 'PIE_CHART',
  },
  {
    label: '折线图',
    value: 'LINE_CHART',
  },
  {
    label: '柱状图',
    value: 'BAR_CHART',
  },
  // {
  //   label: '进度图',
  //   value: 'PROGRESS_CHART',
  // },
  {
    label: '单数据',
    value: 'SINGLE_DATA',
  },
  {
    label: '排名列表',
    value: 'RANKING_LIST',
  },
  // {
  //   label: '列表',
  //   value: 'SCROLL_LIST',
  // },
  {
    label: '自定义',
    value: 'CUSTOM_HTML',
  },
];

export const BorderTypes = [
  {
    label: '无',
    value: 'none',
  },
  {
    label: '左上',
    value: 'topLeft',
  },
  {
    label: '左下',
    value: 'bottomLeft',
  },
  {
    label: '右上',
    value: 'topRight',
  },
  {
    label: '右下',
    value: 'bottomRight',
  },
];

export const TitlePositionTypes = [
  {
    label: '靠左',
    value: 'left',
  },
  {
    label: '居中',
    value: 'center',
  },
  {
    label: '靠右',
    value: 'right',
  },
];

export const AlignTypes = TitlePositionTypes;

export const TextAlignRadioGroup = (
  <Radio.Group buttonStyle="solid">
    {AlignTypes.map(i => (
      <Radio.Button value={i.value} key={i.value}>
        <Icon type={`align-${i.value}`} />
      </Radio.Button>
    ))}
  </Radio.Group>
);
