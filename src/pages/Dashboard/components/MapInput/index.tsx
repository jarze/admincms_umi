import React, { forwardRef, Fragment } from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/es/input';

interface MapInputProps<T extends Record<string, any>> {
  items: Array<
    {
      key: keyof T;
      render: any;
    } & Partial<InputProps>
  >;
  value?: T;
  onChange?: (value?: T) => void;
}

function MapInput<T extends Record<string, any>>(props: MapInputProps<T>, ref) {
  const { value, onChange, items } = props;
  const handleChange = (key, v) => {
    onChange?.({ ...(value || {}), [key]: v } as T);
  };
  return (
    <Fragment>
      {items.map(({ key, render, ...rest }) => {
        return render ? (
          render?.({})
        ) : (
          <Input value={value?.[key]} onChange={e => handleChange(key, e.target.value)} {...rest} />
        );
      })}
    </Fragment>
  );
}

export default forwardRef<MapInputProps<any>, any>(MapInput);
