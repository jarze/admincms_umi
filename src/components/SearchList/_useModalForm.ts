import { useState, useMemo } from 'react';

/* 弹窗表单逻辑 */
function useModalForm<T extends Record<string, any>>({ editConfig, S, rowKey = 'id' }) {
  const [current, setCurrent] = useState<Partial<T>>(null);

  const { title, items, ...edit } = editConfig;

  const modalFormProps = useMemo(
    () => ({
      visible: !!current,
      data: current,
      title: (current?.[rowKey] ? '编辑' : '添加') + (title || ''),
      ...edit,
      items: typeof items === 'function' ? items({ current }) : items,
      onOkHandler: values => S?.editItem(values, current),
      onCancel: () => setCurrent(null),
      onOk: () => setCurrent(null),
    }),
    [current],
  );
  return { current, setCurrent, modalFormProps };
}

export default useModalForm;
