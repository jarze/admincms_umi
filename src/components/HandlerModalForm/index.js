import { ModalForm } from '../comm'
import { useState } from 'react'

export default ({ children, onOkHandler, onOk, ...props }) => {
  const [modalLoading, setModalLoading] = useState(false)
  const modalProps = {
    onOk: (values, cb, form) => {
      if (onOkHandler) {
        setModalLoading(true)
        onOkHandler(values)
          .then(res => {
            if (res && res.code === 1001) {
              if (onOk) {
                onOk(res, cb, form)
              } else {
                cb()
              }
            }
          })
          .finally(() => setModalLoading(false))
      } else {
        onOk && onOk(values, cb, form)
      }
    },
    ...props,
    confirmLoading: modalLoading,
  }
  return <ModalForm {...modalProps}>{children}</ModalForm>
}
