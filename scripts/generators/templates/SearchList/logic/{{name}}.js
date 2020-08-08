// import { Button, Divider } from 'antd'

// 列表
export const tableConfig = {
  // columns: (onItemAction, props) => [
  columns: [
    { title: '{{name}}', dataIndex: 'a' },
    { title: '', dataIndex: 'b' },
    { title: '', dataIndex: 'c', render: (text, record, index) => '自定义column显示' },
    // {
    //   key: 'operation',
    //   title: '操作',
    //   align: 'center',
    //   width: 150,
    //   render: (_, record) => (
    //     <>
    //       <Button type="link" onClick={() => onItemAction('detail', record)} icon="eye" />
    //       <Divider type="vertical" />
    //       <Button type="link" onClick={() => onItemAction('edit', record)} icon="edit" />
    //       <Divider type="vertical" />
    //       <Button type="link" onClick={() => onItemAction('delete', record)} icon="delete" />
    //     </>
    //   ),
    // },
  ],
  rowKey: 'id',
  //selectAlert: (selectedRowKeys, props) => null
}

// 搜索项
export const formConfig = {
  // items: (props, onItemAction) => [
  items: [
    { label: 'a', key: 'a', render: (form, data) => <div>自定义表单组件</div> },
    { label: 'b', key: 'b' },
    { render: (form, data) => <div>自定义内容显示</div> },
  ],
}

// 操作项
export const action = (onItemAction, props) => {
  // return (
  //   <Button icon="plus" type="primary" onClick={() => onItemAction('add')}>
  //     添加
  //   </Button>
  // )
  return null
}

// export const isPush = true;

// 添加编辑表单
export const editConfig = {
  // items: (props, onItemAction) => [
  items: [
    { label: 'a', key: 'b', render: (form, data) => <div>自定义表单组件</div> },
    { label: 'a', key: 'b' },
    { render: (form, data) => <div>自定义内容显示</div> },
  ],
}

// 详情展示
export const pageConfig = {
  // items: props => [
  items: [
    { label: 'a', key: 'b' },
    { label: 'a', key: 'b', render: (text, data) => <div>自定义item组件</div> },
  ],
}