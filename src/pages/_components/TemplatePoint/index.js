import { useState, useEffect } from 'react'
import { EditableTable } from '@/components/comm'
import { Button, Popconfirm } from 'antd'
//import Upload from '../Upload';
import { columnsFn } from './_logic'
import { TableSelect } from '@/components/comm'

const { SelectAlert } = TableSelect

const rowKey = 'index'

export default props => {
  const { data, constant = {} } = props
  const { permissions = [], ctpt = [] } = constant

  const [dataSource, setDataSource] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  useEffect(() => {
    data &&
      data.length &&
      setDataSource(
        data.map(item => {
          const { base, factor, rangeFloor, rangeCeil } = item
          return {
            'base&factor': { base, factor },
            'rangeFloor&rangeCeil': { rangeFloor, rangeCeil },
            ...item,
          }
        }),
      )
  }, [data])

  const handleAdd = () => {
    setDataSource([...dataSource, {}])
  }

  const handleDelete = (ids = []) => {
    setDataSource([...dataSource.filter(item => !ids.includes(item[rowKey]))])
    rowSelection.onChange([])
  }

  const handlePointSelect = (points, indexKey) => {
    // 根据点位选择自动填充表单相关内容
    setDataSource(
      dataSource.map(item => {
        if (item[rowKey] === indexKey) {
          item[rowKey] = undefined // 删除标记，更新表单内容
          return { ...item, ...points }
        }
        return item
      }),
    )
  }

  let isEdit = !(props.editable === false)
  let rowSelection

  if (isEdit) {
    rowSelection = {
      selectedRowKeys,
      onChange: rowKeys => setSelectedRowKeys(rowKeys),
    }
  }

  const tbProps = {
    columns: columnsFn(handlePointSelect, handleDelete, { permissions, ctpt, rowKey }, isEdit),
    dataSource,
    rowKey,
    editable: true,
    bordered: true,
    rowSelection,
    size: 'middle',
    scroll: { y: 'calc(100vh - 300px)' },
    ...props,
  }

  return (
    <>
      {isEdit && (
        <div>
          <Button onClick={handleAdd} icon="plus" type="primary">
            新增
          </Button>
          {/* <Divider type="vertical" /> */}
          {/* <Upload></Upload> */}
        </div>
      )}
      <br />
      <SelectAlert rowSelection={rowSelection}>
        <Popconfirm title="确定删除？" disabled={!(selectedRowKeys.length > 0)} onConfirm={() => handleDelete(selectedRowKeys)}>
          <Button type="link" disabled={!(selectedRowKeys.length > 0)}>
            删除
          </Button>
        </Popconfirm>
      </SelectAlert>
      <EditableTable {...tbProps} />
      <br />
    </>
  )
}
