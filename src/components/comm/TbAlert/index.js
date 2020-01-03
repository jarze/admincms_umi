import { Button, Alert, Divider } from 'antd'
import { Fragment } from 'react'
import styles from './index.less'

export default ({ rowSelection, children, ...props }) => {
  const { selectedRowKeys = [], onChange } = rowSelection || {}
  const alert = (
    <div>
      已选择
      <Button type="link">{selectedRowKeys.length}</Button>项数据
      <Divider type="vertical" />
      <Button
        type="link"
        onClick={() => onChange && onChange([])}
        disabled={selectedRowKeys.length === 0}
      >
        清空
      </Button>
      {children && <Divider type="vertical" />}
      {children}
    </div>
  )
  return rowSelection ? (
    <Alert type="info" showIcon message={alert} className={styles.alert} {...props} />
  ) : (
    <Fragment />
  )
}
