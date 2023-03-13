import React from 'react';
import { Switch, InputNumber } from 'antd';
import SearchBar from '../components/Items/Bar';
import { mock } from 'mockjs';
import { fetchComponentData } from '../service';
import { SCREEN_COMPONENT_ITEM_SETTING } from '../type';
import { gridItem } from './_line';

export const fetchData = (component, id) => {
  if (!component) return Promise.resolve(null);
  if (!id) {
    //未绑定数据源的时候示例数据
    return Promise.resolve(
      mock({
        [`data|1-5`]: [
          {
            name: '示例-@increment(1)',
            key: '@id',
            total: '@integer(0,1000)',
            unit: '单位@string(1)',
            data: {
              xAxis: {
                'data|10': ['x@cword(2,5)'],
              },
              'data|1-3': [
                {
                  name: '示例@increment(1)',
                  'data|10': ['@integer(0,1000000)'],
                },
              ],
            },
          },
        ],
      }).data,
    );
  } else {
    return fetchComponentData({ component, id });
  }
};

export const config: SCREEN_COMPONENT_ITEM_SETTING<'BAR_CHART'> = {
  Component: SearchBar,
  fetch: fetchData,
  items: [
    {
      label: '是否堆叠',
      key: 'stack',
      options: { valuePropName: 'checked' },
      render: (form, data) => <Switch />,
    },
    {
      label: '显示总计',
      key: 'total',
      options: { valuePropName: 'checked' },
      render: (form, data) => <Switch />,
    },
    gridItem,
    {
      label: '刷新时间(ms)',
      key: 'interval',
      render: () => <InputNumber />,
    },
  ],
};
