import { Button, Divider } from 'antd';
export default (onItemAction, props) => {
  return (
    <>
      <Button icon='plus' type='primary' onClick={() => onItemAction('add')}>添加</Button>
      <Divider type="vertical" />
      <Button type='danger' disabled={props.selectedRowKeys.length === 0} onClick={() => onItemAction('delete', { ids: props.selectedRowKeys })}>批量删除</Button>
      <Divider type="vertical" />
      <Button disabled={props.selectedRowKeys.length === 0} onClick={() => onItemAction('action', { ids: props.selectedRowKeys })}>禁用</Button>
    </>
  );
}