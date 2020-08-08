import React, { Fragment, ReactNode } from 'react'
import { Affix, Alert, Button, Icon, Popover, Tag, Divider, Checkbox } from 'antd'

export interface AlertProps {
  selectAlert?: {
    selectionShowKey?: string
		extraContent?: (selectedRowKeys: string[], props: any) => ReactNode
	}
	[propName: string]: any;
}

/* table 参数 | onRowSelect | onRowSelectChange */
export default ({ onRowSelect, onRowSelectChange, selectAlert = {}, ...props }: AlertProps) => {
  // Table API 参数
  const { rowSelection = {}, dataSource = [], rowKey } = props
  const { selectedRowKeys = [], onChange } = rowSelection
  const count = selectedRowKeys.length

  const { selectionShowKey, extraContent } = selectAlert

  const handleRowSelectChange = (checked: boolean) => {
    onRowSelectChange && onRowSelectChange(checked)
    !checked && onChange && onChange([])
  }

  const selectedData =
    selectionShowKey &&
    dataSource &&
    dataSource
      .filter((item: {}) => selectedRowKeys.includes(item[rowKey]))
      .map((item: {}) => {
        const key = item[rowKey]
        return (
          <Tag
            key={key}
            closable={true}
            onClose={(e: any) => {
              e.preventDefault()
              const newSelect = [...selectedRowKeys]
              newSelect.splice(selectedRowKeys.indexOf(key), 1)
              clearSelect(newSelect)
            }}
          >
            {item[selectionShowKey]}
          </Tag>
        )
      })

  const selected =
    selectionShowKey && count > 0 ? (
      <Popover placement="bottom" content={<div style={{ maxWidth: 250 }}>{selectedData}</div>}>
        <Button type="link" size="small">
          {count}
        </Button>
      </Popover>
    ) : (
      <Button type="link" size="small">
        {count}
      </Button>
    )

  const selectContent = (
    <Fragment>
      <span>&nbsp;&nbsp; {selected} 项</span>
      <Divider type="vertical" />
      <Button type="link" onClick={() => clearSelect([])} disabled={!count} icon="delete" size="small" />
    </Fragment>
  )

  const alert = (
    <div>
      <Fragment>
        {onRowSelectChange ? (
          <Checkbox checked={onRowSelect} onChange={e => handleRowSelectChange(e.target.checked)} style={{ width: 150, whiteSpace: 'nowrap' }}>
            {!onRowSelect ? (
              <span>
                批量操作
                <Divider type="vertical" />
                <Button
                  type="link"
                  icon="edit"
                  onClick={e => {
                    e.preventDefault()
                    handleRowSelectChange(true)
                  }}
                  size="small"
                />
              </span>
            ) : (
              selectContent
            )}
          </Checkbox>
        ) : (
          <Fragment>
            <Icon type="info-circle" theme="twoTone" />
            {selectedRowKeys}
          </Fragment>
        )}
      </Fragment>
      {extraContent && extraContent(selectedRowKeys, props)}
    </div>
  )

  const clearSelect = (keys: string[]) => {
    onChange && keys && onChange(keys)
  }

  return (
    <Affix offsetTop={8}>
      <Alert type="info" message={alert} style={{ marginBottom: '1em', overflow: 'hidden' }} />
    </Affix>
  )
}
