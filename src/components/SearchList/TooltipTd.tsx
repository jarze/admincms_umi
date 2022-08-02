import React, { useRef, useMemo } from 'react';
import { Tooltip } from 'antd';

// 超过一行显示tooltip
const TooltipTd = ({ children, ...props }) => {
  const ref = useRef(null);
  const offset = useMemo(() => {
    if (!ref?.current) return 0;
    return +ref?.current?.scrollWidth - +ref?.current?.clientWidth;
  }, [ref?.current]);

  if (!offset || (children?.[2] && typeof children?.[2] === 'object')) {
    return (
      <td ref={ref} {...props}>
        {children}
      </td>
    );
  }
  return (
    <Tooltip title={children}>
      <td ref={ref} {...props}>
        {children}
      </td>
    </Tooltip>
  );
};

export default TooltipTd;
