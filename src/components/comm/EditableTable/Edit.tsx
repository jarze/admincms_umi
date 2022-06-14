import React, { useState, useEffect, forwardRef } from 'react'
import EditableTable from './index'
import { Button, Divider } from 'antd'
import { BaseEditTableProps } from './index'

interface BaseEditEditTableProps<T> extends BaseEditTableProps<T> {
  value?: any
  onChange?: (value?: any) => void
}

export default forwardRef(({ value, onChange, ...props }: BaseEditEditTableProps<any>, ref) => {
  const { rowKey = 'id' } = props
  const [dataSource, setDataSource] = useState(value || [])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [editable, setEditable] = useState(false)

  const triggerChange = (changedValue = null) => {
    setTimeout(() => {
      onChange(changedValue || dataSource)
    }, 0)
  }

  useEffect(() => {
    setDataSource(value || [])
  }, [value])

  useEffect(() => {
    if ((value || []).length === dataSource.length) return
    triggerChange()
  }, [dataSource.length])

  const triggerEditable = () => {
    if (editable) {
      EditableTable.handleTableDataByFormValue({ ...props, dataSource }, (err, data) => {
        if (err) return
        setDataSource(data)
        setEditable(!editable)
      })
      return
    }
    setEditable(!editable)
  }

  const tbProps = {
    rowKey,
    editable,
    title: () => (
      <div style={{ direction: 'rtl' }}>
        <Button
          onClick={triggerEditable}
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
    footer: () => (
      <div style={{ textAlign: 'right' }}>
        <Button
          type="primary"
          icon="plus"
          ghost
          onClick={() => setDataSource([...dataSource, {}])}
        />
        <Divider type="vertical" />
        <Button
          ghost
          type="danger"
          icon="delete"
          disabled={!selectedRowKeys.length}
          onClick={() => {
            setDataSource([...dataSource.filter(item => !selectedRowKeys.includes(item[rowKey]))])
            setSelectedRowKeys([])
          }}
        />
      </div>
    ),
    ...props
  }

  return (
    <div>
      <EditableTable size="middle" bordered {...tbProps} />
    </div>
  )
})
