import React, { useState, Fragment, ReactChild } from 'react'
import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
export interface BaseModalProps extends ModalProps {
  children?: ReactChild
  content?: ReactChild
  onOk?: (callback: any, ...others: any[]) => void
  onCancel?: VoidFunction
}

export default ({ children, content, onOk, onCancel, ...props }: BaseModalProps) => {
  const [visible, setVisible] = useState(false)

  const onOkCallBack = (e: any) => {
    if (e) e.stopPropagation()
    onOk && onOk(() => setVisible(false))
  }

  const handleVisible = (vs?: boolean) => {
    setVisible(!!vs)
    onCancel && onCancel()
  }

  return (
    <Fragment>
      {children && <span onClick={() => setVisible(!visible)}>{children}</span>}
      <Modal visible={visible} destroyOnClose={true} maskClosable={false} onOk={onOkCallBack} onCancel={() => handleVisible(false)} {...props}>
        {content}
      </Modal>
    </Fragment>
  )
}
