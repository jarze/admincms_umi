import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Tabs } from 'antd'
import { debounce } from 'lodash'
import { ChartConfigMap, baseConfig } from '../_config'
import Setting from './setting'
// import DataSourceFrom from './DataSource';
import SettingDrawer from './SettingDrawer'

import { SCREEN_COMPONENT_PROPS } from '../type'
import CardItem from './CardItem'
const { TabPane } = Tabs

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
      {
        <>
          {editing && (
            <SettingDrawer
              onCancel={() => {
                setFilter({ ...item })
              }}
              onSave={() => {
                //TODO:不同类型组件的配置项校验也不相同
                onChange?.(filter)
              }}
            >
              {/* TODO: 不同类型 涵盖 配置项 不同 */}
              <Tabs defaultActiveKey="1">
                <TabPane tab="基础配置" key="1">
                  <Setting
                    data={filter}
                    items={baseConfig?.items}
                    className="basic-info-setting"
                    onChange={(v, changeValue) => {
                      // 更改类型需要把内容配置重置
                      const changeType = Object.keys(changeValue || {}).includes('type')
                      changeFilter(changeType ? { ...v, setting: null } : v)
                    }}
                  />
                </TabPane>
                {filter?.type && config?.items && (
                  <TabPane tab="内容配置" key="2" disabled={!filter.type}>
                    <Setting
                      //TODO: 组件默认配置项值处理
                      data={filter?.setting || config?.Component?.defaultProps}
                      items={config?.items}
                      onChange={v => {
                        changeFilter({ setting: { ...filter.setting, ...v } })
                      }}
                    />
                  </TabPane>
                )}
                {filter?.type && config?.bindSource !== false && (
                  <TabPane tab="数据源绑定" key="3">
                    {/* <DataSourceFrom
                      sourceId={filter?.sourceId}
                      onChange={sourceId => changeFilter({ sourceId }, true)}
                    /> */}
                  </TabPane>
                )}
              </Tabs>
            </SettingDrawer>
          )}
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
