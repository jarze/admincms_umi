import React from 'react';
import { Switch, Input, AutoComplete } from 'antd';
import Progress from '../components/Items/Progress';
import { fetchComponentData } from '../service';
import { SCREEN_COMPONENT_ITEM_SETTING } from '../type';
import { mock } from 'mockjs';

export const config: SCREEN_COMPONENT_ITEM_SETTING<'PROGRESS_CHART'> = {
  Component: Progress,
  fetch: (component, id) => {
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
                name: '示例占比',
                value: '@integer(10,1000000)',
                total: '@integer(10, 10000)',
                percent: '@integer(0, 100)',
              },
            },
          ],
        }).data,
      );
    } else {
      return fetchComponentData({ component, id });
    }
  },
  items: [
    {
      label: '右侧内容',
      key: 'showLegend',
      options: { valuePropName: 'checked' },
      render: (form, data) => <Switch />,
    },
    {
      label: '中心文案',
      key: 'title',
      render: () => (
        <AutoComplete
          dataSource={['{text|{b}}\n{value|{d}%}', '{text|{b}}\n{value|{c}}\n{value|{d}%}']}
        >
          <Input.TextArea autosize={true} />
        </AutoComplete>
      ),
    },
    {
      label: '动画',
      key: 'tabAutoChange',
      options: { valuePropName: 'checked' },
      render: (form, data) => <Switch />,
    },
    {
      label: '颜色',
      key: 'color',
      render: () => <Input type="color" />,
    },
  ],
};
