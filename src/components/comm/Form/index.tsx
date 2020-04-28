/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useMemo, ReactNode } from 'react'
import { Form, Input, Button, Divider, Row, Col } from 'antd'
import { FormProps, FormItemProps } from 'antd/lib/form'
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form'
import { ColProps } from 'antd/lib/col'
import styles from './index.less'

const FormItem = Form.Item

// 布局类型
export type ColType = 'follow' | 'col' | 'center'

export interface BaseFormItemProps extends FormItemProps {
  key?: string
  options?: GetFieldDecoratorOptions
  placeholder?: string
  defaultValue?: any
  disabled?: boolean
  cols?: ColProps
  render?: (form?: WrappedFormUtils, data?: { [key: string]: any }) => ReactNode
}

export interface BaseFormProps extends FormProps {
  type?: ColType
  loading?: boolean
  col?: number // 固定排版 24 8,type = 'col'时有效
  submitCol?: number // 提交按钮固定排版, type = 'col'时有效
  okText?: string // 确定按钮
  cancelText?: string // 取消按钮
  data?: { [k: string]: any } // 表单值
  items?: BaseFormItemProps[]
  onValuesChange?: (changedValues: any, allValues: any) => void
  onSubmit?: (values: { [k: string]: any }, ...others: any[]) => void
  onReset?: (...others: any[]) => void
}

export const CForm = ({
  form,
  items = [],
  data,
  onSubmit,
  onReset,
  loading,
  okText = '确定',
  cancelText = '取消',
  type = 'col',
  col,
  submitCol,
  onValuesChange,
  style,
  className,
  ...formProps
}: BaseFormProps) => {
  useEffect(() => {
    if (data) form!.resetFields()
  }, [data])

  const [FormContentWap, FormItemWap, ForSubmitItemWap] = useMemo(() => getColWap(type, items.length, col, submitCol), [items.length, type])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    form!.validateFields((err: Error, values: any) => {
      if (!err) {
        onSubmit && onSubmit(values)
      }
    })
  }

  const handleClear = (e: any) => {
    e.preventDefault()
    form!.resetFields()
    onReset && onReset()
  }

  const formContent = items.map(
    ({ cols, key, label, placeholder, options, render, defaultValue, disabled = false, ...itemProps }: BaseFormItemProps, index) => {
      if (render === null || (render && render(form, data) === null)) return null
      return (
        <FormItemWap key={key || index} {...cols}>
          {key ? (
            <FormItem label={label} key={key} {...itemProps}>
              {form!.getFieldDecorator(key, {
                initialValue: data && data[key] !== undefined ? data[key] : defaultValue,
                ...options,
              })(render ? render(form, data) : <Input type="text" disabled={disabled} placeholder={placeholder || (label ? `输入${label}` : '')} />)}
            </FormItem>
          ) : (
            // 不指定key， 直接渲染render内容
            render && render(form, data)
          )}
        </FormItemWap>
      )
    },
  )

  const formSubmit = (onSubmit || onReset) && (
    <ForSubmitItemWap>
      <FormItem
        style={type === 'center' ? { textAlign: 'center' } : { float: 'right', marginRight: 0 }}
        wrapperCol={type === 'center' ? { offset: (formProps.labelCol || {}).span, ...formProps.wrapperCol } : {}}
      >
        {onSubmit && (
          <Button type="primary" htmlType="submit" loading={loading}>
            {okText}
          </Button>
        )}
        {onReset && (
          <>
            {onSubmit && <Divider type="vertical" />}
            <Button onClick={handleClear}>{cancelText}</Button>
          </>
        )}
      </FormItem>
    </ForSubmitItemWap>
  )

  if (items.length === 0) return <Fragment />

  return (
    <Form
      className={`${styles[type === 'col' ? 'ant-advanced-search-form' : '']} ${className}`}
      layout="inline"
      style={{ overflow: 'hidden', marginBottom: '1em', ...style }}
      onSubmit={handleSubmit}
      {...formProps}
    >
      <FormContentWap>
        {formContent}
        {formSubmit}
      </FormContentWap>
    </Form>
  )
}

export const validateMessages = {
  required: () => '必填',
  string: {
    max: (a: any, b: any) => `不超过${b}个字符`,
  },
}

export default Form.create({
  onValuesChange: ({ onValuesChange }: any, changedValues, allValues) => {
    onValuesChange && onValuesChange(changedValues, allValues)
  },
  validateMessages,
})(CForm)

const DefaultCols: ColProps = { xxl: 6, lg: 8, md: 12, xs: 24 }
/* 获取排列方式 */
const getColsHandle = (count: number) => {
  const cols = DefaultCols
  const handleColumns = (col: number) => {
    let columns = 24 / col
    return (columns - (count % columns)) * col
  }
  const submitCols = {}
  Object.keys(cols).forEach(key => {
    submitCols[key] = handleColumns(cols[key])
  })
  return { cols, submitCols }
}

const getColWap = (type: ColType, count: number, col?: number, submitCol?: number) => {
  switch (type) {
    case 'col': {
      let { cols = { span: 8 }, submitCols = { span: 24 } } = col ? { cols: { span: col }, submitCols: { span: col } } : getColsHandle(count)
      if (submitCol) submitCols = { span: submitCol }
      const FormContentWap = (props: any) => <Row gutter={16} {...props} />
      const FormItemWap = (props: any) => <Col {...cols} {...props} />
      const ForSubmitItemWap = (props: any) => <Col {...submitCols} {...props} />
      return [FormContentWap, FormItemWap, ForSubmitItemWap]
    }
    default: {
      return [Fragment, Fragment, Fragment]
    }
  }
}
