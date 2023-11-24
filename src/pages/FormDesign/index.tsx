import React, { useContext } from 'react'
import { Button } from 'antd'
import styles from './index.less'
import { FormContext } from './layout'
import ZoomableViewport from './components/ZoomableViewport'
import { IFrame } from './components/IframeProxy/IFrame'

export default function index(params) {
  const value = useContext(FormContext)
  return (
    <>
      <ZoomableViewport canvasConfig={value?.canvasConfig}>
        {/* <div>fsafsdf</div> */}
        <IFrame src="/design/form/frame" />
      </ZoomableViewport>
      <div className={styles.set}>
        <Button onClick={value.showMenu}>设置</Button>
      </div>
    </>
  )
}
