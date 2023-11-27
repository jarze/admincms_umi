import React, { memo } from 'react'
import { Checkbox, Input, InputNumber, Radio, Select, Slider } from 'antd'
import Designer from './Designer'

export default memo(({ children }) => {
  return (
    <Designer
      elements={{ Checkbox, Input, InputNumber, Radio, Select, Slider, TextArea: Input.TextArea }}
    >
      {children}
    </Designer>
  )
})
