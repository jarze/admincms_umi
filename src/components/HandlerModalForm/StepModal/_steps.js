import { useState, useMemo, useEffect } from 'react'
import { Steps } from 'antd'

const { Step } = Steps

// 步骤表单值构造整理设置
export const useStep = ({ data: info, steps, ...restProps }) => {
  const [data, setData] = useState(info || {})
  const [step, setStep] = useState(0)
  // 保存所有步骤表单值
  const [formData, setFormData] = useState({})

  // 重置步骤
  const resetData = () => {
    setStep(0)
    setData({ ...(info || {}) })
    setFormData({})
  }

  useEffect(() => {
    resetData()
  }, [info])

  // 进入下一步
  const toNext = (values, cb, form) => {
    if (step === steps.length - 1) {
      console.debug('step over')
      cb()
    } else {
      setStep(step + 1)
      setData({ ...data, ...values })
    }
    setFormData({ ...formData, ...values })
    console.debug('step:', step, values)
    return { ...data, ...values }
  }

  // 返回上一步
  const toPrev = () => {
    setStep(step - 1)
    // setData({ ...data });
    // setFormData({ ...formData });
  }

  // 当前步骤获取内容定义
  const { onOkHandler, onOk, ...contentConfig } = useMemo(() => steps[step].content({ data, setData, step, toNext }), [steps, step, data])
  // const title = useMemo(() => (steps || [])[step].title, [step, steps]);

  const title = useMemo(
    () => (
      <div style={{ height: 30 }}>
        <Steps current={step} style={{ width: '95%' }} size="small">
          {steps.map(({ title }, i) => (
            <Step title={title} key={String(i)} />
          ))}
        </Steps>
      </div>
    ),
    [steps, step]
  )

  const props = {
    ...restProps,
    title,
    destroyOnClose: true,
    afterClose: resetData,
    data,
    // 将所有步骤表单值返回
    onOkHandler: onOkHandler && ((res, cb, form) => onOkHandler({ ...formData, ...res }, cb, form)),
    okText: step < steps.length - 1 ? '下一步' : '提交',
    cancelText: step > 0 ? '上一步' : '取消',
    onOk: onOk
      ? (res, cb, form) => {
          onOk(res, () => toNext(onOkHandler ? form.getFieldsValue() : res, cb, form), form)
        }
      : toNext,
    onCancel: (e, cb) => {
      if (e.currentTarget.className === 'ant-modal-close' || step === 0) {
        cb()
        restProps.onCancel && restProps.onCancel()
        return
      }
      toPrev()
    },
    ...contentConfig
  }
  return [props]
}
