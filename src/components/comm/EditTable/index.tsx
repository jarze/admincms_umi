import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Form, Table } from 'antd'
import EditableCell, { handleColumn } from './Cell'
import { EditTableProps } from './type'

const components = { body: { cell: EditableCell } }

export const ADD_ROW_KEY = 'ADD'

export const validateMessages = {
  required: () => '必填',
  string: {
    max: (a: any, b: any) => `不超过${b}个字符`
  }
}

// 获取column的keys
const getColumnsKeys = (columns = []) => {
  return columns.reduce(
    (res, { dataIndex, children }) =>
      dataIndex ? [...res, dataIndex] : children ? [...res, ...getColumnsKeys(children)] : res,
    []
  )
}

export function EditTable<T extends Record<string, any>>({
  dataSource: data,
  form,
  form: {
    validateFields,
    resetFields,
    isFieldsTouched,
    getFieldValue,
    setFieldsValue,
    validateFieldsAndScroll
  },
  columns: originColumns,
  getColumns,
  editable = true,
  rowKey = 'id',
  split = '-',
  title,
  shouldResetFields = false,
  ...props
}: EditTableProps<T>) {
  const [dataSource, setDataSource] = useState(data || [])
  const addRowKeyRef = useRef(0)

  useEffect(() => {
    const d = (data || []).map((i: any) => {
      if (!i[rowKey]) {
        // 添加编辑标记
        addRowKeyRef.current += 1
        i[rowKey] = `${ADD_ROW_KEY}${addRowKeyRef.current}`
      }
      return i
    })
    setDataSource(d)
  }, [data])

  useEffect(() => {
    if (shouldResetFields) {
      resetFields()
    }
  }, [dataSource])

  const [isAdding, handleAdd, cancelAdd, handleRemove] = useMemo(
    () => [
      Boolean(dataSource?.find(i => i[rowKey]?.startsWith(ADD_ROW_KEY))),
      () => {
        addRowKeyRef.current += 1
        setDataSource([{ [rowKey]: `${ADD_ROW_KEY}${addRowKeyRef.current}` } as T, ...dataSource])
      },
      () => {
        setDataSource([...dataSource.filter(item => !item[rowKey]?.startsWith(ADD_ROW_KEY))])
      },
      keys => {
        setDataSource([...dataSource.filter(item => !(keys || []).includes(item[rowKey]))])
      }
    ],
    [dataSource]
  )

  const formatRowKey = (i: string, key: string | object) => {
    return typeof key === 'string' ? `${i}${split}${key}` : `${i}${split}${key[rowKey]}`
  }

  //保存行keys
  const columnKeysRef = useRef<string[]>([])

  // 编辑表格form方法转换
  const editTableForm = useMemo(
    () => ({
      isFieldRowTouched: key => {
        const keys = columnKeysRef.current.map(i => formatRowKey(i, key))
        return isFieldsTouched(keys)
      },
      validateRowFields: (key, rows?: string[]) =>
        new Promise<T>((resolve, reject) => {
          const rowKeys = rows || columnKeysRef.current
          // 需转换表单key
          const keys = rowKeys.map(i => formatRowKey(i, key))
          validateFields(keys, (err, values) => {
            if (err) {
              reject(err)
            } else {
              const v = rowKeys.reduce((r, i) => ({ ...r, [i]: values[formatRowKey(i, key)] }), {})
              !key?.startsWith(ADD_ROW_KEY) &&
                (v[rowKey] = dataSource.find(i => i[rowKey] === key)?.[rowKey])
              resolve(v as any)
            }
          })
        }),
      getRowFieldValue: (key, record) => {
        return getFieldValue(formatRowKey(key, record))
      },
      setRowFieldValue: (key, record, value: any = undefined) => {
        return setFieldsValue({ [formatRowKey(key, record)]: value })
      },
      setRowFieldsValue: (obj: Object, record) => {
        const v = Object.keys(obj).reduce(
          (r, key) => ({ ...r, [formatRowKey(key, record)]: obj[key] }),
          {}
        )
        return setFieldsValue(v)
      }
    }),
    [dataSource]
  )

  // 保存全部
  const handleSave = () =>
    new Promise((resolve, reject) => {
      const keys = dataSource.reduce(
        (r, item) => [...r, ...columnKeysRef.current.map(i => formatRowKey(i, item))],
        []
      )
      validateFieldsAndScroll(keys, { first: true }, (err, values) => {
        if (err) {
          reject(err)
        } else {
          const v = dataSource.map(item => {
            const row = columnKeysRef.current.reduce(
              (r, i) => ({ ...r, [i]: values[formatRowKey(i, item)] }),
              {}
            )
            if (!item[rowKey]?.startsWith(ADD_ROW_KEY)) {
              row[rowKey] = item[rowKey]
            }
            return row
          })
          resolve(v)
        }
      })
    })

  // 处理格式化columns
  const tbColumns = useMemo(() => {
    const columns = originColumns || getColumns({ form, cancelAdd, isAdding, editTableForm })
    columnKeysRef.current = getColumnsKeys(columns)
    return !editable ? columns : handleColumn(columns, { form, rowKey, split })
  }, [originColumns, getColumns, editable, rowKey, split, dataSource])

  return (
    <Table
      pagination={false}
      rowKey={rowKey}
      columns={tbColumns}
      dataSource={dataSource}
      components={components}
      title={title ? () => title({ handleAdd, handleSave, isAdding, handleRemove, form }) : null}
      {...props}
    />
  )
}

export const EditFormTable = props => (
  <Form layout="inline">
    <EditTable {...props} />
  </Form>
)

export default Form.create({ validateMessages })(EditFormTable)
