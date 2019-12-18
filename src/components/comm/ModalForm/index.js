import { useState, Fragment } from 'react'
import { Modal, Form } from 'antd'
import { CForm, validateMessages } from '@components/comm/Form'

const ModalForm = ({
  items,
  children,
  onOk,
  onCancel,
  data,
  form,
  formProps,
  cancelReset = true,
  ...props
}) => {
  // 有children时可以通过children点击自我控制visible显示
  const [visible, setVisible] = useState(false)

  const onOkCallBack = e => {
    if (e) e.stopPropagation()
    form.validateFields((err, values) => {
      if (!err) {
        onOk && onOk(values, handleVisible)
      }
    })
  }

  const handleVisible = vs => {
    setVisible(vs)
    onCancel && onCancel()
    cancelReset && form.resetFields()
  }

  const fmProps = {
    items,
    layout: 'horizontal',
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    col: 24,
    data: data,
    ...formProps,
  }

  return (
    <Fragment>
      {children && <span onClick={() => handleVisible(true)}>{children}</span>}
      <Modal
        visible={visible}
        maskClosable={false}
        onOk={onOkCallBack}
        onCancel={() => handleVisible(false)}
        {...props}
      >
        <CForm form={form} {...fmProps} />
      </Modal>
    </Fragment>
  )
}

export default Form.create({
  onValuesChange: ({ onValuesChange }, changedValues, allValues) => {
    onValuesChange && onValuesChange(changedValues, allValues)
  },
  validateMessages,
})(ModalForm)
