import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import styles from './index.less'
import { DRAG_TRANSFER_ELEMENT_ID } from './constants'

export default ({ children, onIn }) => {
  const itemRef = useRef<HTMLDivElement>()
  const [params, setParams] = useState<any>({})

  // useEffect(() => {
  //   if (!itemRef.current) return () => {}
  //   itemRef.current.addEventListener('drop', function(event) {
  //     // 阻止默认动作（如打开一些元素的链接）
  //     event.preventDefault()
  //     console.log(event, '=====333222', event.dataTransfer.getData(DRAG_TRANSFER_ELEMENT_ID))
  //     setParams({ dropping: false })
  //     // 将拖动的元素到所选择的放置目标节点中
  //     // if (event.target.className == 'dropzone') {
  //     //   event.target.style.background = ''
  //     //   dragged.parentNode.removeChild(dragged)
  //     //   event.target.appendChild(dragged)
  //     // }
  //   })
  //   return () => {}
  // }, [])

  return (
    <div
      ref={itemRef}
      onDragOver={event => {
        event.preventDefault()
      }}
      onDragEnter={event => {
        setParams({ dropping: true })
      }}
      onDragLeave={event => {
        setParams({ dropping: false })
      }}
      onDrop={event => {
        // 阻止默认动作（如打开一些元素的链接）
        // console.log(event, '=====333')

        const id = event.dataTransfer.getData(DRAG_TRANSFER_ELEMENT_ID)
        console.log(event, '=====333', id)
        onIn?.(id, DRAG_TRANSFER_ELEMENT_ID)
        setParams({ dropping: false })
        // event.preventDefault()
      }}
      className={classNames(styles.container, { [styles.dropping]: params?.dropping })}
    >
      {children}
    </div>
  )
}
