import React, { useRef, useState, useEffect, useCallback } from 'react'
import { ShortcutActions } from './ShortcutAction'
import styles from '../../index.less'

const defaultScrollLeft = 460

export default ({ canvasConfig, children }) => {
  const [zoom, setZoom] = useState(1)
  const canvasRef = useRef<HTMLDivElement>(null)
  const draggingParams = useRef<{
    /** 拖动中 */
    dragging?: boolean
    startX?: number
    startY?: number
    scrollLeft?: number
    scrollTop?: number
  }>({})

  const handleResetScroll = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.scrollLeft = defaultScrollLeft
      canvasRef.current.scrollTop = 0
    }
  }, [])

  const handleMoveStart = useCallback(e => {
    draggingParams.current.dragging = true
    draggingParams.current.startX = e.pageX - canvasRef.current.offsetLeft
    draggingParams.current.startY = e.pageY - canvasRef.current.offsetTop
    draggingParams.current.scrollLeft = canvasRef.current.scrollLeft
    draggingParams.current.scrollTop = canvasRef.current.scrollTop
  }, [])

  const handleMove = useCallback(e => {
    if (!draggingParams.current.dragging) return
    e.preventDefault()
    const { startX, startY, scrollLeft, scrollTop } = draggingParams.current
    const x = e.pageX - canvasRef.current.offsetLeft
    const y = e.pageY - canvasRef.current.offsetTop
    const walkX = (x - startX) * 1.5
    const walkY = (y - startY) * 1.5
    canvasRef.current.scrollLeft = scrollLeft - walkX
    canvasRef.current.scrollTop = scrollTop - walkY
  }, [])

  const handleMoveStop = useCallback(() => {
    draggingParams.current.dragging = false
  }, [])

  useEffect(() => {
    setZoom(
      canvasConfig?.canvasWidth && canvasConfig.screenWidth
        ? canvasConfig?.canvasWidth / canvasConfig.screenWidth
        : 1
    )
  }, [canvasConfig?.canvasWidth, canvasConfig?.screenWidth])

  return (
    <>
      <div
        className={styles['viewport-container']}
        ref={canvasRef}
        draggable={false}
        onMouseDown={handleMoveStart}
        onMouseMove={handleMove}
        onMouseLeave={handleMoveStop}
        onMouseUp={handleMoveStop}
      >
        <div className={styles['zoomable-viewport']}>
          <div
            className={styles['zoomable-inner']}
            style={{ transform: `scale(${zoom})` }}
            draggable={false}
          >
            <div
              style={{
                background: '#000',
                width: canvasConfig?.screenWidth,
                height: canvasConfig?.canvasHeight || 800
                //transform: `scale(${canvasScale})`
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
      <ShortcutActions zoom={zoom} onZoomChange={setZoom} onResetScroll={handleResetScroll} />
    </>
  )
}
