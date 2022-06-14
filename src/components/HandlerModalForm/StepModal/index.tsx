import React from 'react'
import HandlerModalForm, { BaseHandlerModalFormProps } from '@/components/HandlerModalForm'
import { useStep } from './_steps'

export interface StepModalProps extends BaseHandlerModalFormProps {
  /** 初始步骤 */
  initialStep?: number
  /** 回退步骤是否保存表单内容 */
  cancelCache?: boolean
  /** 步骤表单配置 */
  steps: Array<{
    /** 标题 */
    title: string | React.ReactNode
    /** 表单内容 */
    content: (params: {
      /** 当前步骤 */
      step: number
      /** 下一步 */
      toNext: (values: object, cb?: Function, form?: any) => object
      /** 上一步 */
      toPrev: (values?: object) => void
      /** 设置当前步骤 */
      setStep: ((step: number) => void) | ((set: (pre: number) => number) => void)
      /** 跳转步骤 */
      toStep: (toStep?: number, values?: object) => void
      /** 表单值 */
      data: any
      /** 设置表单值 */
      setData: any
    }) => BaseHandlerModalFormProps
  }>
}

export default ({ data, children, steps, ...restProps }: StepModalProps) => {
  const [props] = useStep({ data, steps, ...restProps })
  return <HandlerModalForm {...props}>{children}</HandlerModalForm>
}
