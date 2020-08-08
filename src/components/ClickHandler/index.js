import { useEffect, useState, cloneElement } from 'react';
import { Popconfirm } from 'antd';

export default ({
  handler,
  params,
  onComplete,
  children,
  handlerKey = 'onClick',
  isConfirm,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(true);
  useEffect(() => () => setMounted(false), []);

  const onClick = () => {
    if (!handler) return;
    setLoading(true);
    handler(params)
      .then(res => {
        onComplete && onComplete(res);
      })
      .finally(() => {
        mounted && setLoading(false);
      });
  };

  return isConfirm ? (
    <Popconfirm {...props} onConfirm={onClick}>
      {cloneElement(children, { loading })}
    </Popconfirm>
  ) : (
    cloneElement(children, { [handlerKey]: onClick, loading })
  );
};
