import React, { memo } from 'react'
import { Button } from 'antd'
import { ZoomButtons } from './ZoomButton'
import styles from './index.less'

export const ShortcutActions = memo(({ zoom, onZoomChange, onResetScroll }: any) => {
  return (
    <div className={styles.action}>
      <ZoomButtons zoom={zoom} onZoomChange={onZoomChange} />
      <Button icon="drag" size="large" type="link" onClick={onResetScroll} />
    </div>
  )
})
