import React, { useState, useRef, useCallback } from 'react';
import { Input, Form } from 'antd';
import styles from './index.less';
import { get, set } from 'lodash';
import { EditColumnProps } from '../../type';

interface HoverInputProps<T> extends EditColumnProps<T> {
  form?: any;
  placeholder?: string;
  record?: T;
  /** 行号 */
  index?: number;
  split?: string;
  rowKey?: string;
  handleSave?: (record: T, index: number, dataIndex: string) => void;
  /** 编辑组件 */
  EditComponent?: any;
  /** 自定义编辑渲染 */
  editRender?: (text: any, record: T, index: number, params?: any) => React.ReactNode;
}

export default ({
  form,
  dataIndex,
  children,
  record,
  index,
  // 非表单项
  disableEdit,
  className,
  options,
  optionsFun,
  editRender,
  EditComponent = Input,
  split,
  rowKey,
  handleSave,
  placeholder,
  title,
  render,
  ...restProps
}: HoverInputProps<any>) => {
  const inputRef = useRef<any>();

  const [editing, setEditing] = useState(false);

  const toggleEdit = useCallback(
    edit => {
      setEditing(edit);
      if (edit) {
        setTimeout(() => {
          inputRef?.current?.focus?.();
        }, 0);
      }
    },
    [inputRef],
  );

  const key = `${dataIndex}${split}${record?.[rowKey]}`;
  const value = get(record, dataIndex);

  const save = e => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    form.validateFields([key], (error, values) => {
      if (error) return;
      toggleEdit(false);
      const newValue = get(values, key);
      if (newValue === value) return;
      set(record, dataIndex, newValue);
      handleSave?.({ ...record }, index, dataIndex);
    });
  };

  const params = {
    key,
    ref: inputRef,
    onPressEnter: save,
    onBlur: save,
    placeholder: placeholder ?? '请输入',
  };
  return (
    <td className={className} {...restProps}>
      {disableEdit ? (
        children
      ) : editing && dataIndex ? (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator(key, {
            initialValue: value,
            validateFirst: true,
            validateTrigger: ['onBlur', 'onPressEnter'],
            ...options,
            ...((optionsFun && optionsFun(record)) || {}),
          })(editRender ? editRender(value, record, index, params) : <EditComponent {...params} />)}
          {/* })(<Input ref={inputRef} onPressEnter={save} onBlur={save} />)} */}
        </Form.Item>
      ) : (
        <div
          onClick={() => toggleEdit(true)}
          className={styles.text}
          tabIndex={0}
          onFocus={() => toggleEdit(true)}
        >
          {children || '--'}
        </div>
      )}
    </td>
  );
};
