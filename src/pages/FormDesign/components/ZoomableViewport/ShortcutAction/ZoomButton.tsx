import React, { useCallback, memo } from 'react'
import { Button, Tooltip } from 'antd'

export const ZoomButtons = memo(({ zoom, onZoomChange }: any) => {
  const handleZoomIn = useCallback(() => {
    const newZoom = zoom + 0.1
    if (newZoom > 3) {
      return
    }
    onZoomChange(newZoom)
  }, [onZoomChange, zoom])

  const handleZoomOut = useCallback(() => {
    const newZoom = zoom - 0.1
    if (newZoom < 0.1) {
      return
    }
    onZoomChange(newZoom)
  }, [onZoomChange, zoom])

  const handleReset = useCallback(() => {
    onZoomChange(1)
  }, [onZoomChange])

  return (
    <>
      <Button icon="plus" onClick={handleZoomIn} type="link" size="large" />
      <Tooltip title="重置" placement="left">
        <Button onClick={handleReset} type="link" size="large">
          {+Number(zoom).toFixed(1)}
        </Button>
      </Tooltip>
      <Button icon="minus" onClick={handleZoomOut} type="link" size="large" />
    </>
  )
})
