import React from 'react'
import { createPortal } from 'react-dom'

export default ({ container }) => {
  return container && createPortal(<div>ss</div>, container)
}
