import React from 'react'
import { Switch, Slider, Input, AutoComplete, Tooltip, Icon, InputNumber } from 'antd'
import SearchPie from '../components/Items/Pie'
import { mock } from 'mockjs'
import { fetchComponentData } from '../service'
import { SCREEN_COMPONENT_ITEM_SETTING } from '../type'

export const fetchData = (component, id) => {
  if (!component) return Promise.resolve(null)
  if (!id) {
    //未绑定数据源的时候示例数据
    return Promise.resolve(
      mock({
        [`data|1-5`]: [
          {
            name: '示例-@increment(1)',
            key: '@id',
            unit: '@string',
            'data|2-9': [
              {
                name: '示例@increment(1)',
                // value: null,
                // percent: null,
                value: '@integer(10,1000000)',
                percent: '@integer(0, 100)'
              }
            ]
          }
        ]
      }).data
    )
  } else {
    return fetchComponentData({ component, id })
  }
}

export const config: SCREEN_COMPONENT_ITEM_SETTING<'PIE_CHART'> = {
  Component: SearchPie,
  fetch: fetchData,
  items: [
    {
      label: '图例显示',
      key: 'showLegend',
      options: { valuePropName: 'checked' },
      render: (form, data) => <Switch />
    },
    {
      label: '中心文案',
      key: 'title',
      render: () => <Input.TextArea autosize={true} />
    },
    {
      label: '右侧文案',
      key: 'text',
      render: () => <Input.TextArea autosize={true} />
    },
    {
      label: (
        <Tooltip
          title={
            <div>
              <b>series-pie.label.formatter</b>
              <br />
              <br />
              <span style={{ whiteSpace: 'nowrap' }}>
                {'(series-pie.label.rich. <style_name>)'}
              </span>
              富文本样式 : text、value、up、down
            </div>
          }
        >
          标签内容 <Icon type="info-circle" />
        </Tooltip>
      ),
      key: 'formatter',
      render: () => (
        <AutoComplete dataSource={['{text|{b}}\n{value|{c}}']}>
          <Input.TextArea autosize={true} />
        </AutoComplete>
      )
    },
    {
      label: '饼图半径',
      key: 'radius',
      render: () => <Slider />
    },
    {
      label: '圆环半径',
      key: 'radiusOffset',
      render: () => <Slider />
    },
    {
      label: '扇区偏移',
      key: 'centerPieOffset',
      render: () => <Slider />
    },
    // {
    //   label: '动画切换',
    //   key: 'timer',
    //   options: { valuePropName: 'checked' },
    //   render: () => <Switch />,
    // },
    {
      label: '刷新时间(ms)',
      key: 'interval',
      render: () => <InputNumber />
    }
  ]
}
