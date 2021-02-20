import { Button, Alert, Divider } from 'antd'
import React, { Fragment, ReactChild } from 'react'
import styles from './index.less'
import { TableRowSelection } from 'antd/es/table'

interface BaseAlterProps {
  rowSelection: TableRowSelection<any>
  children?: ReactChild
}

export default ({ rowSelection, children, ...props }: BaseAlterProps) => {
  const { selectedRowKeys = [], onChange } = rowSelection || {}
  const alert = (
    <div>
      已选择
      <Button type="link">{selectedRowKeys.length}</Button>项数据
      <Divider type="vertical" />
      <Button type="link" onClick={() => onChange && onChange([], [])} disabled={selectedRowKeys.length === 0}>
        清空
      </Button>
      {children && <Divider type="vertical" />}
      {children}
    </div>
  )
  return rowSelection ? <Alert type="info" showIcon={true} message={alert} className={styles.alert} {...props} /> : <Fragment />
}
