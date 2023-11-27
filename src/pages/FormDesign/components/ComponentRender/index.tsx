import React, { useMemo, Fragment } from 'react'
import { ComponentView } from './ComponentView'

export default ({ components }) => {
  const node = useMemo(() => {
    return {
      componentName: Fragment,
      children: components?.map?.((i, index) => ({
        componentName: i.type,
        ...i,
        id: `${i.id}-${index}`
      }))
    }
  }, [components])
  return (
    <>
      <ComponentView node={node} />
      <div id="frame-widget" />
    </>
  )
}
