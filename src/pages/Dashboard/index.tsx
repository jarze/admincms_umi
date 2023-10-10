import styles from './index.less'

import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal, Divider } from 'antd'

import LayoutOperateBlock from './components/LayoutOperateBlock'
import ScreenBasicModal from './components/ScreenBasicModal'
import Item from './components/Item'
import Wrapper from './components/Wrapper'

import { fetchDetail, fetchUpdateData } from './service'

export const UPDATE_SCREEN_EVENT = 'updateScreen'

const initialLayout = () => ({
  width: null,
  height: null,
  data: null,
  block: createBlock(),
  theme: null
})

export default function BigScreen(props) {
  const { location, match } = props

  const { id } = match.params || {}
  const editable = location.search.includes('?type=edit')

  const [json, setJson] = useState(initialLayout())
  const [loading, setLoading] = useState(true)
  const [, update] = useState(0)

  const xhrDetailRef = useRef(null)

  useEffect(() => {
    const updateScreen = () => update(n => ++n)
    document.addEventListener(UPDATE_SCREEN_EVENT, updateScreen)

    setLoading(true)
    fetchDetail(id)
      .then(data => {
        if (data.data) setJson(JSON.parse(data.data))
        xhrDetailRef.current = data
        setLoading(false)
      })
      .catch(() => {
        Modal.warn({ content: '获取初始数据失败！请刷新页面重试！' })
      })

    return () => document.removeEventListener(UPDATE_SCREEN_EVENT, updateScreen)
  }, [id])

  const handleEdit = () => {
    setLoading(true)
    const data = { ...xhrDetailRef.current, data: JSON.stringify(json) }
    fetchUpdateData(data)
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  const editBtns = (
    <div>
      {(!!json.data || !loading) && <ScreenBasicModal json={json} />}
      <Divider type="vertical" />
      <Button type="primary" onClick={() => window.open(`/screen/${id}`)}>
        预览
      </Button>
      <Divider type="vertical" />
      <Button type="primary" loading={loading} onClick={handleEdit}>
        保存
      </Button>
    </div>
  )

  const padding = `${json.data?.paddingVertical / 2}px ${json.data?.paddingHorizontal / 2}px`

  return (
    <Wrapper
      theme={json?.theme}
      editable={editable}
      header={editable ? editBtns : null}
      onChangeTheme={theme => {
        json.theme = theme
        dispatchUpdate()
      }}
    >
      {json.data ? (
        <div
          className={editable ? '' : styles.viewMode}
          style={{
            width: json.width || '100%',
            height: json.height || '100%',
            background: json.data.background,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {renderBlock({ block: json.block, level: 1, editable, padding })}
        </div>
      ) : null}
    </Wrapper>
  )

  // return (
  //   <div className={styles.wrapper}>
  //     {editable ? editBtns : null}

  //     {json.data ? (
  //       <div
  //         className={editable ? styles.editMode : styles.viewMode}
  //         style={{ width: json.width, height: json.height, background: json.data.background }}
  //       >
  //         {renderBlock({ block: json.block, level: 1, editable, padding })}
  //       </div>
  //     ) : null}
  //   </div>
  // );
}

export function dispatchUpdate() {
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'))
  })
  document.dispatchEvent(new Event(UPDATE_SCREEN_EVENT))
}

export function createBlock(
  data: { width?: string; height?: string } = { width: '100%', height: '100%' }
) {
  return {
    width: data?.width || '100%',
    height: data?.height || '100%',
    direction: 'row',
    id: Math.random(),
    data: null,
    blocks: []
  }
}

function renderBlock({ block, level, editable, padding }) {
  const { direction, width, height, blocks, id } = block
  const isLeaf = !blocks?.length

  let content = null

  if (block.data || (!editable && isLeaf)) {
    content = (
      <div className={styles.dataContent}>
        {editable && (
          <Button
            size="small"
            className={styles.settingBtn}
            onClick={() => !(block.data = null) && dispatchUpdate()}
          >
            初始
          </Button>
        )}

        {block.data ? (
          <Item
            item={block.data}
            editable={editable}
            onChange={d => (block.data = d) && dispatchUpdate()}
          />
        ) : null}
      </div>
    )
  } else if (block.onLayout || isLeaf) {
    content = <LayoutOperateBlock block={block} level={level} />
  }

  if (content) {
    return (
      <div className={styles.contentWrapper} style={{ width, height, padding }} key={id}>
        {content}
      </div>
    )
  }

  return (
    <div
      key={id}
      style={{ flexDirection: direction, width, height }}
      className={`${styles.block} block-${level}`}
    >
      {editable && (
        <Button
          size="small"
          className={`${styles.layoutBtn} layout-btn-${level}`}
          onClick={() => (block.onLayout = true) && dispatchUpdate()}
        >
          比例
        </Button>
      )}
      {blocks.map(block => renderBlock({ block, level: level + 1, editable, padding }))}
    </div>
  )
}
