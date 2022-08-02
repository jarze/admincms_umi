import React, { Fragment, useEffect, useMemo, ReactNode } from 'react'
import { Form, Input, Button, Divider, Row, Col } from 'antd'
import classnames from 'classnames'
import { FormProps, FormItemProps } from 'antd/es/form'
import { GetFieldDecoratorOptions, WrappedFormUtils, FormComponentProps } from 'antd/es/form/Form'
import { ColProps } from 'antd/es/col'
import styles from './index.less'

const FormItem = Form.Item

const getColWap = (type: ColType, col?: number, submitCol?: number) => {
  switch (type) {
    case 'col': {
      return getColWrapper(col, submitCol)
    }
    default: {
      return [Fragment, Fragment, Fragment]
    }
  }
}

const DefaultCols: ColProps = { xxl: 6, lg: 8, md: 12, xs: 24 }

/** 计算Col换行 */
const getColWrapper = (col?: number, submitCol?: number) => {
  const submitCols = submitCol ? { span: submitCol } : DefaultCols
  const defaultCol = col ? { span: col } : { ...DefaultCols }
  const FormContentWap = (props: any) => <Row gutter={16} {...props} />
  const FormItemWap = ({ cols, ...props }) => <Col {...(cols || defaultCol)} {...props} />
  const ForSubmitItemWap = (props: any) => <Col {...submitCols} {...props} />
  return [FormContentWap, FormItemWap, ForSubmitItemWap]
}

/** 布局类型 */
export type ColType = 'col'

export const validateMessages = {
  required: () => '请输入',
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
  /* 表单提交部分 */
  submitWrapperProps?: Record<string, any>
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
  type,
  col,
  submitCol,
  onValuesChange,
  className,
  submitWrapperProps,
  ...formProps
}: BaseFormProps) => {
  useEffect(() => {
    if (data) form!.resetFields()
  }, [data])
  const [FormContentWap, FormItemWap, ForSubmitItemWap] = useMemo(
    () => getColWap(type, col, submitCol),
    [type]
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
      return (
        <FormItemWap key={key || index} {...(type == 'col' ? { cols } : {})}>
          {key ? (
            <FormItem label={label} key={key} {...itemProps}>
              {form!.getFieldDecorator(key, {
                initialValue: data && data[key] !== undefined ? data[key] : defaultValue,
                validateFirst: true,
                ...options,
                ...(optionsFun && optionsFun(form, data))
              })(
                render ? (
                  render(form, data)
                ) : (
                  <Input
                    type="text"
                    disabled={disabled}
                    placeholder={placeholder || `请输入${label || ''}`}
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
    <ForSubmitItemWap {...(type === 'col' ? submitWrapperProps : {})}>
      <FormItem {...(type !== 'col' ? submitWrapperProps : {})}>
        {onSubmit && (
          <Button type="primary" htmlType="submit" loading={loading}>
            {okText}
          </Button>
        )}
        {onReset && (
          <>
            {onSubmit && <Divider type="vertical" />}
            <Button htmlType="reset">{cancelText}</Button>
          </>
        )}
      </FormItem>
    </ForSubmitItemWap>
  )

  if (items.length === 0) return <Fragment />

  return (
    <Form
      className={classnames({ [styles['form']]: type === 'col' }, className)}
      onSubmit={handleSubmit}
      onReset={handleClear}
      {...formProps}
    >
      <FormContentWap>
        {formContent}
        {formSubmit}
      </FormContentWap>
    </Form>
  )
}

export default Form.create<BaseFormProps & FormComponentProps>({
  onValuesChange: ({ onValuesChange }: any, changedValues, allValues) => {
    onValuesChange && onValuesChange(changedValues, allValues)
  },
  validateMessages
})(CForm)
