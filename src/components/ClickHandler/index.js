import { useEffect, useState, cloneElement, useRef } from 'react'
import { Popconfirm } from 'antd'

export default ({ handler, params, onComplete, children, handlerKey = 'onClick', isConfirm, ...props }) => {
  const [loading, setLoading] = useState(false)
  const mounted = useRef(true)
  useEffect(() => () => (mounted.current = false), [])

  const onClick = () => {
    if (!handler) return
    setLoading({ delay: 200 })
    handler(params)
      .then(res => {
        onComplete && onComplete(res)
      })
      .finally(() => {
        mounted.current && setLoading(false)
      })
  }

  return isConfirm ? (
    <Popconfirm {...props} onConfirm={onClick}>
      {cloneElement(children, { loading })}
    </Popconfirm>
  ) : (
    cloneElement(children, { [handlerKey]: onClick, loading })
  )
}
