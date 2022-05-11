import React, { useState } from 'react'
import ModalForm, { BaseModalFormProps } from '../comm/ModalForm'

export interface BaseHandlerModalFormProps extends BaseModalFormProps {
  /** 确定提交表单重置 */
  onOkHandler?: (value?: object) => Promise<any>
}

export default ({ children, onOkHandler, onOk, ...props }: BaseHandlerModalFormProps) => {
  const [modalLoading, setModalLoading] = useState(false)
  const modalProps = {
    onOk: (values, cb, form) => {
      if (onOkHandler) {
        setModalLoading(true)
        onOkHandler(values)
          .then(res => {
            if (onOk) {
              onOk(res, cb, form)
            } else {
              cb()
            }
          })
          .finally(() => setModalLoading(false))
      } else {
        onOk && onOk(values, cb, form)
      }
    },
    ...props,
    confirmLoading: modalLoading
  }
  return <ModalForm {...modalProps}>{children}</ModalForm>
}
