import { useState, useEffect } from 'react'
import { EditableTable } from '@/components/comm'
import { Button, Divider } from 'antd'

export default ({ data, ...props }) => {
  const { rowKey = 'index' } = props
  const [dataSource, setDataSource] = useState()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  useEffect(() => {
    if (data) {
      setDataSource([...data])
    } else {
      setDataSource([])
    }
  }, [data])

  const tbProps = {
    editable: true,
    dataSource,
    rowSelection: {
      selectedRowKeys,
      onChange: rowKeys => setSelectedRowKeys(rowKeys),
    },
    footer: () => (
      <div style={{ textAlign: 'right' }}>
        <Button type="primary" icon="plus" onClick={() => setDataSource([...dataSource, {}])} />
        <Divider type="vertical" />
        <Button
          type="danger"
          icon="delete"
          onClick={() => {
            setDataSource([...dataSource.filter(item => !selectedRowKeys.includes(item[rowKey]))])
            setSelectedRowKeys([])
          }}
        />
      </div>
    ),
  }

  return (
    <>
      <EditableTable {...props} {...tbProps} />
    </>
  )
}
