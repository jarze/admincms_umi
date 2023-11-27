import React, { useState } from 'react'
import DropView from '../components/DragView/DropView'
import { elementsMap } from '../constants'
import DesignerScope from '../components/Scope/DesignerScope'
import ComponentRender from '../components/ComponentRender'

export default () => {
  const [components, setComponents] = useState([])
  return (
    <DesignerScope>
      <DropView onIn={id => setComponents(p => [...p, elementsMap[id]])}>
        <ComponentRender components={components} />
      </DropView>
    </DesignerScope>
  )
}
