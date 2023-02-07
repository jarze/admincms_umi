import React, { useRef, useMemo } from 'react'
import { Tooltip } from 'antd'

// 超过一行显示tooltip
const TooltipTd = ({ children, ...props }) => {
  const ref = useRef(null)
  const offset = useMemo(() => {
    if (!ref?.current) return 0
    return +ref?.current?.scrollWidth - +ref?.current?.clientWidth
  }, [ref?.current])
  if (
    offset &&
    (typeof children?.[2] === 'string' || typeof children?.[2]?.props?.children === 'string')
  ) {
    return (
      <Tooltip title={children?.[2]?.props?.children || children}>
        <td ref={ref} {...props}>
          {children}
        </td>
      </Tooltip>
    )
  }

  return (
    <td ref={ref} {...props}>
      {children}
    </td>
  )
}

export default TooltipTd
