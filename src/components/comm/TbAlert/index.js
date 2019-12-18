import { Button, Alert, Divider, Icon } from 'antd';
import { Fragment } from 'react';

export default ({ rowSelection, children, ...props }) => {
  const { selectedRowKeys = [], onChange } = rowSelection || {};
  const alert = (
    <div>
      <Icon type="info-circle" theme="twoTone" />
      &nbsp;&nbsp; 已选择
      <Button type="link">{selectedRowKeys.length}</Button>项数据
      <Divider type="vertical" />
      <Button type="link" onClick={() => onChange && onChange([])}>
        清空
      </Button>
      {children && <Divider type="vertical" />}
      {children}
    </div>
  );
  return rowSelection ? (
    <Alert message={alert} style={{ marginBottom: '1em', overflow: 'hidden' }} {...props} />
  ) : (
    <Fragment />
  );
};
