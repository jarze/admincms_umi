/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useMemo, ReactNode } from 'react'
import { Form, Input, Button, Divider, Row, Col } from 'antd'
import { FormProps, FormItemProps } from 'antd/es/form'
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/es/form/Form'
import { ColProps } from 'antd/es/col'
import styles from './index.less'
import { get } from 'lodash'

const FormItem = Form.Item

/** 布局类型 */
export type ColType = 'follow' | 'col' | 'center'

export const validateMessages = {
  required: () => '必填',
  string: {
    max: (a: any, b: any) => `不超过${b}个字符`
  }
}

export interface BaseFormItemProps extends FormItemProps {
  key?: string
  options?: GetFieldDecoratorOptions
  optionsFun?: (form?: WrappedFormUtils, data?: { [key: string]: any }) => GetFieldDecoratorOptions
  placeholder?: string
  defaultValue?: any
  disabled?: boolean
  cols?: ColProps
  render?: (form?: WrappedFormUtils, data?: { [key: string]: any }) => ReactNode
}

export interface BaseFormProps extends FormProps {
  type?: ColType
  loading?: boolean
  /** 固定排版 24 8,type = 'col'时有效 */
  col?: number
  /** 提交按钮固定排版, type = 'col'时有效 */
  submitCol?: number
  /** 确定按钮 */
  okText?: string
  /** 取消按钮 */
  cancelText?: string
  /** 表单值 */
  data?: { [k: string]: any }
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
  const [FormContentWap, FormItemWap, ForSubmitItemWap] = useMemo(
    () => getColWap(type, items, col, submitCol),
    [items.length, type]
  )

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
    (
      {
        cols,
        key,
        label,
        placeholder,
        options,
        render,
        defaultValue,
        disabled = false,
        optionsFun,
        ...itemProps
      }: BaseFormItemProps,
      index
    ) => {
      if (render === null || (render && render(form, data) === null)) return null
      const value = get(data, key)
      return (
        <FormItemWap key={key || index} index={index} {...cols}>
          {key ? (
            <FormItem label={label} key={key} {...itemProps}>
              {form!.getFieldDecorator(key, {
                initialValue: data && value !== undefined ? value : defaultValue,
                ...options,
                ...(optionsFun && optionsFun(form, data))
              })(
                render ? (
                  render(form, data)
                ) : (
                  <Input
                    type="text"
                    disabled={disabled}
                    placeholder={placeholder || (label ? `输入${label}` : '')}
                  />
                )
              )}
            </FormItem>
          ) : (
            /** 不指定key， 直接渲染render内容 */
            render && render(form, data)
          )}
        </FormItemWap>
      )
    }
  )

  const formSubmit = (onSubmit || onReset) && (
    <ForSubmitItemWap>
      <FormItem
        style={type === 'center' ? { textAlign: 'center' } : { float: 'right', marginRight: 0 }}
        wrapperCol={
          type === 'center'
            ? { offset: (formProps.labelCol || {}).span, ...formProps.wrapperCol }
            : {}
        }
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

export default Form.create({
  onValuesChange: ({ onValuesChange }: any, changedValues, allValues) => {
    onValuesChange && onValuesChange(changedValues, allValues)
  },
  validateMessages
})(CForm)

const getColWap = (type: ColType, items: BaseFormItemProps[], col?: number, submitCol?: number) => {
  switch (type) {
    case 'col': {
      return getColWrapper(items, col, submitCol)
    }
    default: {
      return [Fragment, Fragment, Fragment]
    }
  }
}

const DefaultCols: ColProps = { xxl: 6, lg: 8, md: 12, xs: 24 }

const handleCol = (cols, handleCols = {}) => {
  Object.keys(cols).forEach(key => (handleCols[key] = 24 - (cols[key] % 24)))
  return handleCols
}

/** 计算Col换行 */
const getColWrapper = (items: BaseFormItemProps[], col?: number, submitCol?: number) => {
  const count = items.length
  const submitCols = { span: submitCol }
  const defaultCol = col ? { span: col } : { ...DefaultCols }
  const handlerCols = items.reduce((res, { cols = { ...defaultCol } }, index) => {
    const preCols = res[`${index - 1}`] || {}
    const itemCols = {}
    Object.keys(cols).forEach(key => {
      let sum: number = cols[key] + (preCols[key] || 0)
      /** 换行 */
      itemCols[key] = sum > 24 ? cols[key] : sum
    })
    if (!submitCol && index === count - 1) {
      handleCol(itemCols, submitCols)
    }
    return { ...res, [`${index}`]: itemCols, [`${index}-col`]: cols }
  }, {})
  const FormContentWap = (props: any) => <Row gutter={16} {...props} />
  const FormItemWap = ({ index, ...props }) => <Col {...handlerCols[`${index}-col`]} {...props} />
  const ForSubmitItemWap = (props: any) => <Col {...submitCols} {...props} />
  return [FormContentWap, FormItemWap, ForSubmitItemWap]
}
