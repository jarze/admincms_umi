import React, { useState, useEffect, forwardRef } from 'react'
import { Button, Divider } from 'antd'
import { EditTable } from './index'

export default forwardRef(({ value, onChange, ...props }: any, ref) => {
  const { rowKey = 'id' } = props
  const [dataSource, setDataSource] = useState(value || [])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [editable, setEditable] = useState(true)

  const triggerChange = (changedValue = null) => {
    setTimeout(() => {
      onChange(changedValue || dataSource)
    }, 0)
  }

  useEffect(() => {
    setDataSource(value || [])
  }, [value])

  const triggerEditable = handleSave => {
    if (editable) {
      handleSave().then(value => {
        setEditable(!editable)
        triggerChange(value)
        console.log(value, '-------handleSave')
      })
      return
    }
    setEditable(!editable)
  }

  const tbProps = {
    rowKey,
    editable,
    title: ({ handleAdd, handleSave, handleRemove }) => (
      <div style={{ direction: 'rtl' }}>
        <Button type="primary" icon="plus" ghost onClick={handleAdd} />
        <Divider type="vertical" />
        <Button
          ghost
          type="danger"
          icon="delete"
          disabled={!selectedRowKeys.length}
          onClick={() => {
            handleRemove(selectedRowKeys)
            setSelectedRowKeys([])
          }}
        />
        <Divider type="vertical" />
        <Button
          onClick={() => triggerEditable(handleSave)}
          icon={editable ? 'save' : 'edit'}
          shape="circle"
          type="dashed"
        />
      </div>
    ),
    dataSource,
    rowSelection: {
      selectedRowKeys,
      onChange: rowKeys => setSelectedRowKeys(rowKeys)
    },
    ...props
  }

  return <EditTable size="middle" bordered {...tbProps} />
})
