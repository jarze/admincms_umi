import React, { ReactChild } from 'react'
import { Table } from 'antd'
import SelectAlert from './SelectAlert'
import { TableProps, PaginationConfig } from 'antd/lib/table/interface'

export const defaultPaginationConfig: PaginationConfig = {
  pageSizeOptions: ['50', '100', '150'],
  showQuickJumper: true,
  showSizeChanger: true,
  showTotal: total => `共 ${total} 条`,
}

export interface BaseTableProps<T> extends TableProps<T> {
  selectAlert?: {
    hide?: boolean // 隐藏显示alert
    extraContent?: (selectedRowKeys: string[] | number[] | undefined, props: any) => ReactChild // alert 其他显示内容
  }
}

function TableSelect<RecordType extends object = any>({ pagination, selectAlert = {}, ...props }: BaseTableProps<RecordType>) {
  let pg = pagination
    ? {
        ...defaultPaginationConfig,
        onShowSizeChange: pagination.onShowSizeChange || pagination.onChange,
        ...pagination,
      }
    : pagination

  const { rowSelection } = props
  const { extraContent, hide } = selectAlert

  return (
    <>
      {rowSelection && !hide && (
        <SelectAlert rowSelection={rowSelection}>{extraContent && extraContent(rowSelection.selectedRowKeys, props)}</SelectAlert>
      )}
      <Table rowKey={(_, index) => String(index)} bordered={false} size="middle" {...props} pagination={pg} />
    </>
  )
}

TableSelect.SelectAlert = SelectAlert

export default TableSelect
