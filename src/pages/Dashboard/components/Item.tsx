import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { debounce } from 'lodash'
import { ChartConfigMap } from '../_config'

import { SCREEN_COMPONENT_PROPS } from '../type'
import CardItem from './CardItem'
import { SettingItem } from './Context'

export interface ItemProps {
  editable?: boolean
  item?: SCREEN_COMPONENT_PROPS
  onChange?: Function
}

export default ({ item, onChange, editable: editing = false }: ItemProps) => {
  const [filter, setFilter] = useState(item || {})

  /** 标记重新刷新 */
  const [refetchTag, setRefetchTag] = useState(false)

  useEffect(() => {
    setFilter(item || {})
  }, [item])

  const config = useMemo(() => ChartConfigMap[filter.type], [filter.type])

  const fetch = useCallback(() => config?.fetch?.(filter.type, filter.sourceId), [
    filter.sourceId,
    filter.type,
    refetchTag
  ])

  /** 更新配置 */
  const changeFilter = useCallback(
    debounce((newV, refresh = false) => {
      setFilter(p => ({ ...p, ...newV }))
      if (refresh) {
        setRefetchTag(p => !p)
      }
    }, 800),
    []
  )

  /** 需要绑定数据源 */
  const hasToBindSource = useMemo(
    () => config && config?.bindSource !== false && !filter?.sourceId,
    [filter]
  )

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {editing && (
        <SettingItem
          item={item}
          onCancel={() => setFilter({ ...item })}
          onSave={() => onChange?.(filter)}
          onChange={changeFilter}
        />
      )}
      {
        <>
          <CardItem
            title={filter?.title}
            titlePosition={filter?.titlePosition}
            background={filter?.background}
            hasToBindSource={hasToBindSource}
          >
            <>
              {/* 需要绑定数据源的模块在查看模式下不显示 */}
              {config?.Component && (!hasToBindSource || editing) && (
                <config.Component fetch={fetch as any} {...(filter.setting || {})} />
              )}
            </>
          </CardItem>
        </>
      }
    </div>
  )
}
