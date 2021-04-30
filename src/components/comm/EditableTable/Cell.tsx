import { Input, Form } from 'antd'
import React from 'react'
import { BaseEditColumnProps } from './index'
const FormItem = Form.Item

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
}: BaseEditColumnProps<any>) => {
  const key = record && record[rowKey]
  const value = record && record[dataIndex]
  return (
    <td {...restProps}>
      {!record || disableEdit ? (
        children
      ) : dataIndex ? (
        <FormItem>
          {form.getFieldDecorator(`${dataIndex}${split}${key}`, {
            initialValue: value !== undefined ? value : defaultValue,
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
