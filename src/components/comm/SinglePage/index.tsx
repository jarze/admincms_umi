import React, { ReactNode } from 'react'
import { Descriptions } from 'antd'
import { DescriptionsProps, DescriptionsItemProps } from 'antd/lib/descriptions'
export interface PageItemProps extends DescriptionsItemProps {
  key: string
  render?: (value: any, item: object, data: object) => ReactNode
}
export interface BasePageProps extends DescriptionsProps {
  itemInfo?: {}
  items?: PageItemProps[]
}

const { Item } = Descriptions

export default ({ items = [], itemInfo: data = {}, ...props }: BasePageProps) => {
  const content = items.map(item => {
    let { key, label, render, ...props } = item
    return (
      <Item key={key} label={label} {...props}>
        {render ? render(data[key], item, data) : data[key]}
      </Item>
    )
  })

  return (
    <Descriptions layout="vertical" {...props}>
      {content}
    </Descriptions>
  )
}
