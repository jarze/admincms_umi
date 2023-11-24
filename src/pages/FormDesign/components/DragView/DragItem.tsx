import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import styles from './index.less'

const DragItem = ({ children, item }) => {
  const itemRef = useRef<HTMLSpanElement>()

  const [params, setParams] = useState<any>({})

  useEffect(() => {
    if (!itemRef.current) return () => {}
    // itemRef.current.addEventListener('drag', function(event) {}, false)
    return () => {}
  }, [])

  return (
    <span
      draggable={true}
      className={classNames(styles.dragItem, { [styles.dragging]: params.dragging })}
      ref={itemRef}
      onDragStart={event => {
        setParams({ dragging: true })
        event.stopPropagation()
        event.dataTransfer.setData('element', JSON.stringify(item))
      }}
      onDragEnd={event => {
        setParams({ dragging: false })
        event.stopPropagation()
      }}
    >
      {children}
    </span>
  )
}

export default DragItem
