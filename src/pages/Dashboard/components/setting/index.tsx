import React from 'react'
import Form, { BaseFormProps } from '@/components/comm/Form'
import style from './index.less'

interface SettingProps extends BaseFormProps {
  onChange?: (allValue: any, changeValue?: any) => void
}

export default function Setting({ data, onChange, items, ...options }: SettingProps) {
  /** TODO: 拓展层级多配置 */
  return (
    <div className={style.wrapper}>
      <Form
        // layout="vertical"
        colon={false}
        labelAlign="left"
        type="col"
        col={24}
        data={data}
        items={items}
        onValuesChange={(changeValue, allValues) => onChange?.(allValues, changeValue)}
        {...options}
      />
    </div>
  )
}
