import { forwardRef, useState } from 'react'
import { ModalForm } from '@/components/comm'

export default forwardRef(({ value, onChange, formProps, render }, ref) => {
  const [va, setVa] = useState(value || {})
  const handleChange = v => {
    onChange && onChange(v)
    setVa(v)
  }

  const mfProps = {
    data: va,
    onOk: (values, cb) => {
      handleChange(values)
      cb()
    },
    formProps: { col: 12 },
    ...formProps,
  }

  const text = render && render(va)
  return (
    <ModalForm {...mfProps} ref={ref}>
      <div className="ant-input text-one-line" style={{ maxWidth: '100px' }} title={text}>
        {text}
      </div>
    </ModalForm>
  )
})
