import React, { createContext, useState, useCallback, useMemo } from 'react'
import MenuComponent from './components/MenuComponent'
// import HandlerModalForm from '@/components/HandlerModalForm'
import { groups } from './constants'

export interface FormContextProps {
  canvasConfig?: any
  showMenu?: () => void
}

export const FormContext = createContext<FormContextProps>({})

export default function layout(params) {
  const [menuShow, setMenuShow] = useState(false)
  const [canvasConfig, setCanvasConfig] = useState({
    //画布宽度
    canvasWidth: 800,
    //画布高度
    canvasHeight: 800,
    //实际屏宽，用于设置iframe的scale

    screenWidth: 1480
  })

  const showMenu = useCallback(() => {
    setMenuShow(true)
  }, [])

  const value = useMemo(() => ({ showMenu, canvasConfig }), [showMenu])

  return (
    <FormContext.Provider value={value}>
      {params.children}
      <MenuComponent
        data={groups}
        visible={menuShow}
        onClose={e => setMenuShow(false)}
      ></MenuComponent>
    </FormContext.Provider>
  )
}
