import React, { useState, useCallback } from 'react'
import DropView from '../components/DragView/DropView'
import { elementsMap } from '../constants'
import DesignerScope from '../components/Scope/DesignerScope'
import ComponentRender from '../components/ComponentRender'
import { DesignerEngineContext } from '../context/contexts'

export default () => {
  const [components, setComponents] = useState([])

  const handleAdd = useCallback(
    (id, index) => {
      setComponents(p => [...p, elementsMap[id]])
    },
    [components]
  )
  const handleRemove = useCallback(
    index => {
      setComponents(p => p.filter((j, i) => index !== i))
    },
    [components]
  )

  return (
    <DesignerEngineContext.Provider value={{}}>
      <DesignerScope>
        <DropView onIn={handleAdd}>
          <ComponentRender components={components} handleRemove={handleRemove} />
        </DropView>
      </DesignerScope>
    </DesignerEngineContext.Provider>
  )
}
