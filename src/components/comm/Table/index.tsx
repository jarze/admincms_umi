import React, { useState, Fragment, useEffect } from 'react'
import { Table } from 'antd'
import Alert from '../AlertSelect'
import { TableProps, PaginationConfig } from 'antd/es/table'

export const defaultPaginationConfig: PaginationConfig = {
  pageSizeOptions: ['50', '100', '150'],
  showQuickJumper: true,
  showSizeChanger: true,
  onShowSizeChange: () => {},
  showTotal: total => `共 ${total} 条`
}
export interface BaseTableProps<T> extends TableProps<T> {
  selectAlert?: {}
}
/** 统一默认列表分页表现形式 */
export default ({ pagination, rowSelection, selectAlert, ...props }: BaseTableProps<object>) => {
  const [onRowSelect, setOnRowSelect] = useState(false)

  useEffect(() => {
    setOnRowSelect(false)
  }, [props.columns])

  let pg = pagination
    ? {
        ...defaultPaginationConfig,
        onShowSizeChange: pagination.onShowSizeChange || pagination.onChange || defaultPaginationConfig.onShowSizeChange,
        ...pagination
      }
    : pagination

  return (
    <Fragment>
      {rowSelection && (
        <Alert onRowSelect={onRowSelect} onRowSelectChange={setOnRowSelect} selectAlert={selectAlert} {...{ rowSelection, ...props }} />
      )}
      <Table rowKey={(_, index) => String(index)} bordered={false} {...props} pagination={pg} rowSelection={onRowSelect ? rowSelection : undefined} />
    </Fragment>
  )
}
