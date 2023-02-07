import { useState, useMemo, useEffect } from 'react'

/* 弹窗表单逻辑 */
function useModalForm<T extends Record<string, any>>({ editConfig, S, rowKey = 'id' }) {
  const [current, setCurrent] = useState<Partial<T>>(null)

  const { title, items, ...edit } = editConfig

  const visible = !!current
  const [formData, setFormData] = useState(current)

  useEffect(() => {
    if (!visible) return
    setFormData(current)
  }, [current, visible])

  const modalFormProps = useMemo(
    () => ({
      visible: visible,
      data: formData,
      title: (formData?.[rowKey] ? '编辑' : '添加') + (title || ''),
      ...edit,
      items: typeof items === 'function' ? items({ formData }) : items,
      onOkHandler: values => S?.editItem(values, formData),
      onCancel: () => setCurrent(null),
      onOk: () => setCurrent(null)
    }),
    [visible, formData]
  )
  return { current, setCurrent, modalFormProps }
}

export default useModalForm
