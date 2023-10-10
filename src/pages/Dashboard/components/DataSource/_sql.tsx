import React from 'react'
import { Input } from 'antd'
import { BaseFormProps } from '@/components/comm/Form'

export default {
  items: [
    {
      label: '名称',
      key: 'name',
      rules: [{ required: true, whitespace: true }]
    },
    {
      label: '单位',
      key: 'unitName'
    },
    {
      label: 'SQL',
      key: 'sqlString',
      options: {
        rules: [{ required: true, whitespace: true }]
      },
      render: () => (
        <Input.TextArea placeholder="输入查询SQL" autosize={{ minRows: 10, maxRows: 50 }} />
      )
    }
  ]
} as BaseFormProps
