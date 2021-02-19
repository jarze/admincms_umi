import React, { ReactChild } from 'react'
import { Table } from 'antd'
import SelectAlert from './SelectAlert'
import { TableProps, PaginationConfig } from 'antd/lib/table/interface'
export { ColumnProps } from 'antd/lib/table/interface'
export const defaultPaginationConfig: PaginationConfig = {
  pageSizeOptions: ['50', '100', '150'],
  showQuickJumper: true,
  showSizeChanger: true,
  onShowSizeChange: () => {},
  showTotal: total => `共 ${total} 条`
}

export interface BaseTableProps<T> extends TableProps<T> {
  selectAlert?: {
    /** alert 其他显示内容 */
    (selectedRowKeys: string[] | number[] | undefined, props: any): ReactChild
    /** 隐藏显示alert */
    hide?: boolean
  }
}

function TableSelect<RecordType extends object = any>({ pagination, selectAlert, ...props }: BaseTableProps<RecordType>) {
  let pg = pagination
    ? {
        ...defaultPaginationConfig,
        onShowSizeChange: pagination.onShowSizeChange || pagination.onChange || defaultPaginationConfig.onShowSizeChange,
        ...pagination
      }
    : pagination

  const { rowSelection } = props
  return (
    <>
      {rowSelection && !(selectAlert || {}).hide && (
        <SelectAlert rowSelection={rowSelection}>{selectAlert && selectAlert(rowSelection.selectedRowKeys, props)}</SelectAlert>
      )}
      <Table rowKey={(_, index) => String(index)} bordered={false} size="middle" {...props} pagination={pg} />
    </>
  )
}

TableSelect.SelectAlert = SelectAlert

export default TableSelect
