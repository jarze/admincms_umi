import React from 'react'
import { PreviewComponentsContext } from '../../context/contexts'

export default ({ elements, children }) => {
  return (
    <PreviewComponentsContext.Provider value={elements}>
      {children}
    </PreviewComponentsContext.Provider>
  )
}
