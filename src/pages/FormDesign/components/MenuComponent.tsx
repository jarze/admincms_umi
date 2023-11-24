import React from 'react'
import { Drawer, Collapse } from 'antd'
import DragItem from './DragView/DragItem'
const { Panel } = Collapse

export default ({ data, ...props }) => {
  return (
    <>
      <Drawer title={'组件'} mask={false} placement="left" bodyStyle={{ padding: 0 }} {...props}>
        <Collapse bordered={false}>
          {data?.map?.(i => (
            <Panel header={i.name} key={i.name}>
              <div>
                {i.items.map(i => (
                  <DragItem key={i.id} item={i}>
                    {i.title}
                  </DragItem>
                ))}
              </div>
            </Panel>
          ))}
        </Collapse>
      </Drawer>
    </>
  )
}
