import React, { useRef, useState, useEffect } from 'react'
import { ShortcutActions } from './ShortcutAction'
import styles from '../../index.less'

const defaultScrollLeft = 460

export default ({ canvasConfig, children }) => {
  const [zoom, setZoom] = useState(1)
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.scrollLeft = defaultScrollLeft
    }
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
      {/* <div ref={canvasRef}>{children}</div> */}
      <div className={styles['viewport-container']} ref={canvasRef} draggable={false}>
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
      <ShortcutActions zoom={zoom} onZoomChange={setZoom} />
    </>
  )
}
