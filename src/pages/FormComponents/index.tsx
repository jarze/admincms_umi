import React from 'react'
import { Card } from 'antd'
import Form, { BaseFormProps } from '@/components/comm/Form'
import FocusEdit from '@/components/comm/EditTable/FocusEdit'

const db_table_config = {
  columns: [
    { dataIndex: 'id', title: '字段类型', disableEdit: true, width: 120 },
    {
      dataIndex: 'rowKey',
      title: <span className="ant-form-item-required">字段名</span>,
      options: {
        rules: [{ required: true }]
      }
    },
    { dataIndex: 'type', title: '字段类型' },
    {
      title: '字段长度',
      children: [
        { title: 'a', dataIndex: 'len' },
        { title: 'b', dataIndex: 'len1' }
      ]
    },
    { dataIndex: 'desc', title: '备注' },
    { dataIndex: 'auth', title: '操作权限' }
  ]
}

const editConfig: BaseFormProps = {
  items: [
    {
      label: 'FocusEditTable(编辑表格)',
      key: 'focusEditTable',
      options: { rules: [{ required: true }, { type: 'array', min: 3 }] },
      render: form => (
        <FocusEdit
          bordered={true}
          ADD_ROW_KEY="VARIABLES"
          form={form}
          columns={db_table_config.columns}
          scroll={{ y: 200 }}
        />
      )
    }
  ]
}
export default () => {
  return (
    <Card>
      <Form type="col" col={24} {...editConfig} />
    </Card>
  )
}
