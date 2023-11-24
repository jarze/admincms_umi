import React, { useCallback, memo } from 'react'
import { ZoomButtons } from './ZoomButton'
import styles from './index.less'

export const ShortcutActions = memo(({ zoom, onZoomChange }: any) => {
  return (
    <div className={styles.action}>
      <ZoomButtons zoom={zoom} onZoomChange={onZoomChange} />
    </div>
  )
})
