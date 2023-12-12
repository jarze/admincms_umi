import React, { useMemo, Fragment, useRef, useCallback, useState, useEffect } from 'react'
// import { createPortal } from 'react-dom'
import { Button } from 'antd'
import { ComponentView } from './ComponentView'

import styles from './index.less'

export default ({ components , handleRemove}) => {
  // const first = useRef(second)
  const [widget, setWidget] = useState<any>({})
  const [node, setNode] = useState<any>({ componentName: Fragment })

  const onSelect = useCallback((e, item) => {
    console.log(e, '---', item)
    debugger
    // 点击事件获取组件相对屏幕的位置尺寸 并且跟随滚动
    const { left, top, width, height } = e.target.getBoundingClientRect()

    setWidget({ rect: { left, top, width, height }, item })
    // 创建一个div
  }, [])

  useEffect(() => {
    setNode({
      componentName: Fragment,
      children: components?.map?.((i, index) => ({
        componentName: i.type,
        ...i,
        id: `${i.id}-${index}`,
        props: { onClick: e => onSelect(e, i), readOnly: true }
      }))
    })
    return () => {}
  }, [components])

  const handleCopy = useCallback(() => {
    node.children &&
      node.children.push({ ...widget.item, id: `${widget.item.id}-${node.children.length}` })
    setNode({ ...node })
  }, [node, widget.item])

  // const handleRemove = useCallback(() => {
  //   node.children && (node.children = node.children.filter(i => i.id !== widget.item.id))
  //   setNode({ ...node })
  // }, [node, widget.item])

  console.log(components, node)

  return (
    <>
      <ComponentView node={node} />
      <div id="frame-widget">
        <div className={styles.selectRect} style={{ ...(widget.rect || {}) }}></div>
        {/* <div className={styles.selectRect} style={{ ...(widget.rect || {}) }}></div> */}
        <div className={styles.actionRect}>
          <Button icon="copy" type="primary" size="small" onClick={handleCopy} />
          <Button icon="delete" type="primary" size="small" onClick={handleRemove} />
        </div>
      </div>
    </>
  )
}
