import React, { useEffect, useState, cloneElement, useRef } from 'react'
import { Popconfirm } from 'antd'
import { PopconfirmProps } from 'antd/es/popconfirm'

interface ClickHandlerProps extends Partial<PopconfirmProps> {
  handler: (any) => Promise<any>
  /** handler请求参数 */
  params?: any
  /** 触发请求 */
  handlerKey?: string
  /** 请求结束 */
  onComplete?: (res?: any) => void
  /** 是否popConfirm */
  isConfirm?: boolean
  children: any
}

export default ({
  handler,
  params,
  onComplete,
  children,
  handlerKey = 'onClick',
  isConfirm,
  ...props
}: ClickHandlerProps) => {
  const [loading, setLoading] = useState(false as any)
  const mounted = useRef(true)
  useEffect(
    () => () => {
      mounted.current = false
    },
    []
  )

  const onClick = () => {
    if (!handler || loading) return
    setLoading({ delay: 200 })
    handler(params)
      .then(res => {
        onComplete && onComplete(res)
      })
      .catch(console.error)
      .finally(() => {
        mounted.current && setLoading(false)
      })
  }

  return isConfirm ? (
    <Popconfirm title="" {...props} onConfirm={onClick}>
      {cloneElement(children, { loading })}
    </Popconfirm>
  ) : (
    cloneElement(children, { [handlerKey]: onClick, loading })
  )
}
