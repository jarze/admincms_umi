import React, { useState, Fragment } from 'react'
import { Modal, Form } from 'antd'
import { BaseFormProps, BaseFormItemProps, CForm, validateMessages } from '../Form'
import { BaseModalProps } from '../Modal'
import { WrappedFormUtils } from 'antd/es/form/Form'
export interface BaseModalFormProps extends Omit<BaseModalProps, 'onCancel'> {
  form?: WrappedFormUtils
  items: BaseFormItemProps[]
  /** 表单值 */
  data?: { [k: string]: any }
  formProps?: BaseFormProps
  /** 弹窗消失是否重置表单 */
  cancelReset?: boolean
  /** 确定提交表单重置 */
  onOk?: (value: object, callback: any, form?: WrappedFormUtils) => void
  /** 确定提交表单重置 */
  onCancel?: (e: React.MouseEvent<HTMLElement>, callback: any, form?: WrappedFormUtils) => void
  onValuesChange?: (changedValues: any, allValues: any) => void
}
/** 默认表单样式， 可被formProps覆盖 */
export const defaultFormProps: BaseFormProps = {
  layout: 'horizontal',
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
  col: 24
}

export const ModalForm = ({ items, children, onOk, onCancel, data, form, formProps, cancelReset = true, content, ...props }: BaseModalFormProps) => {
  /** 有children时可以通过children点击自我控制visible显示 */
  const [visible, setVisible] = useState(false)

  const onOkCallBack = (e: any) => {
    if (e) e.stopPropagation()
    form!.validateFields((err, values) => {
      if (!err) {
        onOk && onOk(values, handleVisible, form)
      }
    })
  }

  const handleVisible = (vs?: boolean) => {
    setVisible(!!vs)
    vs && cancelReset && form!.resetFields()
  }

  const fmProps: BaseFormProps = {
    data,
    ...defaultFormProps,
    ...formProps,
    items
  }

  return (
    <Fragment>
      {children && <span onClick={() => handleVisible(true)}>{children}</span>}
      <Modal
        visible={visible}
        maskClosable={false}
        onOk={onOkCallBack}
        onCancel={e => {
          if (onCancel) {
            onCancel(e, handleVisible, form)
          } else {
            handleVisible(false)
          }
        }}
        {...props}
      >
        {content || <CForm form={form} {...fmProps} />}
      </Modal>
    </Fragment>
  )
}

export default Form.create({
  onValuesChange: ({ onValuesChange }: any, changedValues, allValues) => {
    onValuesChange && onValuesChange(changedValues, allValues)
  },
  validateMessages
})(ModalForm)
