import React, { useCallback, memo } from 'react'
import { usePreviewComponent } from '../../hooks/usePreviewComponent'
import { useLocked } from '../../hooks/useLocked'
import { NodeContext } from '../../context/contexts'
import { Locked } from './Locked'

export const ComponentView = memo<any>(props => {
  const { node } = props

  const Component = usePreviewComponent(node.componentName)

  const locked = useLocked()

  const render = useCallback(() => {
    return node?.children?.length > 0 ? (
      <Component>
        <Locked lock={node.lock}>
          {node?.children?.map(i => (
            <ComponentView key={i.id} node={i} />
          ))}
        </Locked>
      </Component>
    ) : (
      <Locked lock={locked}>
        <Component key={node.id} {...(node.props || {})} />
      </Locked>
    )
  }, [node])

  return <NodeContext.Provider value={node}>{render()}</NodeContext.Provider>
})
