import React, { useState } from 'react'
import { Row, Col, Switch, Table } from 'antd'
import { mock } from 'mockjs'
import Item from './components/Item'
import { ScreenComponentsTypes } from './_config'
import Wrapper from './components/Wrapper'

export const MockData = mock({
  [`data|${ScreenComponentsTypes.length + 1}`]: [
    {
      'type|+1': [...ScreenComponentsTypes.map(i => i.value), null],
      'setting|+1': [
        null,
        null,
        null,
        // { name: '示例Name' },
        null,
        { content: '<h2>示例内容</h2>' },
        null
      ],
      // sourceId: '@string',
      'sourceId|+1': [null],
      'title|+1': [...ScreenComponentsTypes.map(i => i.value), null]
      // 'background|1': [
      //   'bg1-none',
      //   'bg1-topLeft',
      //   'bg1-bottomLeft',
      //   'bg1-topRight',
      //   'bg1-bottomRight',
      // ],
    }
  ]
}).data

let theme = mock({
  fontSize: 14,
  // '@integer(10, 25)',
  // 'themeColor|1': ['#21E897', '#24FCFF', '@color'],
  // 'bgColor|1': ['#060e16', 'aliceblue', 'cadetblue', 'darkgrey'],
  // themeColor: '@color',
  upColor: '@color',
  downColor: '@color'
})

export default function Demo() {
  const [editable, setEditable] = useState(true)

  const [themeData, setThemeData] = useState(theme)

  return (
    <>
      <div
        style={{ position: 'absolute', right: 0, width: 400, height: '100%', overflow: 'scroll' }}
      >
        <Switch
          checkedChildren="编辑模式"
          unCheckedChildren="预览模式"
          checked={editable}
          onChange={c => setEditable(c)}
        />
        <Table
          dataSource={ScreenComponentsTypes}
          pagination={false}
          rowKey={'value'}
          columns={[
            { dataIndex: 'label', title: '组件' },
            { dataIndex: 'value', title: 'Key' }
          ]}
        />
      </div>
      <div
        style={{
          margin: 10,
          width: 'calc(100% - 450px)',
          height: '100%',
          position: 'relative'
        }}
      >
        <Wrapper
          theme={themeData}
          editable={editable}
          onChangeTheme={v => {
            // console.log('theme配置变更:v')
            setThemeData(v)
          }}
        >
          <Row gutter={20} style={{ padding: 20, width: 1920, minHeight: '100%' }}>
            {MockData.map((item, i) => (
              <Col key={String(i)} span={6}>
                <div style={{ height: 400, position: 'relative', marginBottom: 20 }}>
                  <Item
                    editable={editable}
                    item={item}
                    onChange={set => {
                      // console.log('配置更改:', set)
                    }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Wrapper>
      </div>
    </>
  )
}
