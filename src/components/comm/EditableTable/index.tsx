import React, { useMemo } from 'react'
import { TableProps, ColumnProps } from 'antd/es/table'
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/es/form/Form'
import { Table } from 'antd'
import EditableCell from './Cell'

export interface BaseEditFormProps {
  form: WrappedFormUtils
  /** 用于表单数据于表格数组数据之间的处理， 多个可编辑表格之间数据的区分 */
  split: '-' | string
  /** 标记编辑唯一key，需和数据已有字段不一样 */
  rowKey: 'index' | string
}

export interface BaseEditColumnProps<T> extends ColumnProps<T>, BaseEditFormProps {
  /** 是否可编辑 */
  disableEdit: false

  editRender?: ColumnProps<T>['render']
  options?: GetFieldDecoratorOptions
  optionsFun?: (record: T) => GetFieldDecoratorOptions
  defaultValue?: any

  index: number
  record: T
}

export interface BaseEditTableProps<T> extends Omit<TableProps<T>, 'rowKey'>, BaseEditFormProps {
  /** 编辑状态 */
  editable: true
  columns?: (BaseEditColumnProps<T> | ColumnProps<T>)[]
}

const components = { body: { cell: EditableCell } }

const columnFormOnCell = (column, params) => (record, index) => ({
  record,
  index,
  ...params,
  ...column
})

// 处理column编辑表格参数
const handleColumn = (data = [], params) =>
  data.map(({ children, ...col }) =>
    col.disableEdit
      ? { children, ...col }
      : {
          onCell: columnFormOnCell(col, params),
          children: children && handleColumn(children, params),
          ...col
        }
  )

// 获取column的keys
const getColumnsKeys = (columns = []) => {
  return columns.reduce(
    (res, { dataIndex, children }) =>
      dataIndex ? [...res, dataIndex] : children ? [...res, ...getColumnsKeys(children)] : res,
    []
  )
}

// 需要传入form
const EditableTable = ({
  editable = true,
  split = '-',
  rowKey = 'index',
  form,
  columns,
  dataSource,
  ...restProps
}: BaseEditTableProps<any>) => {
  const tbColumns = useMemo(() => {
    return !editable ? columns : handleColumn(columns, { form, rowKey, split })
  }, [columns, editable])

  // 设置标记唯一
  const formDataSource = useMemo(() => {
    // 每新增rowKey增加1
    let maxIndex = Math.max(...dataSource.map(item => item[rowKey] || 0))
    return dataSource.map(item => {
      if (item[rowKey] === undefined) {
        //不存在标记，说明是新增进表格, 内容以dataSource
        item[rowKey] = maxIndex + 1
        maxIndex++
      }
      return { ...item }
    })
  }, [dataSource, editable])

  return (
    <Table
      components={components}
      columns={tbColumns}
      dataSource={formDataSource}
      rowKey={(record, index) => record[rowKey] || index}
      pagination={false}
      {...restProps}
    />
  )
}

// 将table表单数据和数组数据合并处理
EditableTable.handleTableDataByFormValue = (
  { columns, dataSource = [], form, rowKey = 'index', split = '-' }: BaseEditTableProps<any>,
  callback: (errors: any, dataSource) => any
) => {
  form.validateFields((err, values) => {
    const columnKeys = getColumnsKeys(columns)
    // 每新增rowKey增加1
    let maxIndex = Math.max(...dataSource.map(item => item[rowKey] || 0))
    const data = dataSource.map((item, index) => {
      let rk = item[rowKey]
      if (rk === undefined) {
        //不存在标记，说明是新增进表格, 内容以dataSource
        item[rowKey] = maxIndex + 1
        maxIndex++
      } else {
        columnKeys.forEach(cl => {
          let va = values[`${cl}${split}${rk}`]
          va !== undefined && (item[cl] = va)
        })
      }
      return { ...item }
    })
    callback(err, data)
  })
}

// 将table表单数据转换为数组数据， 提交表单的时候进行表单数据格式处理
EditableTable.handleTableFormValues = (values, name, split = '-') => {
  let keys = Object.keys(values)
  let key, index
  let newValue = {},
    columnKeys = [],
    indexKeys = []

  // 取出所有的column和index
  keys.forEach(item => {
    let [k, i] = item.split(split)
    if (i) {
      if (!key) {
        key = k
        index = i
      }
      if (i === index) columnKeys.push(k)
      if (k === key) indexKeys.push(i)
    } else {
      newValue[item] = values[item]
    }
  })
  if (!key) return newValue
  const data = indexKeys.sort().map(index => {
    return columnKeys.reduce((res, column) => {
      let indexKey = `${column}${split}${index}`
      let params = {}
      let value = values[indexKey]
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        params = { ...value }
      } else {
        params[column] = value
      }
      return { ...res, ...params }
    }, {})
  })
  newValue[name] = data
  return newValue
}

export default EditableTable
