import React from 'react'
import Form from '@/components/comm/Form'
import style from './index.less'

export default function Setting({ data, onChange, items, ...options }) {
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
