import React, { ReactNode } from 'react'
import { Descriptions } from 'antd'
import { DescriptionsProps, DescriptionsItemProps } from 'antd/lib/descriptions'
export interface PageItemProps extends Omit<DescriptionsItemProps, 'children'> {
  key: string
  render?: (value: any, data: object) => ReactNode
}
export interface BasePageProps extends DescriptionsProps {
  itemInfo?: { [key: string]: any }
  items?: PageItemProps[]
}

const { Item } = Descriptions

export default ({ items = [], itemInfo: data = {}, ...props }: BasePageProps) => {
  const content = items.map(item => {
    let { key, label, render, ...props } = item
    return (
      <Item key={key} label={label} {...props}>
        {render ? render(data[key], data) : data[key]}
      </Item>
    )
  })

  return (
    <Descriptions layout="vertical" {...props}>
      {content}
    </Descriptions>
  )
}
