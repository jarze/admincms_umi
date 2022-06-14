import { useState, useMemo, useEffect } from 'react'
import { BaseHandlerModalFormProps } from '@/components/HandlerModalForm'
import { StepModalProps } from './index'

interface useStateProps {
  (props: StepModalProps): [BaseHandlerModalFormProps]
}

// 步骤表单值构造整理设置
export const useStep: useStateProps = ({
  data: info,
  steps,
  initialStep = 0,
  cancelCache = false,
  afterClose,
  ...restProps
}) => {
  const [data, setData] = useState(info || {})
  const [step, setStep] = useState(initialStep)
  // 保存所有步骤表单值
  const [formData, setFormData] = useState({})

  // 重置步骤
  const resetData = () => {
    setStep(initialStep)
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
    console.debug('toNext step:', step, values)
    return { ...data, ...values }
  }

  // 返回上一步
  const toPrev = (values = {}) => {
    setStep(preStep => preStep - 1)
    console.debug(step, values, cancelCache)
    if (!cancelCache) return
    // 上一步缓存当前步骤表单
    console.debug('toPrev step:', step, values)
    setData({ ...data, ...values })
  }

  const toStep = (toStep = 0, values = {}) => {
    setStep(toStep)
    setData({ ...data, ...values })
    if (toStep > step) {
      setFormData({ ...formData, ...values })
    }
  }

  // 当前步骤获取内容定义
  const { onOkHandler, onOk, ...contentConfig } = useMemo<BaseHandlerModalFormProps>(
    () => steps?.[step]?.content({ data, setData, step, toNext, toPrev, setStep, toStep }),
    [steps, step, data]
  )
  const title = useMemo(() => (steps || [])?.[step]?.title, [step, steps])

  const props: BaseHandlerModalFormProps = {
    ...restProps,
    title,
    destroyOnClose: true,
    afterClose: () => {
      afterClose && afterClose()
      resetData()
    },
    data,
    // 将所有步骤表单值返回
    onOkHandler: onOkHandler && (res => onOkHandler({ ...formData, ...(res || {}) })),
    okText: step < steps.length - 1 ? '下一步' : '提交',
    cancelText: step > 0 ? '上一步' : '取消',
    onOk: onOk
      ? (res, cb, form) => {
          onOk(
            res,
            values =>
              toNext(
                { ...(values || {}), ...(onOkHandler ? form.getFieldsValue() : res || {}) },
                cb,
                form
              ),
            form
          )
        }
      : toNext,
    onCancel: (e, cb, form) => {
      if (e.currentTarget.className === 'ant-modal-close' || step === 0) {
        cb()
        restProps.onCancel && restProps.onCancel(e, cb, form)
        return
      }
      toPrev(form.getFieldsValue())
    },
    ...contentConfig
  }
  return [props]
}
