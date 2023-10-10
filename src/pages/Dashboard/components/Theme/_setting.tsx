import React from 'react'
import { Input, InputNumber } from 'antd'

export const config = {
  items: [
    {
      label: '字体',
      key: 'fontSize',
      render: () => <InputNumber />
    },
    {
      label: '主题色',
      key: 'themeColor',
      render: () => <Input type="color" />
    },
    {
      label: '背景色',
      key: 'bgColor',
      render: () => <Input type="color" />
    }
  ]
}
