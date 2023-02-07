import { Input, Form } from 'antd'
import React from 'react'
// import { BaseEditColumnProps } from './index'
const FormItem = Form.Item

const columnFormOnCell = (column, params) => (record, index) => ({
  record,
  index,
  ...params,
  ...column
})

// 处理column编辑表格参数
export const handleColumn = (data = [], params) =>
  data.map(({ children, ...col }) =>
    col.disableEdit
      ? { children, ...col, onCell: _ => ({ disableEdit: true }) }
      : {
          onCell: columnFormOnCell(col, params),
          children: children && handleColumn(children, params),
          ...col
        }
  )

const Cell = ({
  children,

  split,
  rowKey,

  record,
  index,
  dataIndex,
  // 非表单项
  disableEdit,
  // 表单项配置
  form,
  editRender,
  options,
  optionsFun,
  defaultValue,

  title,
  ...restProps
}) => {
  const key = `${dataIndex}${split}${record?.[rowKey]}`
  const value = record && record[dataIndex]
  return (
    <td {...restProps}>
      {!record || disableEdit ? (
        children
      ) : dataIndex ? (
        <FormItem>
          {form.getFieldDecorator(key, {
            initialValue: value !== undefined ? value : defaultValue,
            validateFirst: true,
            ...options,
            ...((optionsFun && optionsFun(record)) || {})
          })(editRender ? editRender(value, record, index) : <Input />)}
        </FormItem>
      ) : (
        editRender && editRender(value, record, index)
      )}
    </td>
  )
}

export default Cell
