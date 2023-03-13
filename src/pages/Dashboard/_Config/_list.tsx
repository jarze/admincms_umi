import React from 'react';
import List from '../components/Items/List';
import { Slider, Radio, InputNumber } from 'antd';
import { mock } from 'mockjs';
import { fetchComponentData } from '../service';
import { SCREEN_COMPONENT_ITEM_SETTING } from '../type';

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
            unit: '单位@string(1)',
            data: {
              titles: {
                name: 'Name',
                value: 'Value',
                ranking: '',
              },
              'data|2-10': [
                {
                  name: '示例@increment(1)',
                  value: '@integer(0,1000000)',
                  ranking: '@integer(0, 100)',
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

export const config: SCREEN_COMPONENT_ITEM_SETTING<'SCROLL_LIST'> = {
  Component: List,
  fetch: fetchData,
  items: [
    {
      label: '滚动',
      key: 'animationDuration',
      render: () => <Slider min={100} max={1500} />,
    },
    {
      label: '大小',
      key: 'size',
      render: () => (
        <Radio.Group
          options={[
            { label: '默认', value: '' },
            { label: '大', value: 'l' },
            { label: '小', value: 's' },
          ]}
        />
      ),
    },
    {
      label: '刷新时间(ms)',
      key: 'interval',
      render: () => <InputNumber />,
    },
  ],
};
