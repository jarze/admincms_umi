import React, { Fragment } from 'react';
import { Switch, InputNumber, Tooltip, Icon } from 'antd';
import SearchLine from '../components/Items/Line';
import { mock } from 'mockjs';
import { fetchComponentData } from '../service';
import MapInput from '../components/MapInput';
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
            total: '@integer(0,1000)',
            unit: '单位@string(1)',
            data: {
              xAxis: {
                'data|10': ['x@cword(2,5)'],
              },
              'data|1-3': [
                {
                  name: '示例@increment(1)',
                  'data|10': ['@integer(0,100)'],
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

export const gridItem = {
  label: (
    <Fragment>
      <Tooltip
        title={`可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'top', 'middle', 'bottom'`}
      >
        边距 &nbsp;&nbsp;
        <Icon type="info-circle" />
      </Tooltip>
    </Fragment>
  ),
  key: 'grid',
  render: () => (
    <MapInput
      items={[
        {
          key: 'left',
          addonAfter: '左',
          style: { width: '50%' },
        },
        {
          key: 'right',
          addonAfter: '右',
          style: { width: '50%' },
        },
        {
          key: 'top',
          addonAfter: '上',
          style: { width: '50%' },
        },
        {
          key: 'bottom',
          addonAfter: '下',
          style: { width: '50%' },
        },
      ]}
    />
  ),
};

export const config: SCREEN_COMPONENT_ITEM_SETTING<'LINE_CHART'> = {
  Component: SearchLine,
  fetch: fetchData,
  items: [
    {
      label: '平滑曲线',
      key: 'smooth',
      options: { valuePropName: 'checked' },
      render: (form, data) => <Switch />,
    },
    {
      label: '是否堆叠',
      key: 'stack',
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
